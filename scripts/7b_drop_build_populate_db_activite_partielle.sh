psql -d dashboard -c "DROP TABLE IF EXISTS activitepartielle;"
echo "DROP TABLE OK"
psql -d dashboard -f "sql/create_table_activite_partielle.sql"
echo "CREATE TABLE OK"

datafolder="$(dirname "$(pwd)")"/data/activite-partielle/

psql -d dashboard -c "\copy activitepartielle(reg, mois, code_section_nace17, nombre_demandes_deposees, nombre_salaries_concernes, nombre_heures_demandees, last_update) FROM '"$datafolder$1"' delimiter ',' csv header encoding 'UTF8';"