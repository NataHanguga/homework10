import React, {Component} from 'react';

export default class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: JSON.parse(localStorage.getItem('userData'))
        }
    }

    f() {
        // console.log(this.state.userData.name);
    }
    render() {
        return (
            <div>
                <div className="userName" onClick={() => { console.log('here')}}>
                    {this.state.userData.name}
                </div>
            </div>
        )
    }
}