import time, requests, json
from io import StringIO
import pandas as pd

serverUrl = 'http://127.0.0.1:8000/'

def process_data(df):
    #Perform ML logic here
    return df['Numbers'].sum()

with open('src/initialState.json') as f:

    #Get jwt_token
    state = json.load(f)
    headers = {
        'content-type': 'application/json',
        'Authorization': state["userState"]["token"] 
    }

    while True:
        time.sleep(1)    #To delay and observe
        #Get next file to train from redis server
        r = requests.get(serverUrl+'ml/dispatch/', headers=headers)
        data = r.json()
        
        if data is not None:
            #Download the file
            file_url = serverUrl+'media/'+data['customer']+'/'+data['job_id']+'/dataset/'+data['file_name']+'.csv'
            r = requests.get(file_url, headers=headers)
            
            #Get file contents as a string
            str_content=r.content.decode()

            #Convert string to pandas dataframe
            df = pd.read_csv(StringIO(str_content))

            result = process_data(df)

            requests.post(
                serverUrl+'ml/submit_results/', 
                data=json.dumps({
                    'job': data,
                    'result': result.item(),   #Very important to convert numpy substances to 
                                                #native types to make JSON serializable
                }),
                headers=headers)