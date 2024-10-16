const express = require('express')
const router = express.Router()
const userController = require('../Controllers/userController')
const validateToken = require('../utilis/validateToken')
const validator = require('../utilis/joi-validate')
const { userSchema } = require('../utilis/joi-schemas')


router.get('/', userController.getAllUsers)

router.post('/signup', validator(userSchema), userController.createUser)

router.post('/login', userController.loginUser)

module.exports = router