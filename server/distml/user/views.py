from django.http import HttpResponse, HttpResponseForbidden, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import FileSystemStorage
from django.conf import settings
from django.contrib.auth import authenticate, login as auth_login

import os, time, hashlib, redis, json, jwt
from .models import AppUsers
from django.contrib.auth.models import User
from datamodels.models import Jobs

#Perform Machine Learning imports
import pandas as pd
import numpy as np

#Other utility imports
from datetime import datetime

def get_username_from_token(token):

	decoded_jwt = jwt.decode(
						token,
						settings.SECRET_KEY,
						algorithm='HS256'
					)

	return decoded_jwt['username']

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

			#Get all jobs corresponding to the particular user
			jobs = Jobs.objects.filter(user=user)
			jobData = []

			if jobs.exists():
				for each in jobs:
					jobData.append({
						'job': each.job,
						'summarized': each.summarized
					})

			return JsonResponse({
									'name': app_user.name,
									'token': jwt_token,
									'email': user.email,
									'jobs': jobData
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
def check_username_available(request):

	if request.method == 'GET':
		username = request.GET['username']
		return JsonResponse({
					'available': not User.objects.filter(username=username).exists()
				})
	else:
		return HttpResponseForbidden()

@csrf_exempt
def test_upload(request):

	if request.method == 'POST':

		username = get_username_from_token(request.META['HTTP_AUTHORIZATION'])

		print(username,json.loads(request.body.decode()))
		# data=json.loads(request.body.decode())
		# with open('upload.txt','a') as f:
		# 	f.write(data['text'])

		return HttpResponse("Successfully Written")
