"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerNewUser = registerNewUser;

var _userModel = _interopRequireDefault(require("../model/userModel.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable n/no-callback-literal */
function registerNewUser(req, response) {
  const newUserDBDocument = new _userModel.default({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  });
  newUserDBDocument.save(err => {
    if (err) {
      return response.status(500).send({
        err: true
      });
    } else {
      response.status(200)({
        success: true
      });
    }
  });
} // export function loginUser (req, res, callback) {
//   const username = req.body.username
//   const password = req.body.password
//   User.findOne({ username }).exec(function (error, user) {
//     if (error) {
//       callback({ error: true })
//     } else if (!user) {
//       callback({ error: true })
//     } else {
//       user.comparePassword(password, function (matchError, isMatch) {
//         if (matchError) {
//           callback({ error: true })
//         } else if (!isMatch) {
//           callback({ error: true })
//         } else {
//           callback({ success: true })
//         }
//       })
//     }
//   })
// }