"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _validator = require("validator");

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Setup Schema
const Schema = _mongoose.default.Schema; // response 500 if failed

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Enter a username."],
    unique: [true, "That username has already been taken"],
    lowercase: true,
    validate: [_validator.isAlphanumeric, "Usernames can only take the form of letters and numbers"]
  },
  email: {
    type: String,
    required: [true, "Enter a valid email address."],
    unique: [true, "That email address has already been taken"],
    lowercase: true,
    validate: [_validator.isEmail, "Usernames can only take the form of letters and numbers"]
  },
  password: {
    type: String,
    required: [true, "Enter a password."],
    minLength: [9, "Password needs to be minimally 4 characters"]
  },
  passwordConfirm: {
    type: String,
    required: [true, "Retype your password."],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "The passwords do not match"
    }
  }
});
userSchema.pre("save", async function (next) {
  const user = this;

  if (this.isModified("password") || this.isNew) {
    _bcrypt.default.genSalt(12, function (saltError, salt) {
      if (saltError) {
        return next(saltError);
      } else {
        _bcrypt.default.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError);
          }

          user.password = hash;
          next();
        });
      }
    });
  } else {
    return next();
  }
});

userSchema.methods.comparePassword = function (password, callback) {
  _bcrypt.default.compare(password, this.password, function (err, isMatch) {
    if (err) {
      return callback(err);
    } else {
      callback(null, isMatch);
    }
  });
};

const User = _mongoose.default.model("User", userSchema);

exports.User = User;