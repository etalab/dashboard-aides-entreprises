#!/bin/bash

curl http://localhost:5000/stat/aide > ../backend/json/aides/aides-maille-national.json
curl http://localhost:5000/stat/aide/reg > ../backend/json/aides/aides-maille-regional.json
curl http://localhost:5000/stat/aide/dep > ../backend/json/aides/aides-maille-departemental.json

json-minify ../backend/json/aides/aides-maille-national.json > ../backend/json/aides/aides-maille-national-minify.json
json-minify ../backend/json/aides/aides-maille-regional.json > ../backend/json/aides/aides-maille-regional-minify.json
json-minify ../backend/json/aides/aides-maille-departemental.json > ../backend/json/aides/aides-maille-departemental-minify.json

output=`curl http://localhost:5000/lastupdate | head -n 1| cut -d $' ' -f2`
mkdir ../backend/json/aides/fds-$output

cp ../backend/json/aides/aides* ../backend/json/aides/fds-$output
cp ../backend/json/aides/aides* ../frontend/static/datasets/prod/aides/

curl http://localhost:5000/lastupdatehtml > ../backend/json/aides/last_update_data.txt

cp ../backend/json/aides/last_update_data.txt ../frontend/static/datasets/prod/

sudo -u postgres psql -d dashboard -c "\copy (SELECT * FROM (SELECT 'Fonds de solidarité' As dispositif, 'VOLET1' as volet, SUM(TotalSiren) AS nombre_aides, SUM(TotalMontant) AS montant_total, reg, libelle as libelle_region, code_section, libelle_section FROM (SELECT A.reg, R.libelle, SUM(A.montant) AS TotalMontant, COUNT(A.siren) AS TotalSiren, N.code_section, N.libelle_section FROM aide AS A LEFT JOIN (select distinct libelle_division, code_division, code_section, libelle_section from naf) AS N ON SUBSTR(A.activiteprincipaleetablissement,1,2) = N.code_division LEFT JOIN region R ON A.reg = R.reg WHERE A.reg IS NOT NULL AND A.code_application = 'VOLET1' GROUP BY R.libelle, A.reg, SUBSTR(A.activiteprincipaleetablissement,1,2), N.libelle_section, N.code_section ORDER BY A.reg, TotalSiren DESC) AS divquery GROUP BY reg, libelle, code_section, libelle_section ORDER BY libelle_region, code_section) tbl WHERE nombre_aides > 2) TO '/tmp/fonds-solidarite-volet-1-regional-naf-latest.csv' DELIMITER ',' CSV HEADER;"
sudo mv /tmp/fonds-solidarite-volet-1-regional-naf-latest.csv ../published-data/

sudo -u postgres psql -d dashboard -c "\copy (SELECT * FROM (SELECT 'Fonds de solidarité' As dispositif, 'VOLET1' as volet, SUM(TotalSiren) AS nombre_aides, SUM(TotalMontant) AS montant_total, reg, libelle_region, dep, libelle_departement, code_section, libelle_section FROM (SELECT A.reg, R.libelle as libelle_region, A.dep, D.libelle as libelle_departement, SUM(A.montant) AS TotalMontant, COUNT(A.siren) AS TotalSiren, N.code_section, N.libelle_section FROM aide AS A LEFT JOIN (SELECT DISTINCT libelle_division, code_division, code_section, libelle_section from naf) AS N ON SUBSTR(A.activiteprincipaleetablissement,1,2) = N.code_division LEFT JOIN region R ON A.reg = R.reg LEFT JOIN departement D ON D.dep = A.dep WHERE A.reg IS NOT NULL AND A.dep IS NOT NULL AND A.code_application = 'VOLET1' GROUP BY R.libelle, A.reg, A.dep, D.libelle, SUBSTR(A.activiteprincipaleetablissement,1,2), N.libelle_section, N.code_section ORDER BY A.reg, A.dep, TotalSiren DESC) AS divquery GROUP BY reg, dep, libelle_region, libelle_departement, code_section, libelle_section ORDER BY libelle_region, libelle_departement, code_section) tbl WHERE nombre_aides > 2) TO '/tmp/fonds-solidarite-volet-1-departemental-naf-latest.csv' DELIMITER ',' CSV HEADER;"
sudo mv /tmp/fonds-solidarite-volet-1-departemental-naf-latest.csv ../published-data/


