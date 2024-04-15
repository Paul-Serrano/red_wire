from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

from models.weather import Weather
# from models.user import User
import os

app = Flask(__name__)
CORS(app, resources={r"/*": { "origins": "*" }})

env_path = os.path.join(os.path.dirname(__file__), './config', '.env')
load_dotenv(env_path)
angular_api_url= os.getenv("LOCAL_ANGULAR")

weather_fetcher = Weather()

@app.route('/user-data', methods=['POST'])
def receive_user_data():
    data = request.json  # Récupérer les données envoyées en JSON depuis Angular
    # Traiter les données comme vous le souhaitez
    data.pop("weather_history", None)
    data.pop("user_stats", None)
    # user = User(data['client_id'], data['family_name'], data['given_name'], data['email'], data['locale'], data['weather_now'])
    # user.save_user()
    print("Données utilisateur reçues :", data['client_id'])
    
    # Exemple de réponse
    return jsonify(data), 200

@app.route('/', methods=['GET'])
def get_weather():
    latitude = weather_fetcher.get_localisation()["lat"]
    longitude = weather_fetcher.get_localisation()["lon"]
    weather_data = weather_fetcher.get_weather(latitude, longitude)
    return jsonify(weather_data)

app.run(debug=True)
