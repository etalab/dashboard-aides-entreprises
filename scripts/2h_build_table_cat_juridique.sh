datafolder="$(dirname "$(pwd)")"/utils/
echo "CREATE TABLE categoriejuridique"
sudo -u postgres psql -d dashboard -c "DROP TABLE IF EXISTS categoriejuridique;"
echo "DROP TABLE OK"
sudo -u postgres psql -d dashboard -f "sql/create_table_categoriejuridique.sql"
echo "CREATE TABLE OK"
sudo -u postgres psql -d dashboard -c "\copy categoriejuridique(code,libelle,color) FROM '"$datafolder"cat_juridique.csv' delimiter ',' csv header encoding 'UTF8';"

