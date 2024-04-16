from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from models.weather import Weather
from models.db import Db

import os
import datetime

app = Flask(__name__)
CORS(app, resources={r"/*": { "origins": "*" }})

env_path = os.path.join(os.path.dirname(__file__), './config', '.env')
load_dotenv(env_path)
angular_api_url= os.getenv("LOCAL_ANGULAR")
mongoDb_url = os.getenv("LOCAL_MONGODB")


weather_fetcher = Weather()
db = Db(mongoDb_url)

latitude = weather_fetcher.get_localisation()["lat"]
longitude = weather_fetcher.get_localisation()["lon"]

date_time = datetime.datetime.now()

@app.route('/user-data', methods=['POST'])
def receive_user_data():
    data = request.json  # Récupérer les données envoyées en JSON depuis Angular
    # Traiter les données comme vous le souhaitez
    data.pop("weather_history", None)
    data.pop("user_stats", None)
    data['weather_now'] = weather_fetcher.get_weather(latitude, longitude)
    data['weather_now']['date'] = date_time.date().isoformat()
    data['weather_now']['time'] = date_time.strftime("%H:%M:%S")
    print("app.py :")
    print(data)
    db.save_in_db(data)

    
    # Exemple de réponse
    return jsonify(data), 200

@app.route('/', methods=['GET'])
def get_weather():
    weather_data = weather_fetcher.get_weather(latitude, longitude)
    return jsonify(weather_data)

app.run(debug=True)
