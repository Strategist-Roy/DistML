from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "http://localhost:8080"}})

@app.route('/',methods=['GET'])
def hello_world():
    return jsonify({
        'text': 'Haha Gotcha!!'
    })

if __name__ == '__main__':
    print("hello")
    app.run(host='127.0.0.1', port=5000)