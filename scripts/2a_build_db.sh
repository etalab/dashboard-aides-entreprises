sudo -u postgres psql -c "DROP DATABASE IF EXISTS dashboard;"
echo "DROP DB OK"
sudo -u postgres psql -c "CREATE DATABASE dashboard ENCODING = 'UTF-8' TEMPLATE=TEMPLATE0;"
echo "CREATE DB OK"