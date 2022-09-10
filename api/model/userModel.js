import bcrypt from "bcrypt";
import { isAlphanumeric, isEmail } from "validator";
import mongoose from "mongoose";

// Setup Schema
const Schema = mongoose.Schema;
// response 500 if failed
const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Enter a username."],
    unique: [true, "That username has already been taken"],
    lowercase: true,
    validate: [
      isAlphanumeric,
      "Usernames can only take the form of letters and numbers",
    ],
  },
  email: {
    type: String,
    required: [true, "Enter a valid email address."],
    unique: [true, "That email address has already been taken"],
    lowercase: true,
    validate: [
      isEmail,
      "Usernames can only take the form of letters and numbers",
    ],
  },
  password: {
    type: String,
    required: [true, "Enter a password."],
    minLength: [9, "Password needs to be minimally 4 characters"],
  },
  passwordConfirm: {
    type: String,
    required: [true, "Retype your password."],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "The passwords do not match",
    },
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(12, function (saltError, salt) {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(user.password, salt, function (hashError, hash) {
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
  bcrypt.compare(password, this.password, function (err, isMatch) {
    if (err) {
      return callback(err);
    } else {
      callback(null, isMatch);
    }
  });
};

export const User = mongoose.model("User", userSchema);
