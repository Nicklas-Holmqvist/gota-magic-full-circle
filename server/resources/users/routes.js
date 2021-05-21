const express = require('express')
const controller = require('./controller')
const router = express.Router()

// Register new user
router.post('/api/user/register', controller.createUser)

// Log in
router.post('/api/user/login', controller.login)

module.exports = router