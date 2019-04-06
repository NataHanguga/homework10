import React, {Component} from 'react';
import './App.css';
import Apps from './components/Apps';
import {Route, Switch, Redirect} from 'react-router-dom'
import TodoPage from './components/todoPage';

export default class App extends Component {
  render() {
    return (
      <div className="root-container">
        <Switch>
          <Route exact path='/todo' render={() => (
            JSON.parse(window.localStorage.getItem('isLogined')) ? (
              <TodoPage />
            ) : (
              <Redirect to='/'/>
            )
          )}/>
          <Route exact path='/' component={Apps} />
          <Route exact path='/' render={() => (
            !(JSON.parse(window.localStorage.getItem('isLogined'))) ? (
              <Apps />
            ) : (
              <Redirect to='/todo'/>
            )
          )}/>
        </Switch>
      </div>
    );
  }
}

