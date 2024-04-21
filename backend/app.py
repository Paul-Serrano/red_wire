from flask import Flask, request, jsonify
from bson import json_util
import json
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

def serializeBson(data):
    return jsonify(json.dumps(data, default=json_util.default))

@app.route('/user-data', methods=['POST'])
def receive_user_data():
    data = request.json  # Récupérer les données envoyées en JSON depuis Angular
    # Traiter les données comme vous le souhaitez
    data.pop("weather_history", None)
    data.pop("user_stats", None)
    data['weather_now'] = weather_fetcher.get_weather(latitude, longitude)
    date_time = datetime.datetime.now()
    data['weather_now']['date'] = date_time.date().isoformat()
    data['weather_now']['time'] = date_time.strftime("%H:%M:%S")
    db.save_in_db(data)

 
    # Exemple de réponse
    return serializeBson(data), 200

@app.route('/', methods=['GET'])
def get_weather():
    weather_data = weather_fetcher.get_weather(latitude, longitude)
    return jsonify(weather_data), 200

@app.route('/history-data', methods=['GET'])
def get_user_history():
    # Assurez-vous d'avoir la clé 'email' dans les paramètres de la requête GET
    email = request.args.get('email')
    print('email')
    print(email)
    # return '', 200
    weather_history = []
    if email:
        user_history = db.get_user_history(email)
        for user_object in user_history:
            weather_history.append(user_object['weather_now'])
        user_data = {
            'weather_history' : weather_history,
            'weather_now' : weather_history[len(weather_history) - 1],
            'family_name' : user_history[0]['family_name'],
            'given_name' : user_history[0]['given_name'],
            'email' : user_history[0]['email'],
            'client_id' : user_history[0]['client_id']
        }
        print(user_data)
        return serializeBson(user_data), 200
    else:
        return jsonify({"error": "Email not provided"}), 400

app.run(debug=True)
