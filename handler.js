const serverlessHttp = require('serverless-http');
const express = require('express');
const cors = require('cors');

// Logically seperate 4 sections of code accorind to the method of the HTTPS request received

// Export a singe function, called app

const app = express();
app.use(cors());

app.get('/tasks', function(request, response) {

  // request had loads of info about the request
  // response has some useful methos for sending a response

  response.status(200).send({
    tasks: [
      {
        id: 1,
        text: 'Research photographers',
        completed: true,
        date: new Date(2020, 04, 02),
      },
      {
        id: 2,
        text: 'Decide on theme',
        completed: false,
        date: new Date(2020, 04, 03),
      },
      {
        id: 3,
        text: 'Get engagement ring resized',
        completed: false,
        date: new Date(2020, 04, 13),
      },
    ],
  });
});

app.delete('/tasks/:id', function(request, response) {
  const taskIdToBeDeleted = request.params.id;

  let someResponse = {
    message: 'Task ' + taskIdToBeDeleted + ' Deleted!'
  };

  if (taskIdToBeDeleted > 3) {
    response.status(404);
    someResponse = {
      message: 'Task ' + taskIdToBeDeleted + ' does not exist'
    };
  }

  response.json(someResponse);

  // response.status(200).send('Task ' + taskIdToBeDeleted + ' Deleted!'); {
  //   if (taskIdToBeDeleted < 3) {
  //     response.status(404).send('Task ' + taskIdToBeDeleted + ' does not exist');
  //   }};
  //
  // should delete the task with the specified ID from the database
});

app.post('/tasks', function(request, response) {
  response.status(201).send('Task '+ request.body.text + ' Created!')
  // should insert a new task in the database
});

app.put('/tasks/:id', function(request, response) {
  response.status(200).send('Task Updated!')
  // should update a task into the database
});

module.exports.app = serverlessHttp(app);