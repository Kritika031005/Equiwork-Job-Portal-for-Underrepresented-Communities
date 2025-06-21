const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/employer/login', authController.employerLogin);
router.post('/employer/logout', authController.employerLogout);
router.get('/current-user', authController.getCurrentUser);

module.exports = router;
