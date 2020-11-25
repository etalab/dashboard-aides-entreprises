
datafolder="$(dirname "$(pwd)")"/data/extracts/

psql -d dashboard -f "sql/create_table_siren.sql"
echo "CREATE TABLE OK"

psql -d dashboard -c "\copy siren(siren,statutDiffusionUniteLegale,unitePurgeeUniteLegale,dateCreationUniteLegale,sigleUniteLegale,sexeUniteLegale,prenom1UniteLegale,prenom2UniteLegale,prenom3UniteLegale,prenom4UniteLegale,prenomUsuelUniteLegale,pseudonymeUniteLegale, identifiantAssociationUniteLegale,trancheEffectifsUniteLegale,anneeEffectifsUniteLegale,dateDernierTraitementUniteLegale,nombrePeriodesUniteLegale,categorieEntreprise,anneeCategorieEntreprise,dateDebut,etatAdministratifUniteLegale,nomUniteLegale,nomUsageUniteLegale,denominationUniteLegale,denominationUsuelle1UniteLegale,denominationUsuelle2UniteLegale,denominationUsuelle3UniteLegale,categorieJuridiqueUniteLegale,activitePrincipaleUniteLegale,nomenclatureActivitePrincipaleUniteLegale,nicSiegeUniteLegale,economieSocialeSolidaireUniteLegale,caractereEmployeurUniteLegale) FROM '"$datafolder"StockUniteLegale_utf8.csv' delimiter ',' csv header encoding 'UTF8';"


echo "Creating index on siren column"
psql -d dashboard -c "DROP INDEX siren_siren;"
psql -d dashboard -c "CREATE INDEX siren_siren ON siren (siren);"
psql -d dashboard -c "DROP INDEX siren_activitePrincipaleUniteLegale;"
echo "Creating index on activitePrincipaleUniteLegale column"
psql -d dashboard -c "CREATE INDEX siren_activitePrincipaleUniteLegale ON siren (activitePrincipaleUniteLegale);"
psql -d dashboard -c "DROP INDEX siren_categorieJuridiqueUniteLegale;"
echo "Creating index on categorieJuridiqueUniteLegale column"
psql -d dashboard -c "CREATE INDEX siren_categorieJuridiqueUniteLegale ON siren (categorieJuridiqueUniteLegale);"