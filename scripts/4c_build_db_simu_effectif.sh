
sudo -u postgres psql -d sirene -c "DROP TABLE IF EXISTS effectif;"
echo "DROP TABLE OK"
sudo -u postgres psql -d sirene -f "sql/create_table_effectif.sql"
echo "CREATE TABLE OK"


datafolder="$(dirname "$(pwd)")"/data/simu-effectifs/

sudo -u postgres psql -d sirene -c "\copy effectif(siret, dateRecuperationEffectif, effectif) FROM '"$datafolder"effectif-2020-03-01.csv' delimiter ',' csv header encoding 'UTF8';"
sudo -u postgres psql -d sirene -c "\copy effectif(siret, dateRecuperationEffectif, effectif) FROM '"$datafolder"effectif-2020-04-01.csv' delimiter ',' csv header encoding 'UTF8';"

echo "Creating index on siret column"
sudo -u postgres psql -d sirene -c "CREATE INDEX effectif_siret ON effectif (siret);"
echo "index created"
