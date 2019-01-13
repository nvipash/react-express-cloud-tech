import React, {Fragment} from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import {
  AppBar,
  Button,
  Toolbar,
  Typography
} from "@material-ui/core";

import LoginDialog from "./../components/LoginDialog";
import TaskList from './../components/TaskList';
import AddTask from './../components/AddTask';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    }
  }

  handleDialog = () => this.setState({open: !this.state.open});

  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <AppBar
            position="fixed"
            color="default">

            <Toolbar>
              <Typography
                style={{flexGrow: 1}}
                variant="h6"
                color="inherit">
                Cloud Technologies Labs
              </Typography>

              <Button
                color="inherit"
                onClick={this.handleDialog}>
                Login
              </Button>
            </Toolbar>

          </AppBar>

          <LoginDialog
            open={this.state.open}
            onClose={this.handleDialog}
          />

          <Switch
            style={{
              background: 'whitesmoke',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center'
            }}>

            <Route
              exact path='/'
              component={TaskList}
            />
            <Route
              path='/add-task'
              component={AddTask}
            />

          </Switch>
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default App;