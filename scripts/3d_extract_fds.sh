sudo -u postgres psql -d dashboard -c "\copy (select * from aide) TO '/tmp/backup-aide.csv' DELIMITER ',' CSV HEADER;"
sudo mv /tmp/backup-aide.csv ../data/extracts/
