const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config.dev');
const db = require('./db/postgres');
const parser = require('body-parser');

const app = express();
const compiler = webpack(config);

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

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static('public'));

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

const port = 8000;

app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at port %d', port);
});
