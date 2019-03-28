import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Login from './login';

export default class Register extends Component {
    constructor(props){
        super(props);
        this.state={
            name:'',
            surname:'',
            phoneNumber:'',
            email:'',
            password:'',
            confirmPassword:''
        }
    }

    handleClick(event) {
        let apiBaseUrl = 'http://lectorium.herokuapp.com/api/';
        let self = this;
        console.log("values",
                    this.state.name,
                    this.state.phoneNumber,
                    this.state.email,
                    this.state.password,
                    this.state.confirmPassword
                    );
        if (this.state.password === this.state.confirmPassword) {
            console.log('Equal');
            let payload = {
                'name': this.state.name,
                'surname': this.state.surname,
                'phoneNumber': this.state.phoneNumber,
                'email': this.state.email,
                'password': this.state.password
            };

            axios.post(apiBaseUrl + 'registration', payload)
                .then(
                    res => {
                        console.log(res);
                        if (res.status === 200) {
                            console.log('registration successfull');
                            let loginscreen = [];
                            // eslint-disable-next-line react/jsx-no-undef
                            loginscreen.push(<Login parentContext={this} />);
                            let loginmessage = 'Not Registered yet.Go to registration';
                            self.props.parentContext.setState(
                                {
                                    loginscreen: loginscreen, 
                                    loginmessage: loginmessage,
                                    buttonLabel: 'Registration',
                                    isLogin: true
                                });
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

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title="Register"
                        />
                        <div style={style2}>
                        <TextField 
                            hintText="Enter your name"
                            floatingLabelText="Name"
                            onChange={(event, newValue) => this.setState({name: newValue})}
                        />
                        <br/>
                        <TextField 
                            hintText="Enter your surname"
                            floatingLabelText="Surname"
                            onChange={(event, newValue) => this.setState({surname: newValue})}
                        />
                        <br/>
                        <TextField 
                            hintText="Enter your phone number"
                            floatingLabelText="Phone Number"
                            onChange={(event, newValue) => this.setState({phoneNumber: newValue})}
                        />
                        <br/>
                        <TextField 
                            hintText="Enter your email"
                            floatingLabelText="Email"
                            type="email"
                            onChange={(event, newValue) => this.setState({email: newValue})}
                        />
                        <br/>
                        <TextField 
                            hintText="Enter your password"
                            floatingLabelText="Password"
                            type="password"
                            onChange={(event, newValue) => this.setState({password: newValue})}
                        />
                        <br/>
                        <TextField 
                            hintText="Enter confirm password"
                            floatingLabelText="Confirm Password"
                            type="password"
                            onChange={(event, newValue) => this.setState({confirmPassword: newValue})}
                        />
                        <br/>
                        <RaisedButton label="Submit" style={style} primary={true} onClick={(event) => this.handleClick(event)} />
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