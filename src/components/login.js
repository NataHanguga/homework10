import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { FormErrors } from './formError';
import {Redirect} from 'react-router-dom'
import AuthService from '../services/auth'
import Validation from '../services/validationFunctions'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            password:'',
            formErrors: {email: '', password: ''},
            emailValid: false,
            passwordValid: false,
            formValid: false
        };
    }
    
    handleUserInput = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({
            [name]: value
        }, () => {this.validateField(name, value)}
        )
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let nameValid = this.state.nameValid;
        let passwordValid = this.state.passwordValid;
        let user = JSON.parse(localStorage.getItem('userData'));
    switch(fieldName) {
        case 'name':
            nameValid = value === user.name;
            fieldValidationErrors.name = nameValid ? '' : ' is invalid';

        break;
        case 'password':
            passwordValid = value === user.password
            fieldValidationErrors.password = passwordValid ? '': ' is invalid';
        break;
        default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    passwordValid: passwordValid
                    }, Validation.validateFormLogin);
    }

    render() {
        if (JSON.parse(localStorage.getItem('isLogined')) === 'true') {
            return <Redirect to='/todo' />
        }
        return (
            <div key="1" className="inner-container">
            <MuiThemeProvider>
                <div >
                    <div className="box">
                    <h3 className="header">Login</h3>
                    <TextField
                        hintText="Enter your Username"
                        floatingLabelText="Username"
                        name="name"
                        className="input"
                        onChange = {this.handleUserInput}
                        required
                    />
                    <div className="errorField">
                        <FormErrors formErrors={this.state.formErrors} name="name"/>
                    </div>
                    <br/>
                    <TextField
                        type="password"
                        hintText="Enter your Password"
                        floatingLabelText="Password"
                        name="password"
                        className="input"
                        onChange = {this.handleUserInput}
                        required
                    />
                    <div className="errorField">
                        <FormErrors formErrors={this.state.formErrors} name="password"/>
                    </div>
                    <br/>
                    <RaisedButton 
                        className="login-btn" 
                        label="Submit" 
                        onClick={(event) => AuthService.loginUser(event, this.state.name, this.state.password)}/>
                    </div>
                </div>
            </MuiThemeProvider>
            </div>
        );
    }
}