from django.shortcuts import render
from django.http import HttpResponse, HttpResponseForbidden
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.conf import settings
import os, json, redis, jwt, pickle, time, hashlib
import pandas as pd

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

	#create directory structure according to that
	directory = settings.MEDIA_ROOT+'/'+username+'/'+job_id+'/dataset/'

	#check if directory exists
	if not os.path.exists(directory):
		os.makedirs(directory)

	#split into chunks and save
	conn = redis.Redis('localhost')

	for i in range(0,l,10):
		file_name = str(int(i/10))
		df[i:min(i+chunk,l)].to_csv(directory+file_name+'.csv',index=False)

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

@csrf_exempt
def submit_results(request):

	if request.method == 'POST':

		#Credit Reward to this person (To be done)
		username = get_username_from_token(request.META['HTTP_AUTHORIZATION'])

		data = json.loads(request.body.decode())

		#Get job details (hence the final directory)
		job = data['job']
		result = data['result']

		#check if directory is present, make one if not present
		directory = settings.MEDIA_ROOT+'/'+job['customer']+'/'+job['job_id']+'/result/'
		if not os.path.exists(directory):
			os.makedirs(directory)

		file_name = directory+job['file_name']+'.pickle'
		with open(file_name,'wb') as f:
			pickle.dump(result, f)

		return HttpResponse("Data Return Successfull!")
