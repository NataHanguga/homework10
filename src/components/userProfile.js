import React, {Component} from 'react';
import ModalWindows from '../services/modalWindows';

export default class UserProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: JSON.parse(localStorage.getItem('userData')),
      modalU: false,
      editName: '',
      editPassword: '',
    }
  }

  toggle = () => {
    this.setState({
      modalU: !this.state.modalU
    });
  }

  logOut() {
    localStorage.setItem('isLogined', false);
  }

  saveIfChange = (e, newValue, name) => {
    this.setState({[name]: newValue})
  }

  render() {
    let name = (this.state.userData.name.length > 2) ? (
        this.state.userData.name.slice(0,2)
    ) : (
        this.state.userData.name
    )
    return (
      <div>
        <div className="userName" 
          onClick={this.toggle} >
        {name}
        </div>
        {ModalWindows.editUserModalForm(this.toggle,
                                        this.state.modalU, 
                                        this.state.editName, 
                                        this.state.editPassword, 
                                        this.state.userData.name, 
                                        this.state.userData.password,
                                        this.saveIfChange)}
        <input type="button" className="logout" value="Logout" onClick={this.logOut} />
      </div>
    )
  }
}