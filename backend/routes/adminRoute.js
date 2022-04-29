const express = require('express');
const { getPatients, createDisease, getDiseases, deleteDisease, getDiseaseDetails, updateDisease, updateUserStatus, createDepartment, getDepartments, deleteDepartment, getDepartmentDetails, updateDepartment, createDoctor, createFaq, getFaqs, getFaqDetails, updateFaq, deletefaq } = require('../contollers/adminController');
const { isAuthenticatedUser } = require('../middleware/auth');

const router = express.Router();
router.route('/patients/:userType').get(isAuthenticatedUser, getPatients);
router.route('/update-status/:userId').get(isAuthenticatedUser, updateUserStatus);
router.route('/create-doctor').post(isAuthenticatedUser, createDoctor);

router.route('/create-disease').post(isAuthenticatedUser, createDisease);
router.route('/all-diseases').get(isAuthenticatedUser, getDiseases);
router.route('/delete-disease/:id').delete(isAuthenticatedUser, deleteDisease);
router.route('/edit-disease/:id').get(isAuthenticatedUser, getDiseaseDetails);
router.route('/update-disease/:id').put(isAuthenticatedUser, updateDisease);

router.route('/create-department').post(isAuthenticatedUser, createDepartment);
router.route('/all-departments').get(getDepartments);
router.route('/delete-department/:id').delete(isAuthenticatedUser, deleteDepartment);
router.route('/edit-department/:id').get(isAuthenticatedUser, getDepartmentDetails);
router.route('/update-department/:id').put(isAuthenticatedUser, updateDepartment);

router.route('/create-faq').post(isAuthenticatedUser, createFaq);
router.route('/all-faqs').get(isAuthenticatedUser, getFaqs);
router.route('/delete-faq/:id').delete(isAuthenticatedUser, deletefaq);
router.route('/edit-faq/:id').get(isAuthenticatedUser, getFaqDetails);
router.route('/update-faq/:id').put(isAuthenticatedUser, updateFaq);

module.exports = router;