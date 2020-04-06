# Dashboard Aides aux Entreprises

Les scripts du dossier scripts permettent :
- de télécharger les données siren
- de les enrichir avec des données de département et de région
- de les charger dans une base postgres

Le backend propose pour le moment une API minimaliste permettant de requêter un numéro de SIRET.
Pour lancer le backend :
```
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

