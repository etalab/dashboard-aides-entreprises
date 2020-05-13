curl http://localhost:5000/stat/report > ../backend/json/report/report-maille-national.json
curl http://localhost:5000/stat/report/reg > ../backend/json/report/report-maille-regional.json
curl http://localhost:5000/stat/report/dep > ../backend/json/report/report-maille-departemental.json

json-minify ../backend/json/report/report-maille-national.json > ../backend/json/report/report-maille-national-minify.json
json-minify ../backend/json/report/report-maille-regional.json > ../backend/json/report/report-maille-regional-minify.json
json-minify ../backend/json/report/report-maille-departemental.json > ../backend/json/report/report-maille-departemental-minify.json

output=`curl http://localhost:5000/lastupdate/report | head -n 1| cut -d $' ' -f2`
mkdir ../backend/json/report/$output

cp ../backend/json/report/report* ../backend/json/report/$output
cp ../backend/json/report/report* ../frontend/static/datasets/prod/report/

curl http://localhost:5000/lastupdatehtml/report > ../backend/json/report/last_update_data.txt

cp ../backend/json/report/last_update_data.txt ../frontend/static/datasets/prod/report/


sudo -u postgres psql -d dashboard -c "\copy (SELECT * FROM (SELECT 'Reports d échéances fiscales' as dispositif, sum(R.nombre) as nombre_reports, sum(R.montant) as montant_total, R.reg, REG.libelle as libelle_region, R.code_section, N.libelle_section FROM report R LEFT JOIN region REG ON REG.reg = R.reg LEFT JOIN (SELECT DISTINCT code_section, libelle_section FROM naf) N ON R.code_section = N.code_section GROUP BY R.reg, REG.libelle, R.code_section, N.libelle_section ORDER BY REG.libelle, R.code_section) tbl WHERE nombre_reports > 2) TO '/tmp/reports-echeances-regional-naf-latest.csv' DELIMITER ',' CSV HEADER;"
sudo mv /tmp/reports-echeances-regional-naf-latest.csv ../published-data/

sudo -u postgres psql -d dashboard -c "\copy (SELECT * FROM (SELECT 'Reports d échéances fiscales' as dispositif, sum(R.nombre) as nombre_reports, sum(R.montant) as montant_total, R.reg, REG.libelle as libelle_region, R.dep, D.libelle AS libelle_departement, R.code_section, N.libelle_section FROM report R LEFT JOIN region REG ON REG.reg = R.reg LEFT JOIN departement D ON D.dep = R.dep LEFT JOIN (SELECT DISTINCT code_section, libelle_section FROM naf) N ON R.code_section = N.code_section GROUP BY R.reg, REG.libelle, R.dep, D.libelle, R.code_section, N.libelle_section ORDER BY REG.libelle, D.libelle, R.code_section) tbl WHERE nombre_reports > 2) TO '/tmp/reports-echeances-departemental-naf-latest.csv' DELIMITER ',' CSV HEADER;"

sudo mv /tmp/reports-echeances-departemental-naf-latest.csv ../published-data/

python 5d_gen_xlsx_report.py

mkdir ../published-data/reports-$output
cp ../published-data/reports-*.csv ../published-data/reports-$output/
cp ../published-data/reports-*.xlsx ../published-data/reports-$output/
