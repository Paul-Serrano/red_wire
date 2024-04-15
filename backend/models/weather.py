import requests
from dotenv import load_dotenv
import os

class Weather:
    def __init__(self):
        # Spécifie le chemin du fichier .env
        env_path = os.path.join(os.path.dirname(__file__), '../config', '.env')
        load_dotenv(env_path)

        # Récupère la clé API à partir des variables d'environnement
        self.api_key = os.getenv("API_KEY_OPEN_WEATHER")
        self.api_loc_url = os.getenv("API_URL_LOCALISATION")
        print("Loaded env:")
        print(self.api_key)
        print(self.api_loc_url)

    def get_localisation(self):
        reponse = requests.get(self.api_loc_url)
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
