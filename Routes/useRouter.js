const express = require('express')
const router = express.Router()
const userController = require('../Controllers/userController')

router.get('/', userController.getAllUsers)

router.post('/signup', userController.createUser)

router.post('/login', userController.loginUser)

module.exports = router