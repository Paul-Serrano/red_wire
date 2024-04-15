from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

from models.weather import Weather
import os

app = Flask(__name__)
CORS(app, ressources={r"/*": { "origins": "*" }})

env_path = os.path.join(os.path.dirname(__file__), './config', '.env')
load_dotenv(env_path)
angular_api_url= os.getenv("LOCAL_ANGULAR")

weather_fetcher = Weather()

@app.route('/user-data', methods=['POST'])
def receive_user_data():
    data = request.json  # Récupérer les données envoyées en JSON depuis Angular
    # Traiter les données comme vous le souhaitez
    print("Données utilisateur reçues :", data)
    
    # Exemple de réponse
    return jsonify(data), 200

@app.route('/', methods=['GET'])
def get_weather():
    latitude = weather_fetcher.get_localisation()["lat"]
    longitude = weather_fetcher.get_localisation()["lon"]
    # latitude, longitude = weather_fetcher.get_localisation()
    weather_data = weather_fetcher.get_weather(latitude, longitude)
    return jsonify(weather_data)

app.run(debug=True)
