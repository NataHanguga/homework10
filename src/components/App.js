import React, {Component} from 'react'
import FadeTransition from './fadeTransition';
import Login from './login';
import Register from './register';
import '../App.css';
import auth from './auth';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginOpen: true,
      isRegisterOpen: false
    };
  }

  showLoginBox() {
    this.setState({isLoginOpen: true, isRegisterOpen: false});
  }

  showRegisterBox() {
    this.setState({isRegisterOpen: true, isLoginOpen: false});
  }

  render() {
    return (
      <div className="root-container">
        <div className="box-controller">
          <div
            className={"controller " + (this.state.isLoginOpen
              ? "selected-controller"
              : "")}
            onClick={this.showLoginBox.bind(this)}>
            Login
          </div>
          <div
            className={"controller " + (this.state.isRegisterOpen
              ? "selected-controller"
              : "")}
            onClick={this.showRegisterBox.bind(this)}>
            Register
          </div>
        </div>
        <FadeTransition isOpen={this.state.isLoginOpen} duration={500}>
          <div className="box-container">
            <Login/>
          </div>
        </FadeTransition>
        <FadeTransition isOpen={this.state.isRegisterOpen} duration={500}>
          <div className="box-container">
            <Register/>
          </div>
        </FadeTransition>

        {/* <h3>Auth</h3> */}
        <button onClick={() => {
          auth.login(() => {
            this.props.history.push('/todoPage/' + localStorage.getItem('token'));
          });
        }}
        >
          Auth
        </button>
      </div>
    );
  }
}