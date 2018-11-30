import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import {
  AppBar,
  Button,
  Toolbar,
  Typography
} from "@material-ui/core";

import LoginDialog from "./LoginDialog";
import TaskList from './TaskList';
import AddTask from './AddTask';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    }
  }

  handleDialog = () => {
    this.setState({open: !this.state.open});
  };

  renderAppBar() {
    return (<div>
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
        onClose={this.handleDialog}/>
    </div>);
  };

  renderRoutes = () => {
    return (
      <Switch>
        <Route exact path='/' component={TaskList}/>
        <Route path='/add-task' component={AddTask}/>
      </Switch>);
  };

  render() {
    return (
      <div>
        {this.renderAppBar()}
        <Switch style={{
          background: 'whitesmoke',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          {this.renderRoutes()}
        </Switch>
      </div>
    );
  }
}

export default App;