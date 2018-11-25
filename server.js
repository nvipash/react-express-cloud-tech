const express = require('express');
const path = require('path');

const app = express(),
  bodyParser = require('body-parser'),
  mysql = require('mysql'),
  connection = require('express-myconnection');

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'react-app-cloudtech/public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(connection(mysql, {
  host: '127.0.0.1',
  port: '3306',
  //socketPath: '/cloudsql/cloudtech-3course-website:us-central1:cloudtech-3course-website',
  user: 'root',
  password: '0000',
  database: 'team_tasks'
}));

app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// An api endpoint that returns a short list of items
app.get('/api/tasks', (request, response) => {
  request.getConnection((error, connection) => {
    if (error) throw error;
    connection.query('SELECT * FROM team_tasks.tasks', (error, data) => {
      response.json(data.map(data => {
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

app.post('/api/tasks/add', (request, response) => {
  let data = {
    id: request.body.id,
    task: request.body.task,
    status: request.body.status
  };

  request.getConnection((error, connection) => {
    if (error) throw error;
    connection.query('INSERT INTO team_tasks.tasks SET ?', [data], (error, response, results) => {
      // response.send(JSON.stringify(results));
      console.log(results);
      console.log(data);
      console.log('-------------')
      }
    )
  })
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/react-app-cloudtech/public/index.html'));
});

if (module === require.main) {
  // Start the server
  const server = app.listen(process.env.PORT || 8080, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
  // [END server]
}

module.exports = app;