const express = require('express')
const controller = require('./controller')
const router = express.Router()
const authController = require('../auth/controller')

// Get all users
router.get('/api/user/all', authController.auth, controller.getAllUsers)

// Get user by id
router.get('/api/user/:id', authController.auth, controller.getUserById)

// Register new user
router.post('/api/user/register', controller.createUser)

// Log in
router.post('/api/user/login', controller.login)

// Log out
router.post('/api/user/logout', controller.logout)

// Read cookies
router.get('/api/user/read-cookies', controller.readCookies)

module.exports = router