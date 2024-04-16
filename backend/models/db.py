from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from models.weather import Weather
import os

class Db:
    def __init__(self, uri, server_api_version='1'):
        self.api_loc_url = os.getenv("API_URL_LOCALISATION")
        self.uri = uri
        self.client = MongoClient(uri, server_api=ServerApi(server_api_version))
        self.db = self.client.red_wire
        self.weather = Weather()

    def check_connection(self):
        try:
            self.client.admin.command('ping')
            print("Connexion à la base de données réussie.")
        except Exception as e:
            print(f"Erreur de connexion à la base de données : {e}")

    def create_collection(self, collection_name):
        collist = self.db.list_collection_names()
        if collection_name not in collist:
            self.db.create_collection(collection_name)
            print(f"Collection '{collection_name}' créée avec succès.")
        else:
            print(f"La collection '{collection_name}' existe déjà.")

    def set_collection(self, collection_name, data):
        try:
            # Tente de créer la collection
            self.create_collection(collection_name)

            # Insère les données dans la collection
            self.db[collection_name].insert_one(data)
            print(f"Données insérées dans la collection '{collection_name}'.")
            print("db.py :")
            print(data)
        except Exception as e:
            print(f"Erreur lors de l'insertion dans la collection '{collection_name}': {e}")


    def get_collection_data(self, collection_name):
        try:
            # Vérifie si la collection existe
            collist = self.db.list_collection_names()
            if collection_name not in collist:
                print(f"La collection '{collection_name}' n'existe pas.")
                return None

            # Récupère les données de la collection
            collection_data = self.db[collection_name].find_one({})
            print(f"Données récupérées de la collection '{collection_name}': {collection_data}")
            return collection_data
        except Exception as e:
            print(f"Erreur lors de la récupération des données de la collection '{collection_name}': {e}")
            return None

    def list_databases(self):
        return self.client.list_database_names()
    
    def save_in_db(self, data):
        self.check_connection()
        self.set_collection('user', data)
