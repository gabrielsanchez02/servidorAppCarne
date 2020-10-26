"use strict";
const bcrypt = require("bcryptjs");
class User {
    constructor(username, password, email, activation_code) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.activation_code = activation_code;
    }
}
module.exports = User;
