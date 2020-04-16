sudo -u postgres psql -d dashboard -c "DROP TABLE IF EXISTS global_stat;"
echo "DROP TABLE OK"
sudo -u postgres psql -d dashboard -f "sql/create_table_stat.sql"
echo "CREATE TABLE OK"

datafolder="$(dirname "$(pwd)")"/data/stats-global/

sudo -u postgres psql -d dashboard -c "\copy global_stat(dimension,sous_dimension,valeur_sous_dimension,total_siret,delta_effectif_total,delta_effectif_percent_mean) FROM '"$datafolder"stats-global.csv' delimiter ',' csv header encoding 'UTF8';"