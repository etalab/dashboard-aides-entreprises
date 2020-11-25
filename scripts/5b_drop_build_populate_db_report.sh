psql -d dashboard -c "DROP TABLE IF EXISTS report;"
echo "DROP TABLE OK"
psql -d dashboard -f "sql/create_table_report.sql"
echo "CREATE TABLE OK"


datafolder="$(dirname "$(pwd)")"/data/reports/

psql -d dashboard -c "\copy report(reg,dep,code_section, nombre, montant, last_update) FROM '"$datafolder$1"' delimiter ',' csv header encoding 'UTF8';"