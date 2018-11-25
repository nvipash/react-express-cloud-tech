const express = require('express');
const path = require('path');

const app = express(),
  bodyParser = require('body-parser'),
  mysql = require('mysql'),
  connection = require('express-myconnection');

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'react-app-for-express/build')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(connection(mysql, {
  host: '127.0.0.1',
  port: '3306',
  //socketPath: 'cloudtech-3course-website:us-central1:cloudtech-3course-website',
  user: 'root',
  password: '0000',
  database: 'team_tasks'
}));

// An api endpoint that returns a short list of items
app.get('/api/tasks', (req, res) => {
  req.getConnection((err, connection) => {
    if (err) throw err;
    connection.query('SELECT * FROM team_tasks.tasks', function (err, data) {
      res.json(data.map(data => {
        return (
          {
            id: data.id,
            task: data.task,
            status: data.status,
            createdat: data.created_at
          }
        );
      }));
    });
  });
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/react-app-for-express/build/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port);

console.log('App is listening on port ' + port);