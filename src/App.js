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
            window.localStorage.getItem('isLogined') === 'true' ? (
              <TodoPage />
            ) : (
              <Redirect to='/'/>
            )
          )}/>
          <Route exact path='/' render={() => (
            !window.localStorage.getItem('isLogined') === 'true' ? (
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

