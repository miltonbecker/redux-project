# To run this branch:

1. npm install
2. Please, make sure you have a PostgreSQL instance up and running on your machine
3. Import the table structure by doing: psql your_database_name < dump.sql

Now... This is a bit ugly, but you have 2 options:

1. Edit the file db/postgres.js and put your PostgreSQL credentials there
or
2. Run this: PG_USER=your_user PG_PASSWORD=your_pass PG_DATABASE=your_db PG_HOST=your_host PG_PORT=your_port npm start 
