from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
import os

app = Flask(__name__)
env_path = os.path.join(os.path.dirname(__file__), '../config', '.env')
load_dotenv(env_path)
angular_api_url= os.getenv("LOCAL_ANGULAR")
CORS(app)
@app.route('/user-data', methods=['POST'])
@cross_origin(origins=angular_api_url, methods=['POST'], headers=['Content-Type'])
def receive_user_data():
    data = request.json  # Récupérer les données envoyées en JSON depuis Angular
    # Traiter les données comme vous le souhaitez
    print("Données utilisateur reçues :", data)
    
    # Exemple de réponse
    response = {"message": "Données utilisateur reçues avec succès"}
    return jsonify(response), 200

if __name__ == '__main__':
    app.run(debug=True)
