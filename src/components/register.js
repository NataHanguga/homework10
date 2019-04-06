import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {FormErrors} from './formError';
import Validation from '../services/validationFunctions'
import AuthService from '../services/auth'



export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      surname: '',
      phoneNumber: '',
      email: '',
      password: '',
      confirmPassword: '',
      nameValid: false,
      surnameValid: false,
      phoneValid: false,
      emailValid: false,
      passwordValid: false,
      confirmPasswordValid: false,
      formErrors: {name: '', surname: '', phone: '', email: '', password: '', confirmPassword: ''},
    }
  }

  handleUserInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
        [name]: value
      }, () => {
        this.validateField(name, value)
      }
    )
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let nameValid = this.state.nameValid;
    let surnameValid = this.state.surnameValid;
    let phoneValid = this.state.phoneValid;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let confirmPasswordValid = this.state.confirmPasswordValid;

    switch (fieldName) {
      case 'name':
        nameValid = value.length > 0;
        fieldValidationErrors.name = nameValid ? '' : ' is invalid';
        break;
      case 'surname':
        surnameValid = value.length > 0;
        fieldValidationErrors.surname = surnameValid ? '' : ' is invalid';
        break;
      case 'phone':
        phoneValid = value.length === 10;
        fieldValidationErrors.phone = phoneValid ? '' : ' is invalid';
        break;
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 5;
        fieldValidationErrors.password = passwordValid ? '' : ' is invalid';
        break;
      case 'confirmPassword':
        confirmPasswordValid = value === this.state.password;
        fieldValidationErrors.confirmPassword = confirmPasswordValid ? '' : ' confirmPassword don`t equal password';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      emailValid: emailValid,
      passwordValid: passwordValid,
      nameValid: nameValid,
      surnameValid: surnameValid,
      confirmPasswordValid: confirmPasswordValid
    },Validation.validateFormRegistration);
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div className="inner-container">
            <div className="box">
              <h3 className="header">Registration</h3>
              <div className="errorField">
                <FormErrors formErrors={this.state.formErrors}/>
              </div>
              <TextField
                hintText="Enter your name"
                floatingLabelText="Name"
                name="name"
                onChange={this.handleUserInput}
              />
              <div className="errorField">
                <FormErrors formErrors={this.state.formErrors} name="name"/>
              </div>
              <br/>
              <TextField
                hintText="Enter your surname"
                floatingLabelText="Surname"
                name="surname"
                onChange={this.handleUserInput}
              />
              <div className="errorField">
                <FormErrors formErrors={this.state.formErrors} name="surname"/>
              </div>
              <br/>
              <TextField
                hintText="Enter your phone number"
                floatingLabelText="Phone Number"
                name="phone"
                onChange={this.handleUserInput}
              />
              <div className="errorField">
                <FormErrors formErrors={this.state.formErrors} name="phone"/>
              </div>
              <br/>
              <TextField
                hintText="Enter your email"
                floatingLabelText="Email"
                type="email"
                name="email"
                onChange={this.handleUserInput}
              />
              <div className="errorField">
                <FormErrors formErrors={this.state.formErrors} name="email"/>
              </div>
              <br/>
              <TextField
                hintText="Enter your password"
                floatingLabelText="Password"
                type="password"
                name="password"
                onChange={this.handleUserInput}
              />
              <div className="errorField">
                <FormErrors formErrors={this.state.formErrors} name="password"/>
              </div>
              <br/>
              <TextField
                hintText="Enter confirm password"
                floatingLabelText="Confirm Password"
                type="password"
                name="confirmPassword"
                onChange={(event, newValue) => this.setState({confirmPassword: newValue})}
              />
              <div className="errorField">
                <FormErrors formErrors={this.state.formErrors} name="confirmPassword"/>
              </div>
              <br/>
              <RaisedButton label="Submit" className="login-btn" 
                  onClick={(event) => 
                    AuthService.registerUser(event, 
                      this.state.name, 
                      this.state.surname, 
                      this.state.password, 
                      this.state.confirmPassword, 
                      this.state.email, 
                      this.state.phoneNumber)}/>
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );

  }
}
