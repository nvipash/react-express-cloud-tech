import './App.css';

import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

import TaskList from './TaskList';
import AddTask from './AddTask';

class App extends Component {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={TaskList}/>
          <Route path='/add-task' component={AddTask}/>
        </Switch>
      </div>
    );

    return (
      <Switch className='app-container'>
        <App/>
      </Switch>
    );
  }
}

export default App;