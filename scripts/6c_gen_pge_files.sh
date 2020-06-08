#!/bin/bash

curl http://localhost:5000/stat/pge > ../backend/json/pge/pge-maille-national.json
curl http://localhost:5000/stat/pge/reg > ../backend/json/pge/pge-maille-regional.json
curl http://localhost:5000/stat/pge/dep > ../backend/json/pge/pge-maille-departemental.json

json-minify ../backend/json/pge/pge-maille-national.json > ../backend/json/pge/pge-maille-national-minify.json
json-minify ../backend/json/pge/pge-maille-regional.json > ../backend/json/pge/pge-maille-regional-minify.json
json-minify ../backend/json/pge/pge-maille-departemental.json > ../backend/json/pge/pge-maille-departemental-minify.json

output=`curl http://localhost:5000/lastupdate/pge | head -n 1| cut -d $' ' -f2`
mkdir ../backend/json/pge/$output

cp ../backend/json/pge/pge* ../backend/json/pge/$output
cp ../backend/json/pge/pge* ../frontend/static/datasets/prod/pge/

curl http://localhost:5000/lastupdatehtml/pge > ../backend/json/pge/last_update_data.txt

cp ../backend/json/pge/last_update_data.txt ../frontend/static/datasets/prod/pge/


sudo -u postgres psql -d dashboard -c "\copy (SELECT * FROM (SELECT 'Prêts garantis par l''Etat' as dispositif, sum(P.nombre) as nombre_pge, sum(P.montant) as montant_total, P.reg, REG.libelle as libelle_region, P.code_section, N.libelle_section FROM pgenaf P LEFT JOIN region REG ON REG.reg = P.reg LEFT JOIN (SELECT DISTINCT code_section, libelle_section FROM naf) N ON P.code_section = N.code_section GROUP BY P.reg, REG.libelle, P.code_section, N.libelle_section ORDER BY REG.libelle, P.code_section) tbl WHERE nombre_pge > 2) TO '/tmp/pge-regional-naf-latest.csv' DELIMITER ',' CSV HEADER;"
sudo mv /tmp/pge-regional-naf-latest.csv ../published-data/

sudo -u postgres psql -d dashboard -c "\copy (SELECT * FROM (SELECT 'Prêts garantis par l''Etat' as dispositif, sum(P.nombre) as nombre_pge, sum(P.montant) as montant_total, P.reg, REG.libelle as libelle_region, P.dep, D.libelle as libelle_departement, P.code_section, N.libelle_section FROM pgenaf P LEFT JOIN region REG ON REG.reg = P.reg LEFT JOIN departement D ON D.dep = P.dep LEFT JOIN (SELECT DISTINCT code_section, libelle_section FROM naf) N ON P.code_section = N.code_section GROUP BY P.reg, REG.libelle, P.dep, D.libelle, P.code_section, N.libelle_section ORDER BY REG.libelle, D.libelle, P.code_section) tbl WHERE nombre_pge > 2) TO '/tmp/pge-departemental-naf-latest.csv' DELIMITER ',' CSV HEADER;"

sudo mv /tmp/pge-departemental-naf-latest.csv ../published-data/

python 6d_gen_xlsx_pge.py

mkdir ../published-data/pge/pge-$output
cp ../published-data/pge-*.csv ../published-data/pge/pge-$output/
cp ../published-data/pge-*.xlsx ../published-data/pge/pge-$output/
