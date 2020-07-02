psql -d dashboard -c "\copy (select siren, categorieJuridiqueUniteLegale from siren) TO '/tmp/siren-juridique.csv' DELIMITER ',' CSV HEADER;"
mv /tmp/siren-juridique.csv ../data/extracts/
