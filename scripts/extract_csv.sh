sudo -u postgres psql -d sirene -c "\copy siret(siren,siret,reg,dep,codeCommuneEtablissementString) TO '/tmp/extract-siren-geo.csv' DELIMITER ',' CSV HEADER;"
sudo mv /tmp/extract-siren-geo.csv .