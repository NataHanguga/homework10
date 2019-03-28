import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import UploadPage from './UploadScreen';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name:'',
            password:''
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        const apiBaseUrl = 'http://lectorium.herokuapp.com/api/';
        const self = this;
        const payload = {
            'username': this.state.name,
            'password': this.state.password
        };
        console.log(payload);
        axios.post(apiBaseUrl + 'login', {payload})
            .then(
                res => {
                    console.log(res);
                    if (res.status === 200) {
                        console.log('Login successfull');
                        let uploadScreen = [];
                        uploadScreen.push(<UploadPage appContext={self.props.appContext} />);
                        self.props.appContext.setState(
                            {
                                uploadScreen:uploadScreen,
                                loginPage:[]
                            })
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
    }

    render() {
        return (
            <div key="1">
            <MuiThemeProvider>
                <div>
                    <AppBar
                    title="Login"
                    />
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
                    <RaisedButton label="Submit" primary={true} onClick={(event) => this.handleClick(event)}/>
                </div>
            </MuiThemeProvider>
            </div>
        );
    }
}