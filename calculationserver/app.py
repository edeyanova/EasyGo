from flask import Flask
from flask import request
from description_to_vector import to_vector

app = Flask(__name__)

@app.route('/', methods=['POST'])
def index():
    data = request.get_data().decode("utf-8")
    return to_vector(data)

@app.route('/', methods=['GET'])
def index_get():
    return "OK"

if __name__ == '__main__':
    app.run()
