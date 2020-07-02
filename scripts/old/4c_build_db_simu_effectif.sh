
psql -d dashboard -c "DROP TABLE IF EXISTS effectif;"
echo "DROP TABLE OK"
psql -d dashboard -f "sql/create_table_effectif.sql"
echo "CREATE TABLE OK"


datafolder="$(dirname "$(pwd)")"/data/simu-effectifs/

psql -d dashboard -c "\copy effectif(siret, dateRecuperationEffectif, effectif) FROM '"$datafolder"effectif-2020-03-01.csv' delimiter ',' csv header encoding 'UTF8';"
psql -d dashboard -c "\copy effectif(siret, dateRecuperationEffectif, effectif) FROM '"$datafolder"effectif-2020-04-01.csv' delimiter ',' csv header encoding 'UTF8';"

echo "Creating index on siret column"
psql -d dashboard -c "CREATE INDEX effectif_siret ON effectif (siret);"
echo "index created"
