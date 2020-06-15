#!/bin/bash

curl http://localhost:5000/stat/activitepartielle > ../backend/json/activite-partielle/activite-partielle-maille-national.json
curl http://localhost:5000/stat/activitepartielle/reg > ../backend/json/activite-partielle/activite-partielle-maille-regional.json
curl http://localhost:5000/stat/activitepartielle/dep > ../backend/json/activite-partielle/activite-partielle-maille-departemental.json

json-minify ../backend/json/activite-partielle/activite-partielle-maille-national.json > ../backend/json/activite-partielle/activite-partielle-maille-national-minify.json
json-minify ../backend/json/activite-partielle/activite-partielle-maille-regional.json > ../backend/json/activite-partielle/activite-partielle-maille-regional-minify.json
json-minify ../backend/json/activite-partielle/activite-partielle-maille-departemental.json > ../backend/json/activite-partielle/activite-partielle-maille-departemental-minify.json

output=`curl http://localhost:5000/lastupdate/activitepartielle | head -n 1| cut -d $' ' -f2`
mkdir ../backend/json/activite-partielle/$output

cp ../backend/json/activite-partielle/activite-partielle* ../backend/json/activite-partielle/$output
cp ../backend/json/activite-partielle/activite-partielle* ../frontend/static/datasets/prod/activite-partielle/

curl http://localhost:5000/lastupdatehtml/activitepartielle > ../backend/json/activite-partielle/last_update_data.txt

cp ../backend/json/activite-partielle/last_update_data.txt ../frontend/static/datasets/prod/activite-partielle/

sudo -u postgres psql -d dashboard -c "\copy (SELECT * FROM (SELECT 'Activite Partielle' as dispositif, sum(P.nombre_demandes_deposees) as nombre_demandes_deposees, sum(P.nombre_salaries_concernes) as nombre_salaries_concernes, sum(P.nombre_heures_demandees) as nombre_heures_demandees, sum(P.nombre_etablissements_concernes) as nombre_etablissements_concernes, P.reg, REG.libelle as libelle_region, P.dep, D.libelle as libelle_departement, P.code_section_nace17, N.libelle as libelle_section_nace17 FROM activitepartielle P LEFT JOIN region REG ON REG.reg = P.reg LEFT JOIN departement D ON D.dep = P.dep LEFT JOIN nace17 N ON P.code_section_nace17 = N.code_section_nace17 GROUP BY P.reg, REG.libelle, P.dep, D.libelle, P.code_section_nace17, N.libelle ORDER BY REG.libelle, D.libelle, P.code_section_nace17) tbl WHERE nombre_etablissements_concernes > 2) TO '/tmp/activite-partielle-departemental-nace17-latest.csv' DELIMITER ',' CSV HEADER;"


sudo -u postgres psql -d dashboard -c "\copy (SELECT * FROM (SELECT 'Activite Partielle' as dispositif, sum(P.nombre_demandes_deposees) as nombre_demandes_deposees, sum(P.nombre_salaries_concernes) as nombre_salaries_concernes, sum(P.nombre_heures_demandees) as nombre_heures_demandees, sum(P.nombre_etablissements_concernes) as nombre_etablissements_concernes, P.reg, REG.libelle as libelle_region, P.code_section_nace17, N.libelle as libelle_section_nace17 FROM activitepartielle P LEFT JOIN region REG ON REG.reg = P.reg LEFT JOIN nace17 N ON P.code_section_nace17 = N.code_section_nace17 GROUP BY P.reg, REG.libelle, P.code_section_nace17, N.libelle ORDER BY REG.libelle, P.code_section_nace17) tbl WHERE nombre_etablissements_concernes > 2) TO '/tmp/activite-partielle-regional-nace17-latest.csv' DELIMITER ',' CSV HEADER;"

sudo mv /tmp/activite-partielle-departemental-nace17-latest.csv ../published-data/
sudo mv /tmp/activite-partielle-regional-nace17-latest.csv ../published-data/

python 7d_gen_xlsx_activite_partielle.py

mkdir ../published-data/activite-partielle/activite-partielle-$output
cp ../published-data/activite-partielle-*.csv ../published-data/activite-partielle/activite-partielle-$output/
cp ../published-data/activite-partielle-*.xlsx ../published-data/activite-partielle/activite-partielle-$output/
