psql -d dashboard -c "\copy (select * from aide) TO '/tmp/backup-aide.csv' DELIMITER ',' CSV HEADER;"
mv /tmp/backup-aide.csv ../data/extracts/
