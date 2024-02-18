import requests
from dotenv import load_dotenv
import os

class WeatherFetcher:
    def __init__(self):
        # Spécifie le chemin du fichier .env
        env_path = os.path.join(os.path.dirname(__file__), 'config', '.env')
        load_dotenv(env_path)

        # Récupère la clé API à partir des variables d'environnement
        self.api_key = os.getenv("API_KEY_OPEN_WEATHER")

    def get_localisation(self):
        url = "http://ipinfo.io/json"
        reponse = requests.get(url)
        data = reponse.json()

        latitude, longitude = map(float, data['loc'].split(','))

        return {
            'lat':latitude, 
            'lon':longitude
            }
    
    def get_weather(self, lat, lon):
        url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={self.api_key}"

        try:
            reponse = requests.get(url)
            weather_data = reponse.json()
            return weather_data

        except requests.exceptions.RequestException as e:
            print(f"Erreur de requête API : {e}")
