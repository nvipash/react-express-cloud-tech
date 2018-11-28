const express = require('express');
const path = require('path');

const app = express(),
  mysql = require('mysql'),
  connection = require('express-myconnection'),
  cors = require('cors'),
  port = parseInt(process.env.PORT, 10) || 8080;

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'react-app-cloudtech/public')));
app.use(cors());
app.use(express.json());
app.use(connection(mysql, {
  host: '127.0.0.1',
  port: '3306',
  //socketPath: '/cloudsql/cloudtech-3course-website:us-central1:cloudtech-3course-website',
  user: 'root',
  password: '0000',
  database: 'team_tasks'
}));

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

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/react-app-cloudtech/public/index.html'));
});

app.post('/api/tasks/add', (request, response) => {
  let data = {
    id: request.body.id,
    task: request.body.task,
    status: request.body.status,
    created_at: request.body.createdat
  };

  request.getConnection((error, connection) => {
    if (error) throw error;
    connection.query('INSERT INTO team_tasks.tasks SET ?', [data], results => {
        response.send(JSON.stringify(results));
      }
    )
  })
});

app.listen(port, () => console.log(`App listening on port ${port}`));