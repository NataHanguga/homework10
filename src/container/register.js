import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import { FormErrors } from './formError';


export default class Register extends Component {
    constructor(props){
        super(props);
        this.state={
            name:'',
            surname:'',
            phoneNumber:'',
            email:'',
            password:'',
            confirmPassword:'',
            nameValid: false,
            surnameValid: false,
            phoneValid: false,
            emailValid: false,
            passwordValid: false,
            confirmPasswordValid: false,
            formErrors: {name:'', surname:'', phone:'',email: '', password: '', confirmPassword:''},
        }
    }

    handleClick(event) {
        let apiBaseUrl = 'http://lectorium.herokuapp.com/api/';
        const config = {'Content-Type':'application/json'}

        if (this.state.password === this.state.confirmPassword && 
            (this.state.password !== '' && this.state.confirmPassword !== '')) {
            console.log('Equal');
            let payload = {
                'name': this.state.name,
                'surname': this.state.surname,
                'phoneNumber': this.state.phoneNumber,
                'email': this.state.email,
                'password': this.state.password
            };
            console.log(payload);
            
            axios.post(apiBaseUrl + 'registration', payload, {headers: config})
                .then(
                    res => {
                        console.log(res.data.token);
                        if (res.status === 200) {
                            console.log('registration successfull');
                            localStorage.setItem('token', res.data.token)
                            localStorage.setItem('userData', JSON.stringify(payload));
                            alert('successfull registration. go to login');
                        }
                    })
                .catch(
                    error => {
                        console.log(error);
                    }
                );

        } else {
            console.log('Your password and confirmPassword not equal');
        }
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
        let nameValid = this.state.nameValid;
        let surnameValid = this.state.surnameValid;
        let phoneValid = this.state.phoneValid;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        let confirmPasswordValid = this.state.confirmPasswordValid;
        
        switch(fieldName) {
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
                fieldValidationErrors.password = passwordValid ? '': ' is invalid';
            break;
            case 'confirmPassword':
                confirmPasswordValid = value === this.state.password;
                fieldValidationErrors.confirmPassword = confirmPasswordValid ? '': ' confirmPassword don`t equal password';
            break;
            default:
            break;
        }
        this.setState({ formErrors: fieldValidationErrors,
                        emailValid: emailValid,
                        passwordValid: passwordValid,
                        nameValid: nameValid,
                        surnameValid: surnameValid,
                        confirmPasswordValid: confirmPasswordValid
                        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: 
                        this.state.nameValid &&
                        this.state.surnameValid &&
                        this.state.phoneValid &&
                        this.state.emailValid && 
                        this.state.passwordValid &&
                        this.state.confirmPasswordValid
                    });
        console.log(this.state.formValid)
    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div className="inner-container">
                        <div className="box">
                        <h3 className="header">Registration</h3>
                        <div className="errorField">
                            <FormErrors formErrors={this.state.formErrors} />
                        </div>
                        <TextField 
                            hintText="Enter your name"
                            floatingLabelText="Name"
                            name="name"
                            onChange = {this.handleUserInput}
                        />
                        <div className="errorField">
                            <FormErrors formErrors={this.state.formErrors} name="name"/>
                        </div>
                        <br/>
                        <TextField 
                            hintText="Enter your surname"
                            floatingLabelText="Surname"
                            name="surname"
                            onChange = {this.handleUserInput}
                        />
                        <div className="errorField">
                            <FormErrors formErrors={this.state.formErrors} name="surname"/>
                        </div>
                        <br/>
                        <TextField 
                            hintText="Enter your phone number"
                            floatingLabelText="Phone Number"
                            name="phone"
                            onChange = {this.handleUserInput}
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
                            onChange = {this.handleUserInput}
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
                            onChange = {this.handleUserInput}
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
                        <RaisedButton label="Submit" className="login-btn"  onClick={(event) => this.handleClick(event)} />
                    </div>
                    </div>
                </MuiThemeProvider>
            </div>
        );

    }
}

const style = {
    margin: 15,
};

const style2 = {
    textAlign: 'center'
}