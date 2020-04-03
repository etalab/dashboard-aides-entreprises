
sudo -u postgres psql -c "DROP TABLE IF EXISTS effectif;"
echo "DROP TABLE OK"
sudo -u postgres psql -d sirene -f "create_table_effectif.sql"
echo "CREATE TABLES OK"


datafolder="$(dirname "$(pwd)")"/data/simu-effectifs-split/

for d in `seq -w 1 19` 2A 2B `seq 21 74` `seq 76 95` 98 ""; do
    sudo -u postgres psql -d sirene -c "\copy effectif(siret, dateRecuperationEffectif, effectif) FROM '"$datafolder"1-geo_siret_"$d".csv' delimiter ',' csv header encoding 'UTF8';"
    sudo -u postgres psql -d sirene -c "\copy effectif(siret, dateRecuperationEffectif, effectif) FROM '"$datafolder"2-geo_siret_"$d".csv' delimiter ',' csv header encoding 'UTF8';"
    echo "POPULATE dep "$d" OK"
done
#Cas particulier Paris
for d in {01..20}; do
    sudo -u postgres psql -d sirene -c "\copy effectif(siret, dateRecuperationEffectif, effectif) FROM '"$datafolder"1-geo_siret_751"$d".csv' delimiter ',' csv header encoding 'UTF8';"
    sudo -u postgres psql -d sirene -c "\copy effectif(siret, dateRecuperationEffectif, effectif) FROM '"$datafolder"2-geo_siret_751"$d".csv' delimiter ',' csv header encoding 'UTF8';"
    echo "POPULATE dep 751"$d" OK"
done

#Cas particulier DOM
for d in `seq -w 1 8`; do
    sudo -u postgres psql -d sirene -c "\copy effectif(siret, dateRecuperationEffectif, effectif) FROM '"$datafolder"1-geo_siret_97"$d".csv' delimiter ',' csv header encoding 'UTF8';"
    sudo -u postgres psql -d sirene -c "\copy effectif(siret, dateRecuperationEffectif, effectif) FROM '"$datafolder"2-geo_siret_97"$d".csv' delimiter ',' csv header encoding 'UTF8';"
    echo "POPULATE dep 97"$d" OK"
done

echo "Creating index on siret column"
sudo -u postgres psql -d sirene -c "CREATE INDEX effectif_siret ON effectif (siret);"
echo "index created"
