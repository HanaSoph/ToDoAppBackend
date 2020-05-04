/* eslint-disable max-len */
const serverlessHttp = require('serverless-http');
const express = require('express');
const cors = require('cors');
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'Tasks'
});

const app = express();
app.use(cors());
app.use(express.json());

app.get('/tasks', function(request, response) {
  // request had loads of info about the request
  // response has some useful methos for sending a response
  connection.query('SELECT * FROM TaskList', function(err, data) {
    if (err) {
      console.log('Error from MYSQL', err);
      response.status(500).send(err);
    } else {
      response.status(200).send(data);
    }
  });
});

app.delete('/tasks/:id', function(request, response) {
  const taskIdToBeDeleted = request.params.id;
  connection.query(`DELETE FROM TaskList WHERE TaskId = ${taskIdToBeDeleted}`, function(err) {
    if (err) {
      console.log('Error from MySQL', err);
      response.status(500).send(err);
    } else {
      response.status(200).send(`Task ${taskIdToBeDeleted} Deleted!`);
    }
  });
});

app.post('/tasks', function(request, response) {
  const inputData = request.body;
  const query = `INSERT INTO TaskList (Description, Urgent, Completed, Date) VALUES(?, ?, ?, ?)`;
  connection.query(query, [inputData.Description, inputData.Urgent, false, inputData.Date], function(err, results) {
    if (err) {
      console.log('Error from my SQL', err);
      response.status(500).send(err);
    } else {
      connection.query(`SELECT * FROM TaskList WHERE TaskId = ${results.insertId}`, function(err, results) {
        if (err) {
          console.log('Error from MySQL', err);
          response.status(500).send(err);
        } else {
          response.status(201).send(results[0]);
        }
      });
    }
  });
});

app.put('/tasks/:id', function(request, response) {
  const inputData = request.body;
  const taskIdToBeUpdated = request.params.id;
  connection.query(`UPDATE TaskList SET Completed = ${inputData.Completed}  WHERE TaskId = ${taskIdToBeUpdated}`, function(err) {
    if (err) {
      console.log('Error from MySQL', err);
      response.status(500).send(err);
    } else {
      response.status(200).send(`Task ${taskIdToBeUpdated} Updated!`);
    }
  });

  // const taskIdToBeUpdated = request.params.id;

  // let someResponse = {
  //   message: 'Task ' + taskIdToBeUpdated + ' has recieved a request to be updated'
  // };

  // if (taskIdToBeUpdated > 3) {
  //   response.status(404);
  //   someResponse = {
  //     message: 'Task ' + taskIdToBeUpdated + ' does not exist'
  //   };
  // }

  // response.json(someResponse);

  // response.status(200).send('Task Updated!')
  // should update a task into the database
});

module.exports.app = serverlessHttp(app);