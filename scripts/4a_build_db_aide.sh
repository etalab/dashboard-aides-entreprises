sudo -u postgres psql -d dashboard -c "DROP TABLE IF EXISTS aide;"
echo "DROP TABLE OK"
sudo -u postgres psql -d dashboard -f "sql/create_table_aide.sql"
echo "CREATE TABLES OK"