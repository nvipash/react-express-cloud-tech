import React, {Component} from 'react';
import {Typography, Paper} from '@material-ui/core';
import Button from "@material-ui/core/es/Button/Button";
import {Link} from "react-router-dom";

export default class TaskList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    }
  }

  componentDidMount() {
    this.getList();
  }

  getList = () => {
    fetch('/api/tasks')
      .then(res => res.json())
      .then(data => this.setState({data}))
  };

  render() {
    const {data} = this.state;

    return (
      <div className="App">
        <Typography
          style={{margin: '2rem'}}
          variant="h4">
          Task list
        </Typography>

        {data.length ?
          <div className='tasks'>
            {data.map(data => {
              return (
                <Paper style={{margin: '1rem', padding: '1rem'}}>
                  <Typography>
                    <b>Id:</b> {data.id}
                  </Typography>

                  <Typography>
                    <b>Task:</b> {data.task}
                  </Typography>

                  <Typography>
                    <b>Create at:</b> {data.createdat}
                  </Typography>
                </Paper>
              );
            })}

            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginRight: '1rem'
              }}>
              <Button
                component={Link}
                to='/add-task'
                variant="contained">
                Add task
              </Button>
            </div>
          </div> :
          <Paper style={{margin: '1rem', padding: '1rem'}}>
            <Typography
              style={{margin: '2rem'}}
              variant="h3">
              No List Items Found
            </Typography>
          </Paper>
        }
      </div>
    );
  }
}