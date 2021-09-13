# mkdir folders
# mkdir ../data
# mkdir ../data/0-brut
# mkdir ../data/1-enrich 
# mkdir ../data/extracts
# mkdir ../data/simu-effectifs
# mkdir ../data/simu-aides
# mkdir ../data/stats-global

for d in `seq -w 1 19` 2A 2B `seq 21 74` `seq 76 95` 98 ""; do
  wget https://files.data.gouv.fr/geo-sirene/last/dep/geo_siret_$d.csv.gz
  gunzip geo_siret_$d.csv.gz
  mv geo_siret_$d.csv ../data/0-brut/
  rm geo_siret_$d.csv.gz
done
#Cas particulier Paris
for d in {01..20}; do
  wget https://files.data.gouv.fr/geo-sirene/last/dep/geo_siret_751$d.csv.gz
  gunzip geo_siret_751$d.csv.gz
  mv geo_siret_751$d.csv ../data/0-brut/
  rm geo_siret_751$d.csv.gz
done
#Cas particulier DOM
for d in `seq -w 1 8`; do
  wget https://files.data.gouv.fr/geo-sirene/last/dep/geo_siret_97$d.csv.gz
  gunzip geo_siret_97$d.csv.gz
  mv geo_siret_97$d.csv ../data/0-brut/
  rm geo_siret_97$d.csv.gz
done



