const User = require('../model/userModel');

exports.registerNewUser = function (req, response) {
    const newUserDBDocument = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });
    newUserDBDocument.save(function (err) {
        if (err) {
            response({err: true});
        } else {
            response({success: true})
        }
    })
}