sudo -u postgres psql -d dashboard -c "\copy (SELECT * FROM (SELECT 'Fonds de solidarité' As dispositif, 'VOLET2' as volet, SUM(TotalSiren) AS nombre_aides, SUM(TotalMontant) AS montant_total, reg, libelle as libelle_region, code_section, libelle_section FROM (SELECT A.reg, R.libelle, SUM(A.montant) AS TotalMontant, COUNT(A.siren) AS TotalSiren, N.code_section, N.libelle_section FROM aide AS A LEFT JOIN (select distinct libelle_division, code_division, code_section, libelle_section from naf) AS N ON SUBSTR(A.activiteprincipaleetablissement,1,2) = N.code_division LEFT JOIN region R ON A.reg = R.reg WHERE A.reg IS NOT NULL AND A.code_application = 'VOLET2' GROUP BY R.libelle, A.reg, SUBSTR(A.activiteprincipaleetablissement,1,2), N.libelle_section, N.code_section ORDER BY A.reg, TotalSiren DESC) AS divquery GROUP BY reg, libelle, code_section, libelle_section ORDER BY libelle_region, code_section) tbl WHERE nombre_aides > 2) TO '/tmp/fonds-solidarite-volet-2-regional-naf-latest.csv' DELIMITER ',' CSV HEADER;"
sudo mv /tmp/fonds-solidarite-volet-2-regional-naf-latest.csv ../published-data/



sudo -u postgres psql -d dashboard -c "\copy (SELECT * FROM (SELECT 'Fonds de solidarité' As dispositif, 'VOLET1' as volet, count(A.siren) as nombre_aides, sum(A.montant) AS montant_total, A.reg, R.libelle as libelle_region, substr(A.categoriejuridiqueunitelegale,1,2) as code_categorie_juridique, C.libelle as libelle_categorie_juridique from aide A LEFT JOIN region R ON R.reg = A.reg LEFT JOIN categoriejuridique C ON C.code = SUBSTR(A.categoriejuridiqueunitelegale,1,2) WHERE A.reg IS NOT NULL AND A.categoriejuridiqueunitelegale IS NOT NULL AND A.code_application = 'VOLET1' group by A.reg, R.libelle, substr(A.categoriejuridiqueunitelegale,1,2), C.libelle order by R.libelle, substr(A.categoriejuridiqueunitelegale,1,2)) tbl WHERE nombre_aides > 2) TO '/tmp/fonds-solidarite-volet-1-regional-categorie-juridique-latest.csv' DELIMITER ',' CSV HEADER;"
sudo mv /tmp/fonds-solidarite-volet-1-regional-categorie-juridique-latest.csv ../published-data/

sudo -u postgres psql -d dashboard -c "\copy (SELECT * FROM (SELECT 'Fonds de solidarité' As dispositif, 'VOLET1' as volet, count(A.siren) as nombre_aides, sum(A.montant) AS montant_total, A.reg, R.libelle as libelle_region, A.dep, D.libelle as libelle_departement, substr(A.categoriejuridiqueunitelegale,1,2) as code_categorie_juridique, C.libelle as libelle_categorie_juridique from aide A LEFT JOIN region R ON R.reg = A.reg LEFT JOIN departement D ON D.dep = A.dep LEFT JOIN categoriejuridique C ON C.code = SUBSTR(A.categoriejuridiqueunitelegale,1,2) WHERE A.reg IS NOT NULL AND A.dep IS NOT NULL AND A.categoriejuridiqueunitelegale IS NOT NULL AND A.code_application = 'VOLET1' group by A.reg, R.libelle, A.dep, D.libelle, substr(A.categoriejuridiqueunitelegale,1,2), C.libelle order by R.libelle, D.libelle, substr(A.categoriejuridiqueunitelegale,1,2)) tbl WHERE nombre_aides > 2) TO '/tmp/fonds-solidarite-volet-1-departemental-categorie-juridique-latest.csv' DELIMITER ',' CSV HEADER;"
sudo mv /tmp/fonds-solidarite-volet-1-departemental-categorie-juridique-latest.csv ../published-data/


