psql -d dashboard -c "DROP TABLE IF EXISTS cpsti;"
echo "DROP TABLE OK"
psql -d dashboard -f "sql/create_table_cpsti.sql"
echo "CREATE TABLE OK"

datafolder="$(dirname "$(pwd)")"/data/cpsti/

psql -d dashboard -c "\copy cpsti(reg,dep,code_section, nombre, montant, last_update) FROM '"$datafolder$1"' delimiter ',' csv header encoding 'UTF8';"