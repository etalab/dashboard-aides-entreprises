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
| 0 | Téléchargement des données SIREN déjà géocodées (@cquest) |
| 1 | Enrichissement de ces données avec le numéro de la région et du département |
| 2 | Intégration des données dans une base avec pour nom de table "siret" |
| 3 | Extraction minimale de données de la table "siret" dans un fichier csv (siret actifs) pour les étapes suivantes |
| 4 | Simulation des effectifs à partir des données SIRET. Un nombre pseudo-aléatoire d'effectif a été généré pour chaque SIRET actif pour le mois de mars et d'avril. Une fois le fichier généré, il est intégré dans une table "effectif" sur postgres | 
| 5 | Simulation des aides à partir des données SIRET. 250k aides sont générés (seulement volet 1 pour le moment). Enrichissement de ces aides avec le delta effectif (entre mars et avril) en nombre et pourcentage. Intégration dans une table "aide" |
| 6 | A partir des données effectifs et siren, des stats globales sur l'évolution des effectifs sont calculés : par zone géographique (régional, départemental, code insee), par classe d'effectifs (classes à revoir avec un standard officiel) et par code APE. Une fois générées, ces stats sont intégrées dans une table "stat". NB : A noter, ces calculs sont réalisés a priori car ils sont trop longs à calculer à la volée via postgres. Pour le cas des aides, ces calculs sont générés à la volée. |

A noter, pour l'instant, les étapes 4, 5 et 6 ne manipulent que des données simulées dans le but d'anticiper certains développement backend et frontend. Ceci en attente de récupération des données réelles.
