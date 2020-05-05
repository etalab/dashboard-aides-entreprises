sudo -u postgres psql -d dashboard -c "\copy (select siren, categorieJuridiqueUniteLegale from siren) TO '/tmp/siren-juridique.csv' DELIMITER ',' CSV HEADER;"
sudo mv /tmp/siren-juridique.csv ../data/extracts/
