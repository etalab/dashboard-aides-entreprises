sudo -u postgres psql -d sirene -c "\copy (select siren, siret, trancheeffectifsetablissement, etablissementsiege,activiteprincipaleetablissement, etatadministratifetablissement, enseigne1etablissement, reg, dep, codecommuneetablissement, geo_adresse, geo_score, longitude, latitude from siret) TO '/tmp/extract-siren-full.csv' DELIMITER ',' CSV HEADER;"
sudo mv /tmp/extract-siren-full.csv ../data/extracts/



sudo -u postgres psql -d sirene -c "\copy (select siren, siret from siret) TO '/tmp/extract-siren-siret.csv' DELIMITER ',' CSV HEADER;" && sudo mv /tmp/extract-siren-siret.csv ../data/extracts/
