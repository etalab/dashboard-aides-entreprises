sudo -u postgres psql -d dashboard -c "DROP TABLE IF EXISTS aide;"
echo "DROP TABLE OK"
sudo -u postgres psql -d dashboard -f "sql/create_table_aide.sql"
echo "CREATE TABLES OK"

datafolder="$(dirname "$(pwd)")"/data/aides/

sudo -u postgres psql -d dashboard -c "\copy aide(code_application, numero_sequentiel, mois, siren, nom1, nom2, effectif, montant, devise, date_dp, date_paiement, siret, reg, dep, codeCommuneEtablissement, activiteprincipaleetablissement, count_siren_nb, montant_modifie,delta_effectif,delta_effectif_percent,classe_effectif) FROM '"$datafolder"aides-1304.csv' delimiter ',' csv header encoding 'UTF8';"

echo "Creating index on siren column"
sudo -u postgres psql -d dashboard -c "DROP INDEX IF EXISTS aide_siren;"
sudo -u postgres psql -d dashboard -c "CREATE INDEX aide_siren ON aide (siren);"
echo "Creating index on siret column"
sudo -u postgres psql -d dashboard -c "DROP INDEX IF EXISTS aide_siret;"
sudo -u postgres psql -d dashboard -c "CREATE INDEX aide_siret ON aide (siret);"
echo "Creating index on reg column"
sudo -u postgres psql -d dashboard -c "DROP INDEX IF EXISTS aide_reg;"
sudo -u postgres psql -d dashboard -c "CREATE INDEX aide_reg ON aide (reg);"
echo "Creating index on dep column"
sudo -u postgres psql -d dashboard -c "DROP INDEX IF EXISTS aide_dep;"
sudo -u postgres psql -d dashboard -c "CREATE INDEX aide_dep ON aide (dep);"
echo "Creating index on codeCommuneEtablissement column"
sudo -u postgres psql -d dashboard -c "DROP INDEX IF EXISTS codeCommuneEtablissement;"
sudo -u postgres psql -d dashboard -c "CREATE INDEX aide_codeCommuneEtablissement ON aide (codeCommuneEtablissement);"
echo "index created"

  