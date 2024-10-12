const express = require('express');
const { getAllUsers, registerController, loginController } = require('../controllers/userController');

//routes object
const router = express.Router();
//get all users || GET
router.get('/all-users',getAllUsers)

//Create User || Post
router.post('/register-user', registerController);

//Login || Post
router.post('/login',loginController);

module.exports = router;