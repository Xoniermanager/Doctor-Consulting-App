const express = require('express');
const { registerUser, loginUser, myProfile, verifyEmail, forgotPassword,
     resetPassword, updatePassword } = require('../contollers/userController');
const { isAuthenticatedUser } = require('../middleware/auth');

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/me').get(isAuthenticatedUser, myProfile);
router.route('/verify/email/:id').get(verifyEmail);
router.route('/forget/password').post(forgotPassword);
router.route("/password/reset").put(resetPassword);

router.route('/update/password').put(isAuthenticatedUser, updatePassword);

module.exports = router;