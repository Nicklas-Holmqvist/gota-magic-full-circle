const express = require('express')
const controller = require('./controller')
const router = express.Router()

// Get all users
router.get('/api/user/all', controller.getAllUsers)

// Register new user
router.post('/api/user/register', controller.createUser)

// Log in
router.post('/api/user/login', controller.login)

router.post('/api/user/logout', controller.logout)

// Read cookies
router.get('/api/user/read-cookies', controller.readCookies)

module.exports = router