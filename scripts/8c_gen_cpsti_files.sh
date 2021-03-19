#!/bin/bash

curl http://localhost:5050/stat/cpsti > ../backend/json/cpsti/cpsti-maille-national.json
curl http://localhost:5050/stat/cpsti/reg > ../backend/json/cpsti/cpsti-maille-regional.json
curl http://localhost:5050/stat/cpsti/dep > ../backend/json/cpsti/cpsti-maille-departemental.json

json-minify ../backend/json/cpsti/cpsti-maille-national.json > ../backend/json/cpsti/cpsti-maille-national-minify.json
json-minify ../backend/json/cpsti/cpsti-maille-regional.json > ../backend/json/cpsti/cpsti-maille-regional-minify.json
json-minify ../backend/json/cpsti/cpsti-maille-departemental.json > ../backend/json/cpsti/cpsti-maille-departemental-minify.json

output=`curl http://localhost:5050/lastupdate/cpsti | head -n 1| cut -d $' ' -f2`
mkdir ../backend/json/cpsti/$output

cp ../backend/json/cpsti/cpsti* ../backend/json/cpsti/$output
cp ../backend/json/cpsti/cpsti* ../frontend/static/datasets/prod/cpsti/

curl http://localhost:5050/lastupdatehtml/cpsti > ../backend/json/cpsti/last_update_data.txt

cp ../backend/json/cpsti/last_update_data.txt ../frontend/static/datasets/prod/cpsti/


psql -d dashboard -c "\copy (SELECT * FROM (SELECT 'Aide CPSTI' as dispositif, sum(C.nombre) as nombre_beneficiaires, sum(C.montant) as montant_total, C.reg, REG.libelle as libelle_region, C.code_section, N.libelle_section, MAX(C.last_update) as date_maj FROM cpsti C LEFT JOIN region REG ON REG.reg = C.reg LEFT JOIN (SELECT DISTINCT code_section, libelle_section FROM naf) N ON C.code_section = N.code_section GROUP BY C.reg, REG.libelle, C.code_section, N.libelle_section ORDER BY REG.libelle, C.code_section) tbl WHERE nombre_beneficiaires > 2) TO '/tmp/cpsti-regional-naf-latest.csv' DELIMITER ',' CSV HEADER;"
mv /tmp/cpsti-regional-naf-latest.csv ../published-data/

psql -d dashboard -c "\copy (SELECT * FROM (SELECT 'Aide CPSTI' as dispositif, sum(C.nombre) as nombre_beneficiaires, sum(C.montant) as montant_total, C.reg, REG.libelle as libelle_region, C.dep, D.libelle AS libelle_departement, C.code_section, N.libelle_section, MAX(C.last_update) as date_maj FROM cpsti C LEFT JOIN region REG ON REG.reg = C.reg LEFT JOIN departement D ON D.dep = C.dep LEFT JOIN (SELECT DISTINCT code_section, libelle_section FROM naf) N ON C.code_section = N.code_section GROUP BY C.reg, REG.libelle, C.dep, D.libelle, C.code_section, N.libelle_section ORDER BY REG.libelle, D.libelle, C.code_section) tbl WHERE nombre_beneficiaires > 2) TO '/tmp/cpsti-departemental-naf-latest.csv' DELIMITER ',' CSV HEADER;"

mv /tmp/cpsti-departemental-naf-latest.csv ../published-data/

/srv/dashboard/venv/bin/python3 8d_gen_xlsx_cpsti.py

mkdir ../published-data/cpsti/cpsti-$output
cp ../published-data/cpsti-*.csv ../published-data/cpsti/cpsti-$output/
cp ../published-data/cpsti-*.xlsx ../published-data/cpsti/cpsti-$output/
