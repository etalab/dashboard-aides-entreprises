sudo -u postgres psql -d sirene -c "\copy siret(siret) TO '/tmp/extract-sirene.csv' DELIMITER ',' CSV HEADER;"
sudo mv /tmp/extract-sirene.csv .
