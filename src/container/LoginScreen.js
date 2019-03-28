import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Login from './login';
import Register from './register';

export default class LoginPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username:'',
            password:'',
            loginscreen:[],
            loginmessage:'',
            buttonLabel:'Register',
            isLogin:true
        };
    }

    componentWillMount() {
        let loginscreen = [];
        loginscreen.push(
            <Login parentContext={this} appContext={this.props.parentContext} />
        );
        let loginmessage = 'No registered yet register now';
        this.setState({
            loginscreen: loginscreen,
            loginmessage: loginmessage
        });
    }

    handleClick(event){
        // console.log("event",event);
        let loginmessage;
        if(this.state.isLogin){
            let loginscreen=[];
            loginscreen.push(<Register parentContext={this}/>);
            loginmessage = "Already registered.Go to Login";
            this.setState({
                        loginscreen:loginscreen,
                        loginmessage:loginmessage,
                        buttonLabel:"Login",
                        isLogin:false
            })
        } else {
            let loginscreen=[];
            loginscreen.push(<Login parentContext={this}/>);
            loginmessage = "Not Registered yet.Go to registration";
            this.setState({
                        loginscreen:loginscreen,
                        loginmessage:loginmessage,
                        buttonLabel:"Register",
                        isLogin:true
            })
        }
    }

    render() {
        return(
            <div key="2" className="loginscreen">
                {this.state.loginscreen}
                <div>
                    {this.state.loginmessage}
                    <MuiThemeProvider>
                        <div>
                            <RaisedButton 
                                label={this.state.buttonLabel} 
                                primary={true}
                                onClick={(event) => this.handleClick(event)} />
                        </div>
                    </MuiThemeProvider>
                </div>
            </div>
        );
    }
}
