import time, requests, json

while True:
    time.sleep(1)
    r = requests.post('http://127.0.0.1:8000/user/test_upload/',
        data = json.dumps({
            'text': 'Please Write to File',
            'text2': 'haha gotcha!!',
        })
    )