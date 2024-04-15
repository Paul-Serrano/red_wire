# Python

- cd backend
- python -m venv venv
- .\venv\Scripts\activate
- pip install pymongo
- pip install requests
- pip install python_dotenv
- pip install Flask
- pip install flask-cors
<!-- - pip install bson package un pau moisis -->

# Angular

- npm i -g @angular/cli
- ng v
- ng new app (? Do you want to enable Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering)? Yes)
- cd red_wire_app
- ng serve -o

# Tailwind CSS

- npm install -D tailwindcss postcss autoprefixer
- npx tailwindcss init

# Google authentification

- https://www.youtube.com/watch?v=EO-U01u9vFQ&ab_channel=Let%27sProgram

# Launch App

```sh
docker run --name mongodb -d -p 27017:27017 -v c:/Users/Utilisateur/mongodb:/data/db/ mongodb/mongodb-community-server:latest

```

- run backend/app.py
- cd .\red_wire_app\
- ng serve -o
- http://localhost:4200/

## Définir une stack

- pip freeze > requirements.txt

- front : angular + js + css (tailwind, bootstrap, ...)

- back : nodejs + express + mongoose | prisma | ...

- db :

  - hébergeur : sql (mysql | mariadb, postgresql, sqlite)
  - dbaaS :
    - database as a service
    - cloud :
      - firebase (google), AWS (amazon), azure (microsoft)
      - mongodb : Atlas
      - neo4j : ?
      - cassandra : sql
      - Airtable, NocoDB, Notion (Api)

- tools : sass, github, vsc

### Mongo Atlas = dbaaS
