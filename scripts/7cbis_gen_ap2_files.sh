#!/bin/bash

curl http://localhost:5050/stat/activitepartielle2 > ../backend/json/activite-partielle2/activite-partielle-2-maille-national.json
curl http://localhost:5050/stat/activitepartielle2/reg > ../backend/json/activite-partielle2/activite-partielle-2-maille-regional.json
curl http://localhost:5050/stat/activitepartielle2/dep > ../backend/json/activite-partielle2/activite-partielle-2-maille-departemental.json

json-minify ../backend/json/activite-partielle2/activite-partielle-2-maille-national.json > ../backend/json/activite-partielle2/activite-partielle-2-maille-national-minify.json
json-minify ../backend/json/activite-partielle2/activite-partielle-2-maille-regional.json > ../backend/json/activite-partielle2/activite-partielle-2-maille-regional-minify.json
json-minify ../backend/json/activite-partielle2/activite-partielle-2-maille-departemental.json > ../backend/json/activite-partielle2/activite-partielle-2-maille-departemental-minify.json

output=`curl http://localhost:5050/lastupdate/activitepartielle2 | head -n 1| cut -d $' ' -f2`
mkdir ../backend/json/activite-partielle2/$output

cp ../backend/json/activite-partielle2/activite-partielle* ../backend/json/activite-partielle2/$output
cp ../backend/json/activite-partielle2/activite-partielle* ../frontend/static/datasets/prod/activite-partielle2/

curl http://localhost:5050/lastupdatehtml/activitepartielle2 > ../backend/json/activite-partielle2/last_update_data.txt

cp ../backend/json/activite-partielle2/last_update_data.txt ../frontend/static/datasets/prod/activite-partielle2/

psql -d dashboard -c "\copy (SELECT * FROM (SELECT 'Activite Partielle' as dispositif, P.mois, sum(P.nombre_demandes_deposees) as nombre_demandes_deposees, sum(P.nombre_salaries_concernes) as nombre_salaries_concernes, sum(P.nombre_heures_demandees) as nombre_heures_demandees, P.reg, REG.libelle as libelle_region, P.code_section_nace17, N.libelle as libelle_section_nace17, MAX(last_update) as date_maj FROM activitepartielle P LEFT JOIN region REG ON REG.reg = P.reg LEFT JOIN nace17 N ON P.code_section_nace17 = N.code_section_nace17 GROUP BY P.reg, P.mois, REG.libelle, P.code_section_nace17, N.libelle ORDER BY REG.libelle, P.mois, P.code_section_nace17) tbl WHERE nombre_salaries_concernes > 2) TO '/tmp/activite-partielle-2-regional-nace17-latest.csv' DELIMITER ',' CSV HEADER;"

mv /tmp/activite-partielle-2-regional-nace17-latest.csv ../published-data/

python3 7d_gen_xlsx_ap2.py

mkdir ../published-data/activite-partielle2/activite-partielle-2-$output
cp ../published-data/activite-partielle-2-*.csv ../published-data/activite-partielle2/activite-partielle-2-$output/
cp ../published-data/activite-partielle-2-*.xlsx ../published-data/activite-partielle2/activite-partielle-2-$output/
