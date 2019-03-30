class Auth {
    constructor() {
        this.isLoggined = false;
    }

    login(cb) {
        this.isLoggined = true;
        cb();
    }

    logout(cb) {
        this.isLoggined = false;
        cb();
    }

    isAuth() {
        return this.isLoggined;
    }

}

export default new Auth();