datafolder="$(dirname "$(pwd)")"/utils/
echo "CREATE TABLE NAF"
sudo -u postgres psql -d dashboard -c "DROP TABLE IF EXISTS naf;"
echo "DROP TABLE OK"
sudo -u postgres psql -d dashboard -f "sql/create_table_naf.sql"
echo "CREATE TABLE OK"
sudo -u postgres psql -d dashboard -c "\copy naf(code_sous_classe,libelle_sous_classe,code_sous_classe_short,code_classe,libelle_classe,code_classe_short,code_groupe,libelle_groupe,code_groupe_short,code_division,libelle_division,code_section,libelle_section,color_section) FROM '"$datafolder"naf_complet_color.csv' delimiter ',' csv header encoding 'UTF8';"

