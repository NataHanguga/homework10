import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import { FormErrors } from './formError';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            password:'',
            token: '',
            formErrors: {email: '', password: ''},
            emailValid: false,
            passwordValid: false,
            formValid: false
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        const apiBaseUrl = 'http://lectorium.herokuapp.com/api/';
        
        const config = {'Content-Type':'application/json'};
        if (this.state.name !== '' && this.state.password!=='') {
        
            let payload = {
                'name': this.state.name,
                'password': this.state.password
            };
        console.log(payload);
            
            axios.post(apiBaseUrl + 'login', payload, {headers: config})
                .then(
                    res => {
                    // console.log(res.data.token);
                    if (res.status === 200) {
                        console.log('Login successfull');
                        this.setState({isLoggined: true});
                        this.setState({token: res.data.token})
                        console.log(res.data.token, localStorage.getItem('token'));
                        localStorage.setItem('isLogined', true);
                        // this.props.isLoggined = true;
                    } else if (res.status === 204) {
                        console.log("Username password do not match");
                        alert("username password do not match")
                    } else {
                        console.log("Username does not exists");
                        alert("Username does not exist");
                    }
                })
                .catch(
                error => console.log(error)
            );
        } else {
            console.log('error');
            return
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
                    }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid});
        console.log(this.state.formValid)
    }

    render() {
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
                        onClick={(event) => this.handleClick(event)}/>
                    </div>
                </div>
            </MuiThemeProvider>
            </div>
        );
    }
}
const style2 = {
    textAlign: 'center'
}