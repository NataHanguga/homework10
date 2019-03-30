import React, { Component } from 'react';
import './App.css';
import Apps from './container/App';
import { Route, Switch} from 'react-router-dom'
import TodoPage from './container/todoPage';
// import * from 'react-bootstrap';

export default class App extends Component {
constructor(props) {
  super(props);
  this.state = {
    todoPagePath: '/todoPage/'+localStorage.getItem('token')

  };
}
  render() {
    return (
      <div className="root-container">
        {/* <Apps></Apps> */}
        <Switch>
          <Route exact path={this.state.todoPagePath} component={TodoPage} />
          <Route exact path="/" component={Apps} />
        </Switch>
      </div>
    );
  }
}

