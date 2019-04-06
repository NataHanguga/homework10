import axios from 'axios';

const apiBaseUrl = 'http://lectorium.herokuapp.com/api/';
const config = {'Content-Type':'application/json'};
const config1 = {
  'Content-Type': 'application/json',
  'x-apikey': localStorage.getItem('token')
}

class AuthService {

  loginUser (event, name, password) {
    if (name !== '' && password!=='') {
    
        let payload = {
            'name': name,
            'password': password
        };
    console.log(payload);
        
        axios.post(apiBaseUrl + 'login', payload, {headers: config})
            .then(
                res => {
                if (res.status === 200) {
                    console.log('Login successfull');
                    localStorage.setItem('isLogined', true);
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

  registerUser(event, name, surname, password, confirmPassword,email, phoneNumber) {

    if (password === confirmPassword &&
        (password !== '' && confirmPassword !== '')) {
        console.log('Equal');
        let payload = {
        'name': name,
        'surname': surname,
        'phoneNumber': phoneNumber,
        'email': email,
        'password': password
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

  editUser(editName, editPassword) {
      if (editPassword !== '' || editName !== '') {
        const payload = {
          'name': editName,
          'password': editPassword
        }
        axios.put(
          apiBaseUrl + 'user',
          payload,
          { headers: config1 })
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
}
export default new AuthService()