const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user-controller');

const jwtHelper = require('../config/jwt');

router.post('/register', UserController.register);
router.post('/authenticate', UserController.authenticate);
router.get('/userProfile', jwtHelper.verifyJwtToken, UserController.userProfile);
router.get('/:id', jwtHelper.verifyJwtToken, UserController.getUser);

module.exports = router;
