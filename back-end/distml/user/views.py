from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import FileSystemStorage

#Perform Machine Learning imports
import pandas as pd
import numpy as np


#Other utility imports
from datetime import datetime

@csrf_exempt
def dataset_upload(request):

	if request.method == 'POST':
		file = request.FILES['dataset']
		fs = FileSystemStorage(location='./user/data/')
		f_name = fs.save('test.csv',file)
		print(fs.url(f_name))
		return HttpResponse("Hello World")

def dispatch():
	pass



#Utility Functions
def split_dataset(df):

	active_devices = 5  #Fetch this data from database according to device logged on

	df = df.sample(frac=1)    #Random Shuffle the data
	df_split = np.array_split(df,active_devices)    #Split according to number of devices present
