import React, { Component } from 'react';
import './App.css';
// import axios from 'axios'
// import injectTapEventPlugin from 'react-tap-event-plugin';
// import Register from './container/register';
import LoginScreen from './container/LoginScreen';
// injectTapEventPlugin();

export default class App extends Component {
constructor(props) {
  super(props);
  this.state = {
    loginPage:[],
    uploadScreen:[]
  };
}

  componentWillMount() {
    let loginPage = [];
    loginPage.push(<LoginScreen parentContent={this} />);
    this.setState(
      {
        loginPage: loginPage
      });
  }

  render() {
    return (
    <div className='App'>
      {this.state.loginPage}
      {this.state.uploadScreen}
    </div>
    );
  }
}

