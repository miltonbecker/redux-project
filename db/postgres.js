const pg = require('pg');

var config = {
    user: process.env.PG_USER || 'milton', 
    database: process.env.PG_DATABASE || 'milton', 
    password: process.env.PG_PASSWORD || '', 
    host: process.env.PG_HOST || 'localhost', 
    port: process.env.PG_PORT || 5432, 
    max: 5, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

const pool = new pg.Pool(config);

pool.on('error', function (err, client) {
    console.error('PG: idle client error', err.message, err.stack)
})

module.exports.query = function (text, values, callback) {
    return pool.query(text, values, callback);
};

module.exports.connect = function (callback) {
    return pool.connect(callback);
};
