for d in `seq -w 1 19` 2A 2B `seq 21 74` `seq 76 95` 98 ""; do
    awk -F "," '{print $1","$2","$3}' ../data/simu-effectifs/geo_siret_$d.csv > ../data/simu-effectifs-split/1-geo_siret_$d.csv
    awk -F "," '{print $1","$4","$5}' ../data/simu-effectifs/geo_siret_$d.csv  > ../data/simu-effectifs-split/2-geo_siret_$d.csv
done
#Cas particulier Paris
for d in {01..20}; do
    awk -F "," '{print $1","$2","$3}' ../data/simu-effectifs/geo_siret_751$d.csv > ../data/simu-effectifs-split/1-geo_siret_751$d.csv
    awk -F "," '{print $1","$4","$5}' ../data/simu-effectifs/geo_siret_751$d.csv  > ../data/simu-effectifs-split/2-geo_siret_751$d.csv
done

#Cas particulier DOM
for d in `seq -w 1 8`; do
    awk -F "," '{print $1","$2","$3}' ../data/simu-effectifs/geo_siret_97$d.csv > ../data/simu-effectifs-split/1-geo_siret_97$d.csv
    awk -F "," '{print $1","$4","$5}' ../data/simu-effectifs/geo_siret_97$d.csv  > ../data/simu-effectifs-split/2-geo_siret_97$d.csv
done

