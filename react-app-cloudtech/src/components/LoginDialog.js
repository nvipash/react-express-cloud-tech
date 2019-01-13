import React from 'react';
import * as yup from "yup";
import {withFormik} from "formik";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  Typography
} from "@material-ui/core";

const USER_DATA = {
  EMAIL: 'email',
  PASSWORD: 'password',
};

const mapPropsToValues = () => ({
  [USER_DATA.EMAIL]: '',
  [USER_DATA.PASSWORD]: ''
});

let status = '';

const validationSchema = yup.object().shape({
  [USER_DATA.EMAIL]: yup.string().email('Input valid email').required('Write email'),
  [USER_DATA.PASSWORD]: yup.string().required('Write password')
});

const handleSubmit = values => {
  fetch("http://localhost:8080/api/users/login", {
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
    status = response.status;
    return response.json();
  }).catch(error => console.log(error))
};

const registerUser = values => {
  fetch("http://localhost:8080/api/users/register", {
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
    status = response.status;
    return response.json();
  }).catch(error => console.log(error))
};

const showLog = () => {
  if (status === 200) {
    return (
      <Typography
        variant='subtitle1'>
        You are logged
      </Typography>
    );
  }

  return (
    <Typography
      variant='subtitle1'>
      You must log in.
    </Typography>);
};

const LoginDialog = ({open, onClose, values, touched, errors, handleChange, handleSubmit}) => (
  <Dialog
    open={open}
    onClose={onClose}>

    <DialogTitle>
      Login
    </DialogTitle>

    <DialogContent>
      <TextField
        label='Email'
        style={{margin: '1rem 0'}}
        onChange={handleChange}
        variant='outlined'
        fullWidth
        name={USER_DATA.EMAIL}
        value={values[USER_DATA.EMAIL]}
        helperText={touched[USER_DATA.EMAIL] && errors[USER_DATA.EMAIL]}
        error={touched[USER_DATA.EMAIL] && !!errors[USER_DATA.EMAIL]}
        InputLabelProps={{
          shrink: true
        }}
      />

      <TextField
        label='Password'
        type='password'
        onChange={handleChange}
        fullWidth
        variant='outlined'
        name={USER_DATA.PASSWORD}
        value={values[USER_DATA.PASSWORD]}
        helperText={touched[USER_DATA.PASSWORD] && errors[USER_DATA.PASSWORD]}
        error={touched[USER_DATA.PASSWORD] && !!errors[USER_DATA.PASSWORD]}
        InputLabelProps={{
          shrink: true
        }}
      />

      {showLog()}

    </DialogContent>

    <DialogActions>
      <Button
        onClick={onClose}
        color="inherit">
        Close
      </Button>

      <Button
        onClick={handleSubmit}
        color="inherit">
        Sign In
      </Button>

      <Button
        onClick={() => registerUser(values)}
        color="inherit">
        Sign Up
      </Button>
    </DialogActions>
  </Dialog>
);

export default withFormik({
  mapPropsToValues,
  validationSchema,
  handleSubmit
})(LoginDialog);