sudo -u postgres psql -d sirene -c "DROP TABLE IF EXISTS region;"
echo "DROP TABLE OK"
sudo -u postgres psql -d sirene -f "sql/create_table_region.sql"
echo "CREATE TABLE OK"
sudo -u postgres psql -d sirene -c "DROP TABLE IF EXISTS departement;"
echo "DROP TABLE OK"
sudo -u postgres psql -d sirene -f "sql/create_table_departement.sql"
echo "CREATE TABLE OK"


datafolder="$(dirname "$(pwd)")"/utils/

sudo -u postgres psql -d sirene -c "\copy region(reg, cheflieu, tncc, ncc, nccenr, libelle) FROM '"$datafolder"region2019.csv' delimiter ',' csv header encoding 'UTF8';"

sudo -u postgres psql -d sirene -c "\copy departement(dep, reg, cheflieu, tncc, ncc, nccenr, libelle) FROM '"$datafolder"departement2019.csv' delimiter ',' csv header encoding 'UTF8';"