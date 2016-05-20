var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/weekend1';

router.get('/', function (req, res) {

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    // get salary total for active employees
    client.query('SELECT SUM(salary) as total FROM employees ' +
                 'WHERE active = TRUE',
      function (err, result) {
      done();

      console.log(result.rows);

      res.send(result.rows);

    });
  });
});

module.exports = router;
