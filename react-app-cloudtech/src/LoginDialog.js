import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from "@material-ui/core/es/DialogContent/DialogContent";
import {TextField} from "@material-ui/core";
import * as yup from "yup";
import {withFormik} from "formik";
import DialogActions from "@material-ui/core/es/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";

const USER_DATA = {
  EMAIL: 'email',
  PASSWORD: 'password',
};

const mapPropsToValues = () => ({
  [USER_DATA.EMAIL]: '',
  [USER_DATA.PASSWORD]: ''
});

const validationSchema = yup.object().shape({
  [USER_DATA.EMAIL]: yup.string().email('Input valid email').required('Write email'),
  [USER_DATA.PASSWORD]: yup.string().required('Write password')
});

const handleSubmit = values => console.log(values);

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
        }}/>

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
        }}/>

    </DialogContent>
    <DialogActions>
      <Button
        onClick={onClose}
        color="inherit">
        Close
      </Button>

      <Button onClick={handleSubmit} color="inherit">
        Confirm
      </Button>
    </DialogActions>
  </Dialog>
);

export default withFormik({
  mapPropsToValues,
  validationSchema,
  handleSubmit
})(LoginDialog);