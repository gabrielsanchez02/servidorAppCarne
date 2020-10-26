const bcrypt = require("bcryptjs");

class User {
  username!: String;
  password!: String;
  email!: String;
  activation_code!: String;

  constructor(
    username: String,
    password: String,
    email: String,
    activation_code: String
  ) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.activation_code = activation_code;
  }

  /*public async encriptaPass(password: String) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }*/

  /*public async validatePassword(pass: String) {
      console.log({pass});
   
   return bcrypt.compare(pass,this.password);
  }*/
}

module.exports = User;
