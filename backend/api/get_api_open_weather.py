from flask import Flask, jsonify
from flask_cors import CORS
from models.weather import Weather

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def get_weather():
    weather_fetcher = Weather()
    latitude = weather_fetcher.get_localisation()["lat"]
    longitude = weather_fetcher.get_localisation()["lon"]
    # latitude, longitude = weather_fetcher.get_localisation()
    weather_data = weather_fetcher.get_weather(latitude, longitude)
    return jsonify(weather_data)

app.run(debug=True)
