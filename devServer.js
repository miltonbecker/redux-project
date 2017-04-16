const path = require('path');
const express = require('express');
const webpack = require('webpack');
const db = require('./db/postgres');
const parser = require('body-parser');

const app = express();

const jsonParser = parser.json({
  verify: function (req, res, buf, enc) {
    try {
      JSON.parse(buf);
    } catch (error) {
      res.status(400).json({ Error: error.message });
      throw error;
    }
  }
});

app.get('/api/comments', function (req, res) {
  const query = 'SELECT id, username, email, content, date'
    + ' FROM comments'
    + ' ORDER BY date';

  db.query(query, [], (dbError, dbRes) => {
    if (dbError)
      res.status(500).json('Database error: ' + dbError);
    else
      res.json(JSON.stringify(dbRes.rows));
  });
});

app.post('/api/comments', jsonParser, function (req, res) {
  const body = req.body;

  const query = 'INSERT INTO comments'
    + ' (username, email, content)'
    + ' VALUES ($1, $2, $3)';

  db.query(query, [ body.username, body.email, body.content ], (dbError, dbRes) => {
    if (dbError)
      res.status(500).json('Database error: ' + dbError);
    else {
      res.json(JSON.stringify(dbRes.rowCount));
    }
  });
});

app.use(express.static('public'));

const port = 8000;

app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at port %d', port);
});
