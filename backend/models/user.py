from backend.models.db import Db
from dotenv import load_dotenv
import os

class User:
    def __init__(
            self, 
            client_id: str, 
            family_name: str, 
            given_name: str, 
            email: str, 
            locale: str, 
            weather_now: dict, 
            weather_history: list,
            ):
        self.client_id = client_id
        self.family_name = family_name
        self.given_name = given_name
        self.email = email
        self.locale = locale
        self.weather_now = weather_now
        self.weather_history = weather_history
        self.api_loc_url = os.getenv("API_URL_LOCALISATION")

    def save_user(self):
        db = Db(self.api_loc_url)
        db.check_connection()
        db.create_collection('user')
        db_user = self.make_db_user(self)
        db.set_collection('user', db_user)


    def get_user(self):
        pass

    def get_all_users(self):
        pass

    def make_db_user(self):
        pass
