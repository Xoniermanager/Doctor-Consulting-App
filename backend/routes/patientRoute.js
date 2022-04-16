const express = require('express');
const { createPatient, getPatient } = require('../contollers/patientController');
const { isAuthenticatedUser } = require('../middleware/auth');

const router = express.Router();

router.route('/create').post(isAuthenticatedUser,createPatient);
router.route('/').get(isAuthenticatedUser, getPatient);
module.exports = router;