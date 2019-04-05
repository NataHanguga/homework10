import React, {Component} from 'react';
import {
  MDBContainer,
  MDBModal,
  MDBModalBody,
  MDBModalHeader
} from 'mdbreact';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
// import auth from './auth'
// import {Link} from 'react-router-dom'

export default class UserProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      editName: '',
      editPassword: '',
    }
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleClick() {
    const config = {
      'Content-Type': 'application/json',
      'x-apikey': localStorage.getItem('token')
    }
    if (this.state.editPassword !== '' || this.state.editName !== '') {

      const payload = {
        'name': this.state.editName,
        'password': this.state.editPassword
      }
      axios.put(
        'http://lectorium.herokuapp.com/api/user',
        payload,
        {
          headers: config
        })
        .then(
          res => {
            console.log(res.data);
            localStorage.setItem('token', res.data.token)
          }
        )
    } else {
      return
    }
  }

  logOut() {
    localStorage.setItem('isLogined', false);
    // this.props.history.push('/')
  }

  modalForm() {
    return (<MDBContainer>
      <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
        <MDBModalHeader toggle={this.toggle}>MDBModal title</MDBModalHeader>
        <MDBModalBody>
          <MuiThemeProvider>
            <div>
              <div className="box">
                <h3 className="header">Edit User Data</h3>
                <TextField
                  hintText="Enter your Username"
                  floatingLabelText="Username"
                  // defaultValue={this.state.userData.name}
                  onChange={(event, newValue) => this.setState({editName: newValue})}
                />
                <br/>
                <TextField
                  type="text"
                  hintText="Enter your Password"
                  floatingLabelText="Password"
                  // defaultValue={this.state.userData.password}
                  onChange={(event, newValue) => this.setState({editPassword: newValue})}
                />
                <br/>
                <RaisedButton
                  className="login-btn"
                  label="Edit user data"
                  color="secondary"
                  onClick={(event) => {
                    this.handleClick(event);
                    this.toggle()
                  }}/>
              </div>
            </div>
          </MuiThemeProvider>
        </MDBModalBody>
      </MDBModal>
    </MDBContainer>)
  }

  render() {
    // let name = (this.state.userData.name.length > 2) ? (
    //     this.state.userData.name.slice(0,2)
    // ) : (
    //     this.state.userData.name
    // )
    return (
      <div>
        {/* <div className="userName" onClick={this.toggle} > */}
        {/* {name} */}
        {/* </div>
                <button Onclick={this.logOut()}>LogOut</button>
                <Link to="/" >LogOut</Link>
                {this.modalForm()} */}
      </div>
    )
  }
}