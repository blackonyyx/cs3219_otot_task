
import bcrypt from 'bcrypt';
import validator from 'validator';
import mongoose, { Schema as _Schema } from 'mongoose';


// Setup Schema
const Schema = _Schema;

const  userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Enter a username.'],
        unique: [true, 'That username has already been taken'],
        lowercase: true,
        validate: [validator.isAlphanumeric, 'Usernames can only take the form of letters and numbers']
    },
email: {
    type: String,
    required: [true, 'Enter a valid email address.'],
        unique: [true, 'That email address has already been taken'],
        lowercase: true,
        validate: [validator.isEmail, 'Usernames can only take the form of letters and numbers']
}, password: {
    type: String,
    required: [true, 'Enter a password.'],
    minLength: [9, 'Password needs to be minimally 4 characters']
},
passwordConfirm: {
    type: String,
    required: [true, 'Retype your password.'],
    validate: {
        validator: function(el) {
            return el === this.password
        }, message: 'The passwords do not match'
    }

    }
});

userSchema.pre('save', async function(next) {
    const user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(12, function(saltError, salt) {
            if (saltError) {
                return next(saltError);
            } else {
                bcrypt.hash(user.password, salt, function (hashError, hash) {
                    if (hashError) {
                        return next(hashError)
                    }
                    user.password = hash;
                    next()
                })
            }
        })
    } else {
        return next();
    }
})

userSchema.methods.comparePassword = function(password, resp) {
    bcrypt.compare(password, this.password, function ( err, isMatch) {
        if (err) {
            return callback(err)
        }
    })
}


const User = mongoose.model('User', userSchema);

// Export contacts model
const Contact = module.exports = mongoose.model('contact', contactSchema);

module.exports.get = function (callback, limit) {
    Contact.find(callback).limit(limit);
}
