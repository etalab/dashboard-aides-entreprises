curl http://localhost:5000/stat/aide > aides-maille-national.json
curl http://localhost:5000/stat/aide/reg > aides-maille-regional.json
curl http://localhost:5000/stat/aide/dep > aides-maille-departemental.json

json-minify aides-maille-national.json > aides-maille-national-minify.json
json-minify aides-maille-regional.json > aides-maille-regional-minify.json
json-minify aides-maille-departemental.json > aides-maille-departemental-minify.json

curl http://localhost:5000/stat/aide/section > sectionape/aides-maille-national.json
curl http://localhost:5000/stat/aide/reg/section > sectionape/aides-maille-regional.json
curl http://localhost:5000/stat/aide/dep/section > sectionape/aides-maille-departemental.json

json-minify sectionape/aides-maille-national.json > sectionape/aides-maille-national-minify.json
json-minify sectionape/aides-maille-regional.json > sectionape/aides-maille-regional-minify.json
json-minify sectionape/aides-maille-departemental.json > sectionape/aides-maille-departemental-minify.json

