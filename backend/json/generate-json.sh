curl http://localhost:5000/stat/aide > aides/aides-maille-national.json
curl http://localhost:5000/stat/aide/reg > aides/aides-maille-regional.json
curl http://localhost:5000/stat/aide/dep > aides/aides-maille-departemental.json

json-minify aides/aides-maille-national.json > aides/aides-maille-national-minify.json
json-minify aides/aides-maille-regional.json > aides/aides-maille-regional-minify.json
json-minify aides/aides-maille-departemental.json > aides/aides-maille-departemental-minify.json

output=`curl http://localhost:5000/lastupdate | head -n 1| cut -d $' ' -f2`
mkdir aides/$output

cp aides/aides* aides/$output
cp aides/aides* ../../frontend/static/datasets/prod/aides/

curl http://localhost:5000/lastupdatehtml > last_update_data.txt

cp last_update_data.txt ../../frontend/static/datasets/prod

