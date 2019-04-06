
class Validation {

  state={

  }

  handleUserInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
        [name]: value
    }, () => {this.validateField(name, value)}
    )
}

validateFormLogin() {
  this.setState({formValid: this.state.emailValid && this.state.passwordValid});
  console.log(this.state.formValid)
}

validateFormRegistration() {
  this.setState({
    formValid:
      this.state.nameValid &&
      this.state.surnameValid &&
      this.state.phoneValid &&
      this.state.emailValid &&
      this.state.passwordValid &&
      this.state.confirmPasswordValid
  });
  console.log(this.state.formValid)
}
}
export default new Validation()