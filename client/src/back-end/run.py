import time, requests, json
from io import StringIO
import pandas as pd
import numpy as np
import pickle

#get network class
from network import Network

serverUrl = 'http://127.0.0.1:8000/'

def vectorized_result(num_classes,j):
    e = np.zeros((num_classes, 1))
    e[j] = 1.0
    return e

def process_data(model,dataset):
    (biases, weights, eta) = pickle.loads(model)
    net = Network(biases, weights, eta)

    X = dataset[:,:-1]    #skip last column
    Y = dataset[:,-1]	   #last column is the target
    x_dims = X.shape[1]
    num_classes = len(np.unique(Y))

    training_inputs = [np.reshape(x,(x_dims,1)) for x in X]
    training_outputs = [vectorized_result(num_classes,int(y)) for y in Y]
    training_data = list(zip(training_inputs,training_outputs))

    nabla_b, nabla_w = net.update_mini_batch(training_data)

    return (nabla_b, nabla_w, X.shape[0])

with open('src/initialState.json') as f:

    #Get jwt_token
    state = json.load(f)
    headers = {
        'Content-Type': 'application/octet-stream',
        'Authorization': state["userState"]["token"] 
    }

    while True:
        # time.sleep(1)    #To delay and observe

        #Get next file to train from redis server
        r = requests.get(serverUrl+'ml/dispatch/', headers=headers)
        data = r.json()
        
        if data is not None:
            #Download the dataset file
            file_url = serverUrl+'media/'+data['customer']+'/'+data['job_id']+'/dataset/'+data['file_name']+'.csv'
            r = requests.get(file_url, headers=headers)
            
            #Get file contents as a string
            str_content=r.content.decode()

            #Convert string to pandas dataframe
            converted_string = StringIO(str_content) 
            dataset = np.genfromtxt(converted_string,delimiter=',')

            #Download the pickled model file
            model_url = serverUrl+'media/'+data['customer']+'/'+data['job_id']+'/parameters.pickle'
            r = requests.get(model_url,headers=headers)
            result = process_data(r.content, dataset)

            return_val = pickle.dumps({
                'job': data,
                'result': result
            })

            requests.post(
                serverUrl+'ml/submit_results/', 
                data=return_val,
                headers=headers)
