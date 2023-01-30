const express = require('express');
const router = express.Router();

const userDetailsController = require('../controllers/userDetails');

router.post('/add-user', userDetailsController.postAddUser);

router.get('/users', userDetailsController.getAllUsers);

router.post('/delete-user/:userId', userDetailsController.deleteUser);

module.exports = router;