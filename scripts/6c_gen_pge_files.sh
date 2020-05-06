curl http://localhost:5000/stat/pge > ../backend/json/pge/pge-maille-national.json
curl http://localhost:5000/stat/pge/reg > ../backend/json/pge/pge-maille-regional.json
curl http://localhost:5000/stat/pge/dep > ../backend/json/pge/pge-maille-departemental.json

json-minify ../backend/json/pge/pge-maille-national.json > ../backend/json/pge/pge-maille-national-minify.json
json-minify ../backend/json/pge/pge-maille-regional.json > ../backend/json/pge/pge-maille-regional-minify.json
json-minify ../backend/json/pge/pge-maille-departemental.json > ../backend/json/pge/pge-maille-departemental-minify.json

output=`curl http://localhost:5000/lastupdate/pge | head -n 1| cut -d $' ' -f2`
mkdir ../backend/json/pge/$output

cp ../backend/json/pge/pge* ../backend/json/pge/$output
cp ../backend/json/pge/pge* ../frontend/static/datasets/prod/pge/
cp ../backend/json/pge/pge* ../static-data/prod/pge/

curl http://localhost:5000/lastupdatehtml/pge > ../backend/json/pge/last_update_data.txt

cp ../backend/json/pge/last_update_data.txt ../frontend/static/datasets/prod/pge/
cp ../backend/json/pge/last_update_data.txt ../static-data/prod/pge/
