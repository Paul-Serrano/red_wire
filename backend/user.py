from db import Db

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
            db_connection: Db
            ):
        self.client_id = client_id
        self.family_name = family_name
        self.given_name = given_name
        self.email = email
        self.locale = locale
        self.weather_now = weather_now
        self.weather_history = weather_history
        self.db_connection = db_connection

    def save_user(self):
        pass

    def get_user(self):
        pass

    def get_all_users(self):
        pass
