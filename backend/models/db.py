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
            ("Connexion à la base de données réussie.")
        except Exception as e:
            (f"Erreur de connexion à la base de données : {e}")

    def create_collection(self, collection_name):
        collist = self.db.list_collection_names()
        if collection_name not in collist:
            self.db.create_collection(collection_name)
            (f"Collection '{collection_name}' créée avec succès.")
        else:
            (f"La collection '{collection_name}' existe déjà.")

    def set_collection(self, collection_name, data):
        try:
            # Tente de créer la collection
            self.create_collection(collection_name)

            # Insère les données dans la collection
            self.db[collection_name].insert_one(data)
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

    def get_user_history(self, email):
        try:
            # Recherche les objets ayant le champ email spécifié
            query = self.db.user.find({"email": email})
            return [user_data for user_data in query]
        except Exception as e:
            print(f"Erreur lors de la récupération des données utilisateur: {e}")
            return None
        
    def delete_user_data(self, email):
        try:
            self.db.user.delete_many({"email": email})
        except Exception as e:
            print(f"Erreur lors de la suppression des données utilisateurs: {e}")
            return None
