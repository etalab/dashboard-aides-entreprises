awk -F "," '{print $1","$2","$3}' ../data/simu-effectifs/effectif.csv > ../data/simu-effectifs-split/effectif-2020-03-01.csv
awk -F "," '{print $1","$4","$5}' ../data/simu-effectifs/effectif.csv  > ../data/simu-effectifs-split/effectif-2020-04-01.csv

