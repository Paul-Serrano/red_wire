from flask import Flask
from flask_cors import CORS
from multiprocessing import Process
from api.post_angular import app as angular_post_app
from api.get_api_open_weather import app as open_weather_app

app = Flask(__name__)
CORS(app)

def run_open_weather_api():
    open_weather_app.run(debug=True)

def run_angular_post_api():
    angular_post_app.run(debug=True)

if __name__ == '__main__':
    open_weather_process = Process(target=run_open_weather_api)
    angular_post_process = Process(target=run_angular_post_api)

    open_weather_process.start()
    angular_post_process.start()

    open_weather_process.join()
    angular_post_process.join()
