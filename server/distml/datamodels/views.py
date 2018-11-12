from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json, redis

def split_save(file,username):

	df = pd.read_csv(file)
	l = len(df.index)
	chunk = settings.CHUNK_SIZE

	timestamp_in_sec = str(time.time())

	#create an unique job id based on current timestamp and user
	job_id = hashlib.sha256(timestamp_in_sec.encode()).hexdigest()[:15]

	#create directory structure according to that
	directory = settings.MEDIA_ROOT+'/'+username+'/'+job_id+'/'

	#check if directory exists
	if not os.path.exists(directory):
		os.makedirs(directory)

	#split into chunks and save
	conn = redis.Redis('localhost')

	for i in range(0,l,10):
		file_name = str(int(i/10))+'.csv'
		df[i:min(i+chunk,l)].to_csv(directory+file_name,index=False)

		#Push into Redis List
		conn.rpush('data',job_id+';'+file_name)

@csrf_exempt
def dataset_upload(request):

	if request.method == 'POST':
		dataset = request.FILES['dataset']

		#Split save the file
		split_save(dataset,'strategist')

		return HttpResponse("Done !!")

@csrf_exempt
def dispatch(request):
	if request.method == 'GET':
	
		conn = redis.Redis('localhost')

		if conn.llen('data'):

			#get chunk from redis list
			chunk = conn.lpop('data').decode().split(';')

			#fetch job id and file name seperately
			job_id = chunk[0]
			file_name = chunk[1]

			data = {
				'job_id': job_id, 
				'file_name': file_name
			}

			return HttpResponse(json.dumps(data))

		else:   #No dataset remaining
			return HttpResponse(json.dumps(None))