sudo -u postgres psql -d dashboard -c "\copy (SELECT * FROM (SELECT 'Fonds de solidarité' As dispositif, 'VOLET2' as volet, count(A.siren) as nombre_aides, sum(A.montant) AS montant_total, A.reg, R.libelle as libelle_region, substr(A.categoriejuridiqueunitelegale,1,2) as code_categorie_juridique, C.libelle as libelle_categorie_juridique from aide A LEFT JOIN region R ON R.reg = A.reg LEFT JOIN categoriejuridique C ON C.code = SUBSTR(A.categoriejuridiqueunitelegale,1,2) WHERE A.reg IS NOT NULL AND A.categoriejuridiqueunitelegale IS NOT NULL AND A.code_application = 'VOLET2' group by A.reg, R.libelle, substr(A.categoriejuridiqueunitelegale,1,2), C.libelle order by R.libelle, substr(A.categoriejuridiqueunitelegale,1,2)) tbl WHERE nombre_aides > 2) TO '/tmp/fonds-solidarite-volet-2-regional-categorie-juridique-latest.csv' DELIMITER ',' CSV HEADER;"
sudo mv /tmp/fonds-solidarite-volet-2-regional-categorie-juridique-latest.csv ../published-data/


sudo -u postgres psql -d dashboard -c "\copy (SELECT * FROM (SELECT 'Fonds de solidarité' As dispositif, 'VOLET1' as volet, count(A.siren) as nombre_aides, sum(A.montant) AS montant_total, A.reg, R.libelle as libelle_region, A.classe_effectif, C.libelle as libelle_classe_effectif from aide A LEFT JOIN region R ON R.reg = A.reg LEFT JOIN classeeffectif C ON C.denomination = A.classe_effectif WHERE A.reg IS NOT NULL AND A.classe_effectif IS NOT NULL AND A.code_application = 'VOLET1' group by A.reg, R.libelle, A.classe_effectif, C.libelle order by R.libelle, A.classe_effectif) tbl WHERE nombre_aides > 2) TO '/tmp/fonds-solidarite-volet-1-regional-classe-effectif-latest.csv' DELIMITER ',' CSV HEADER;"
sudo mv /tmp/fonds-solidarite-volet-1-regional-classe-effectif-latest.csv ../published-data/

sudo -u postgres psql -d dashboard -c "\copy (SELECT * FROM (SELECT 'Fonds de solidarité' As dispositif, 'VOLET1' as volet, count(A.siren) as nombre_aides, sum(A.montant) AS montant_total, A.reg, R.libelle as libelle_region, A.dep, D.libelle as libelle_departement, A.classe_effectif, C.libelle as libelle_classe_effectif from aide A LEFT JOIN region R ON R.reg = A.reg LEFT JOIN departement D ON D.dep = A.dep LEFT JOIN classeeffectif C ON C.denomination = A.classe_effectif WHERE A.reg IS NOT NULL AND A.dep IS NOT NULL AND A.classe_effectif IS NOT NULL AND A.code_application = 'VOLET1' group by A.reg, R.libelle, A.dep, D.libelle, A.classe_effectif, C.libelle order by R.libelle, D.libelle, A.classe_effectif) tbl WHERE nombre_aides > 2) TO '/tmp/fonds-solidarite-volet-1-departemental-classe-effectif-latest.csv' DELIMITER ',' CSV HEADER;"
sudo mv /tmp/fonds-solidarite-volet-1-departemental-classe-effectif-latest.csv ../published-data/

sudo -u postgres psql -d dashboard -c "\copy (SELECT * FROM (SELECT 'Fonds de solidarité' As dispositif, 'VOLET2' as volet, count(A.siren) as nombre_aides, sum(A.montant) AS montant_total, A.reg, R.libelle as libelle_region, A.classe_effectif, C.libelle as libelle_classe_effectif from aide A LEFT JOIN region R ON R.reg = A.reg LEFT JOIN classeeffectif C ON C.denomination = A.classe_effectif WHERE A.reg IS NOT NULL AND A.classe_effectif IS NOT NULL AND A.code_application = 'VOLET2' group by A.reg, R.libelle, A.classe_effectif, C.libelle order by R.libelle, A.classe_effectif) tbl WHERE nombre_aides > 2) TO '/tmp/fonds-solidarite-volet-2-regional-classe-effectif-latest.csv' DELIMITER ',' CSV HEADER;"
sudo mv /tmp/fonds-solidarite-volet-2-regional-classe-effectif-latest.csv ../published-data/


python 4e_gen-xlsx.py

mkdir ../published-data/fonds-solidarite/fds-$output
cp ../published-data/*.csv ../published-data/fonds-solidarite/fds-$output/
cp ../published-data/*.xlsx ../published-data/fonds-solidarite/fds-$output/
