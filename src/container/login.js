import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import auth from './auth'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            password:'',
            isLoggined: false,
            token: ''
        };

        this.handleClick = this.handleClick.bind(this);
    }

    showTodoPage() {
        if (true) {
            auth.login(() => {
                this.props.history('/todoPage')
            })
        };
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
                        console.log(res.data.token);
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

    render() {
        return (
            <div key="1" className="inner-container">
            <MuiThemeProvider>
                <div >
                    <div style={style2} className="box">
                    <h3 className="header">Login</h3>
                    <TextField
                        hintText="Enter your Username"
                        floatingLabelText="Username"
                        onChange = {(event,newValue) => this.setState({name:newValue})}
                    />
                    <br/>
                    <TextField
                        type="password"
                        hintText="Enter your Password"
                        floatingLabelText="Password"
                        onChange = {(event,newValue) => this.setState({password:newValue})}
                    />
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