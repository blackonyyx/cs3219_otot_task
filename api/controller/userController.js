/* eslint-disable n/no-callback-literal */
import User from "../model/userModel.js";

export function registerNewUser(req, response) {
  const newUserDBDocument = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  newUserDBDocument.save((err) => {
    if (err) {
      return response.status(500).send({ err: true });
    } else {
      response.status(200)({ success: true });
    }
  });
}

// export function loginUser (req, res, callback) {
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
