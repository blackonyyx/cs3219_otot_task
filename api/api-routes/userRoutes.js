import * as userController from "../controller/userController.js";
import Router from "express";

const router = Router();

router.get("/", function (req, res) {
  res.json({
    status: "API Its Working",
    message: "Welcome to User API!",
    routes: ["POST: /server/login", "/server/register (not functional)"],
  });
});

// router.route('/login')
//   .post(userController.loginUser)
router.route("/register").post(userController.registerNewUser);
