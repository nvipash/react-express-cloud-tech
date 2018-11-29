import React from 'react';
import * as yup from 'yup';
import {withFormik} from "formik";
import {Link} from 'react-router-dom';
import ArrowBack from '@material-ui/icons/ArrowBack';
import {
  Button,
  Typography,
  TextField,
  Paper,
  IconButton,
} from '@material-ui/core';

const TEAM_TASKS_FIELDS = {
  ID: 'id',
  TASK: 'task',
  STATUS: 'status',
  CREATED_AT: 'createdat'
};

const mapPropsToValues = () => ({
  [TEAM_TASKS_FIELDS.ID]: '',
  [TEAM_TASKS_FIELDS.TASK]: '',
  [TEAM_TASKS_FIELDS.STATUS]: 1,
  [TEAM_TASKS_FIELDS.CREATED_AT]: ''
});

const validationSchema = yup.object().shape({
  [TEAM_TASKS_FIELDS.ID]: yup.string().required('Place number ID'),
  [TEAM_TASKS_FIELDS.TASK]: yup.string().required('Insert task'),
  [TEAM_TASKS_FIELDS.STATUS]: yup.string().required('Insert status number'),
  [TEAM_TASKS_FIELDS.CREATED_AT]: yup.string().required('Place date and time')
});

const handleSubmit = values => {
  console.log(values);
  fetch("http://localhost:8080/api/tasks/add", {
    method: 'POST',
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    redirect: 'manual',
    body: JSON.stringify(values)
  }).then(response => {
    if (response.status >= 400) {
      throw new Error("Bad response from server");
    }
    this.props.history.push('/');
    return response.json();
  }).then(data => {
    if (data === "success") {
      console.log("Task added" + data);
    }
  }).catch(err => console.log(err))
};

class AddTask extends React.Component {

  render() {
    const {values, touched, errors, handleChange, handleSubmit} = this.props;

    return (
      <div style={{
        margin: '6rem 3rem 3rem'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          margin: '3rem 1rem 1rem',
          alignItems: 'center'
        }}>
          <IconButton
            component={Link}
            to='/'>
            <ArrowBack/>
          </IconButton>

          <Typography
            style={{marginLeft: '.5rem'}}
            variant="h4">
            Add task
          </Typography>
        </div>

        <Paper
          style={{
            margin: '1rem',
            display: 'flex',
            flexDirection: 'column',
            padding: '1rem'
          }}>

          <TextField
            label='ID'
            type='number'
            onChange={handleChange}
            style={{marginBottom: '1rem'}}
            variant='outlined'
            name={TEAM_TASKS_FIELDS.ID}
            value={values[TEAM_TASKS_FIELDS.ID]}
            helperText={touched[TEAM_TASKS_FIELDS.ID] && errors[TEAM_TASKS_FIELDS.ID]}
            error={touched[TEAM_TASKS_FIELDS.ID] && !!errors[TEAM_TASKS_FIELDS.ID]}
            InputLabelProps={{
              shrink: true
            }}/>

          <TextField
            label='Task'
            onChange={handleChange}
            style={{marginBottom: '1rem'}}
            variant='outlined'
            name={TEAM_TASKS_FIELDS.TASK}
            value={values[TEAM_TASKS_FIELDS.TASK]}
            helperText={touched[TEAM_TASKS_FIELDS.TASK] && errors[TEAM_TASKS_FIELDS.TASK]}
            error={touched[TEAM_TASKS_FIELDS.TASK] && !!errors[TEAM_TASKS_FIELDS.TASK]}
            InputLabelProps={{
              shrink: true
            }}/>

          <TextField
            label='Status'
            onChange={handleChange}
            style={{marginBottom: '1rem'}}
            type='number'
            className="form-control"
            variant='outlined'
            name={TEAM_TASKS_FIELDS.STATUS}
            value={values[TEAM_TASKS_FIELDS.STATUS]}
            helperText={touched[TEAM_TASKS_FIELDS.STATUS] && errors[TEAM_TASKS_FIELDS.STATUS]}
            error={touched[TEAM_TASKS_FIELDS.STATUS] && !!errors[TEAM_TASKS_FIELDS.STATUS]}
            InputLabelProps={{
              shrink: true
            }}/>

          <TextField
            label='Created at'
            type='datetime-local'
            onChange={handleChange}
            style={{marginBottom: '1rem'}}
            className="form-control"
            variant='outlined'
            name={TEAM_TASKS_FIELDS.CREATED_AT}
            value={values[TEAM_TASKS_FIELDS.CREATED_AT]}
            helperText={touched[TEAM_TASKS_FIELDS.CREATED_AT] && errors[TEAM_TASKS_FIELDS.CREATED_AT]}
            error={touched[TEAM_TASKS_FIELDS.CREATED_AT] && !!errors[TEAM_TASKS_FIELDS.CREATED_AT]}
            InputLabelProps={{
              shrink: true
            }}/>
        </Paper>

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginRight: '1rem'
          }}>
          <Button
            onClick={handleSubmit}
            variant='contained'>
            Submit
          </Button>
        </div>
      </div>
    );
  }
}

export default withFormik({
  mapPropsToValues,
  validationSchema,
  handleSubmit
})(AddTask);