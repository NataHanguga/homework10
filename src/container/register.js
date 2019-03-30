import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';

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

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div className="inner-container">
                        <div style={style2} className="box">
                        <h3 className="header">Registration</h3>
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
                        <RaisedButton label="Submit" className="login-btn"  style={style} onClick={(event) => this.handleClick(event)} />
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