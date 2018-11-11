from django.http import HttpResponse, HttpResponseForbidden, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import FileSystemStorage
from django.conf import settings
from django.contrib.auth import authenticate, login as auth_login
import os, time, hashlib, redis, json, jwt
from .models import AppUsers
from django.contrib.auth.models import User

#Perform Machine Learning imports
import pandas as pd
import numpy as np

#Other utility imports
from datetime import datetime

@csrf_exempt
def login(request):

	if request.method == 'POST':

		data=json.loads(request.body.decode())
		username = data['username']
		password = data['password']

		user = authenticate(request, username=username, password=password)

		if user is not None:
			'''renamed the django login function as auth_login so that 
			   name conflict doesn't occur with this function'''
			auth_login(request, user)
			app_user = AppUsers.objects.get(user=user)

			jwt_token = jwt.encode(
							{ 'username': username },
							settings.SECRET_KEY,
							algorithm = 'HS256'
						).decode('utf-8')
			return JsonResponse({
									'name': app_user.name,
									'token': jwt_token,
									'email': user.email
								})

		else:
			return HttpResponseForbidden()

@csrf_exempt
def register(request):

	if request.method == 'POST':

		data=json.loads(request.body.decode())
		username = data['username']
		password = data['password']
		name = data['name']
		email = data['email']

		user = User.objects.create_user(username,email=email,password=password)

		app_user = AppUsers(user=user,name=name)
		app_user.save()

		jwt_token = jwt.encode(
						{ 'username': username },
						settings.SECRET_KEY,
						algorithm = 'HS256'
					).decode('utf-8')

		return JsonResponse({
								'token': jwt_token,
							})
	else:
		return HttpResponseForbidden()

@csrf_exempt
def dataset_upload(request):

	if request.method == 'POST':
		dataset = request.FILES['dataset']

		#Split save the file
		split_save(dataset,'strategist')

		return HttpResponse("Done !!")

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
def check_username_available(request):

	if request.method == 'GET':
		username = request.GET['username']
		return JsonResponse({
					'available': not User.objects.filter(username=username).exists()
				})
	else:
		return HttpResponseForbidden()

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

@csrf_exempt
def test_upload(request):

	if request.method == 'POST':

		print(json.loads(request.body.decode()))
		# data=json.loads(request.body.decode())
		# with open('upload.txt','a') as f:
		# 	f.write(data['text'])

		return HttpResponse("Successfully Written")
