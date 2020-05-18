datafolder="$(dirname "$(pwd)")"/utils/
echo "CREATE TABLE CLASSEEFFECTIF"
sudo -u postgres psql -d dashboard -c "DROP TABLE IF EXISTS classeeffectif;"
echo "DROP TABLE OK"
sudo -u postgres psql -d dashboard -f "sql/create_table_classe_effectif.sql"
echo "CREATE TABLE OK"
sudo -u postgres psql -d dashboard -c "\copy classeeffectif(denomination, libelle, libelle_long,color) FROM '"$datafolder"classeeffectif.csv' delimiter ',' csv header encoding 'UTF8';"

