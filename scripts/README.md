# Scripts

Pour faire fonctionner ces scripts, il faut d'abord activer un nouvel environnement python :
```
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd scripts/
```

Ces scripts permettent de construire la base de données Postgres afin que le backend de l'application soit opérationnel.

Prérequis : 
- installation postgres
- création d'un utilisateur postgres pouvant créer des bases et des tables

Description des différentes étapes déroulées par les scripts :

| Etape | Explication |
|---|---|
| 0 | Téléchargement des données SIREN déjà géocodées |
| 1 | Enrichissement de ces données avec le numéro de la région et du département |
| 2 | Intégration des données dans une base "dashboard". Intégration des données SIRET, REGION, DEPARTEMENT, CLASSEEFFECTIF, NAF, SIREN, CATEGORIEJURIDIQUE, NACE17 |
| 3 | Extraction minimale de données de la table "siret" dans un fichier csv pour les étapes suivantes. Un fichier d'extract des siret sièges, un autre des catégorie juridiques des siren |
| 4 | Etapes pour la gestion des aides du fonds de solidarité : <br>a) Création de la base <br> a-bis) Récupération de l'historique <br> b) processing du fichier du jour <br> c) Insertion des données processées dans postgres <br> d) génération des outputs json, csv et xls depuis le backend Flask | 
| 5 | Etapes pour la gestion des aides de reports d'échéances fiscales : <br>a) Création de la base <br> b) processing du fichier de la semaine <br> c) Insertion des données processées dans postgres <br> d) génération des outputs json, csv et xls depuis le backend Flask |
| 6 | Etapes pour la gestion des aides de prêts garantis de l'Etat : <br>a) Création de la base <br> b) processing du fichier de la semaine <br> c) Insertion des données processées dans postgres <br> d) génération des outputs json, csv et xls depuis le backend Flask |
| 7 | Etapes pour la gestion des données de l'activité partielle : <br>a) Création de la base <br> b) processing du fichier de la semaine <br> c) Insertion des données processées dans postgres <br> d) génération des outputs json, csv et xls depuis le backend Flask |
| 8 | Etapes pour la gestion des données des aides exceptionnelles aux artisans et commerçants : <br>a) Création de la base <br> b) processing du fichier de la semaine <br> c) Insertion des données processées dans postgres <br> d) génération des outputs json, csv et xls depuis le backend Flask |

