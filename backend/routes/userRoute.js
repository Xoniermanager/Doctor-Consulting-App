const express = require('express');
const { registerUser, loginUser, myProfile } = require('../contollers/userController');
const { isAuthenticatedUser } = require('../middleware/auth');

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/me').get(isAuthenticatedUser, myProfile);

module.exports = router;