var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/weekend1';

// Get all employee data for page refresh
router.get('/', function (req, res) {

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('SELECT * FROM employees', function (err, result) {
      done();

      console.log(result.rows);

      res.send(result.rows);

    });
  });
});

// New Employee
router.post('/', function (req, res) {
  var emp = req.body;

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('INSERT INTO employees (first_name, last_name, title,' +
                 ' salary, active) ' +
                  'VALUES ($1, $2, $3, $4, $5)',
                  [emp.first_name, emp.last_name, emp.title, emp.salary, true],
                  function (err, result) {
                    done();

                    if (err) {
                      res.sendStatus(500);
                      return;
                    }

                    res.sendStatus(201);
                  }
    );
  });
});

// Toggle status upon button click in employee box
router.put('/:id', function (req, res) {
  var id = req.params.id;
  var emp = req.body;

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('UPDATE employees SET active = $1' +
                 'WHERE id = $2', [emp.newStatus, id],
                  function (err, result) {
                    done();

                    if (err) {
                      res.sendStatus(500);
                      return;
                    }

                    res.sendStatus(200);
                  }
    );
  });
});

module.exports = router;
