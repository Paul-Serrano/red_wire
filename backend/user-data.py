from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins='http://localhost:4200/')

@app.route('/user-data', methods=['POST'])
def receive_user_data():
    data = request.json  # Récupérer les données envoyées en JSON depuis Angular
    # Traiter les données comme vous le souhaitez
    print("Données utilisateur reçues :", data)
    
    # Exemple de réponse
    response = {"message": "Données utilisateur reçues avec succès"}
    return jsonify(response), 200

if __name__ == '__main__':
    app.run(debug=True)
