psql -d dashboard -c "DROP TABLE IF EXISTS pgenaf;"
echo "DROP TABLE OK"
psql -d dashboard -f "sql/create_table_pge_naf.sql"
echo "CREATE TABLE OK"

datafolder="$(dirname "$(pwd)")"/data/pge/

psql -d dashboard -c "\copy pgenaf(reg,dep,code_section, nombre, montant, last_update) FROM '"$datafolder$1"' delimiter ',' csv header encoding 'UTF8';"