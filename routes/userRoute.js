const express = require("express");
const { isAuthenticated } = require("../middleware/auth");
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile } = require("../controllers/userController");

const router =express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);

router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

router.route("/me").get(isAuthenticated, getUserDetails);

router.route("/password/update").put(isAuthenticated, updatePassword);

router.route("/me/update").put(isAuthenticated, updateProfile);

module.exports = router;