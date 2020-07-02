
echo "CREATE TABLE REGION"
psql -d dashboard -c "DROP TABLE IF EXISTS region;"
echo "DROP TABLE OK"
psql -d dashboard -f "sql/create_table_region.sql"
echo "CREATE TABLE OK"
datafolder="$(dirname "$(pwd)")"/utils/
psql -d dashboard -c "\copy region(reg, cheflieu, tncc, ncc, nccenr, libelle) FROM '"$datafolder"region2019.csv' delimiter ',' csv header encoding 'UTF8';"
