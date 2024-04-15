from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from .weather import Weather

class Db:
    def __init__(self, uri, server_api_version='1'):
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

            # Insère ou met à jour les données dans la collection
            self.db[collection_name].replace_one({}, data, upsert=True)
            print(f"Données insérées/mises à jour dans la collection '{collection_name}'.")
        except Exception as e:
            print(f"Erreur lors de l'insertion/mise à jour dans la collection '{collection_name}': {e}")


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
    
    def get_weather(self):
        loc = self.weather.get_localisation()
        lon = loc['lon']
        lat = loc['lat']
        return self.weather.get_weather(lat, lon)


# Utilisation de la classe DatabaseManager avec la variable uri
uri = "mongodb://localhost:27017"
database_manager = Db(uri)

# Vérifie la connexion à la base de données
database_manager.check_connection()

# Crée la collection 'user' si elle n'existe pas
database_manager.create_collection('user')

# Affiche la liste des bases de données
print("Liste des bases de données :", database_manager.list_databases())

database_manager.set_collection('user', database_manager.get_weather())

# test = database_manager.get_collection_data('user')
# print(test)