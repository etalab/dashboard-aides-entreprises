curl http://localhost:5000/stat/report > ../backend/json/report/report-maille-national.json
curl http://localhost:5000/stat/report/reg > ../backend/json/report/report-maille-regional.json
curl http://localhost:5000/stat/report/dep > ../backend/json/report/report-maille-departemental.json

json-minify ../backend/json/report/report-maille-national.json > ../backend/json/report/report-maille-national-minify.json
json-minify ../backend/json/report/report-maille-regional.json > ../backend/json/report/report-maille-regional-minify.json
json-minify ../backend/json/report/report-maille-departemental.json > ../backend/json/report/report-maille-departemental-minify.json

output=`curl http://localhost:5000/lastupdate/report | head -n 1| cut -d $' ' -f2`
mkdir ../backend/json/report/$output

cp ../backend/json/report/report* ../backend/json/report/$output
# cp ../backend/json/report/report* ../frontend/static/datasets/prod/report/
cp ../backend/json/report/report* ../static-data/prod/report/

curl http://localhost:5000/lastupdatehtml/report > ../backend/json/report/last_update_data.txt

# cp ../backend/json/report/last_update_data.txt ../frontend/static/datasets/prod/report/
cp ../backend/json/report/last_update_data.txt ../static-data/prod/report/
