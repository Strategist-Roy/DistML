from django.shortcuts import render
from django.http import HttpResponse, HttpResponseForbidden, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.conf import settings
import os, json, redis, jwt, pickle, time, hashlib
import pandas as pd
import numpy as np
from numpy import genfromtxt

#Import models
from django.contrib.auth.models import User
from datamodels.models import Jobs

#Import Network Class
from .network import Network

def get_username_from_token(token):

	decoded_jwt = jwt.decode(
						token,
						settings.SECRET_KEY,
						algorithm='HS256'
					)

	return decoded_jwt['username']

def split_save(file,username):

	df = pd.read_csv(file)
	l = len(df.index)
	chunk = settings.CHUNK_SIZE

	timestamp_in_sec = str(time.time())

	#create an unique job id based on current timestamp and user
	job_id = hashlib.sha256(timestamp_in_sec.encode()).hexdigest()[:15]

	#Add job to database
	user = User.objects.get(username=username)
	Jobs.objects.create(user=user,job=job_id)

	#Job directory prefix
	directory_prefix = settings.MEDIA_ROOT+'/'+username+'/'+job_id

	#create directory structure according to that
	dataset_path = directory_prefix+'/dataset/'
	result_path = directory_prefix+'/result/'

	#check if directories exists
	if not os.path.exists(dataset_path):
		os.makedirs(dataset_path)
	if not os.path.exists(result_path):
		os.makedirs(result_path)

	#Create pickled parameters and save
	sizes = [2,3,4,2]
	biases = [np.random.randn(y, 1) for y in sizes[1:]]
	weights = [np.random.randn(y, x)
                        for x, y in zip(sizes[:-1], sizes[1:])]

	pickle.dump((biases,weights,3.0),open(directory_prefix+'/parameters.pickle','wb'))

	#split into chunks and save
	conn = redis.Redis('localhost')
	conn.set(username+';'+job_id, '0')

	for i in range(0,l,chunk):
		file_name = str(int(i/chunk))
		df[i:min(i+chunk,l)].to_csv(dataset_path+file_name+'.csv',index=False)

		#Push into Redis List
		conn.rpush('data',username+';'+job_id+';'+file_name)

@csrf_exempt
def dataset_upload(request):

	if request.method == 'POST':

		username = get_username_from_token(request.META['HTTP_AUTHORIZATION'])
		dataset = request.FILES['dataset']

		#Split save the file
		split_save(dataset, username)

		return HttpResponse("Done !!")
	else:
		return HttpResponseForbidden()

def get_next_block():

	conn = redis.Redis('localhost')

	while conn.llen('data'):
		
		#get next job from redis list & push it back
		block = conn.lpop('data').decode()

		#split by ;
		chunks = block.split(';')

		#fetch customer, job id and file name seperately
		customer = chunks[0]
		job_id = chunks[1]
		file_name = chunks[2]

		#get epoch count
		num_epochs = int(conn.get(customer+';'+job_id))
		if (num_epochs == settings.NUM_EPOCHS):
			continue    #continue popping till empty
		
		#check if result is already present, only push to redis queue if output is still not present
		directory = settings.MEDIA_ROOT+'/'+customer+'/'+job_id+'/result/'
		file_name_check = directory+file_name+'.pickle'
		if not os.path.isfile(file_name_check):
			conn.rpush('data', block)
			return {
				'customer': customer,
				'job_id': job_id,
				'file_name': file_name
			}

	return None

@csrf_exempt
def dispatch(request):
	if request.method == 'GET':

		data = get_next_block()

		return HttpResponse(json.dumps(data))

def summarize(customer, job_id):
	directory_prefix = settings.MEDIA_ROOT+'/'+customer+'/'+job_id

	#Initialize Model for final weight updates
	(biases, weights, eta) = pickle.load(open(directory_prefix+'/parameters.pickle','rb'))
	net = Network(biases, weights, eta)

	for fname in os.listdir(directory_prefix+'/result/'):
		nabla_b, nabla_w, batch_size = pickle.load(open(directory_prefix+'/result/'+fname,'rb'))
		net.accumulate(nabla_b, nabla_w, batch_size)
		os.remove(directory_prefix+'/result/'+fname)

	pickle.dump((net.biases, net.weights, eta),open(directory_prefix+'/parameters.pickle','wb'))

@csrf_exempt
def submit_results(request):

	if request.method == 'POST':

		#Credit Reward to this person (To be done)
		# username = get_username_from_token(request.META['HTTP_AUTHORIZATION'])

		data=pickle.loads(request.body)
		
		customer = data['job']['customer']
		job_id = data['job']['job_id']
		file_name = data['job']['file_name']

		directory_prefix = settings.MEDIA_ROOT + '/' + customer + '/' + job_id
		file_name_check = directory_prefix + '/result/' + file_name+'.pickle'
		if not os.path.isfile(file_name_check):
			pickle.dump(data['result'],open(file_name_check,'wb'))

			num_dataset = len(os.listdir(directory_prefix+'/dataset/'))
			num_result = len(os.listdir(directory_prefix+'/result/'))
			if (num_dataset == num_result):
				summarize(customer, job_id)

				#increase epoch count
				conn = redis.Redis('localhost')
				num_epochs = int(conn.get(customer+';'+job_id))+1
				conn.set(customer+';'+job_id, str(num_epochs))

				if (num_epochs == settings.NUM_EPOCHS):
					user = User.objects.get(username=customer)
					job = Jobs.objects.get(user=user,job=job_id)
					job.summarized=True
					job.save()
		
		return HttpResponse("Successfully Submitted Parameters!!")

@csrf_exempt
def get_status(request):

	if request.method == 'GET':
		username = get_username_from_token(request.META['HTTP_AUTHORIZATION'])

		user = User.objects.get(username=username)
		jobs = Jobs.objects.filter(user=user)

		data = []

		if (jobs.exists()):
			for each in jobs:
				data.append({
					'job': each.job,
					'summarized': each.summarized,
					'accuracy': each.accuracy
				})

		return JsonResponse({ 'jobs': data })

@csrf_exempt
def evaluate(request):

	if request.method == 'POST':

		username = get_username_from_token(request.META['HTTP_AUTHORIZATION'])
		test_file = request.FILES['test_data']
		job_id = request.POST['job_id']

		directory_prefix = settings.MEDIA_ROOT + '/' + username + '/' + job_id
		#Initialize Model for final weight updates
		(biases, weights, eta) = pickle.load(open(directory_prefix+'/parameters.pickle','rb'))
		net = Network(biases, weights, eta)

		data = genfromtxt(test_file,delimiter=',')
		X_test = data[:,:-1]    #skip last column
		y_test = data[:,-1]	   #last column is the target
		x_dims = X_test.shape[1]
		total = X_test.shape[0]

		test_inputs = [np.reshape(x,(x_dims, 1)) for x in X_test]
		test_data = list(zip(test_inputs, y_test))

		result = net.evaluate(test_data)

		user = User.objects.get(username=username)
		job = Jobs.objects.get(user=user,job=job_id)
		job.accuracy = str(round(100.0*result/total,2))
		job.save()

		return HttpResponse("Successfully Evaluated on Test Data")



