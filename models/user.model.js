var mongoose = require("mongoose");

var bcrypt = require("bcrypt-nodejs");

var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name Required"],
  },
  email: {
    type: String,
    requied: [true, "Email Required"],
  },
  password: {
    type: String,
    required: [true, "Password Required"],
  },
});

UserSchema.methods.encryptPassword = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSalt(12), null);
};

UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

var User = mongoose.model("User", UserSchema);

module.exports = User;
