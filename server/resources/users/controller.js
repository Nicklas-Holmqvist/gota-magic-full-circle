const UserModel = require('./model')
const bcrypt = require('bcrypt');

// Get all users
exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find()
  try {
    res.send(users)
  } catch (error) {
    
  }
}

// Get all users
exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find()
  try {
    res.send(users)
  } catch (error) {
    
  }
}

// Create new user
exports.createUser = async (req, res) => {

  const { email, password } = req.body
  const emailExists = await UserModel.exists({ email: email })

  if (!emailExists) {      
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = {
      email: email,
      password: hashedPassword,
      isAdmin: false || true
    }

    try {
      const user = await UserModel.create(newUser)
      res.status(201).json(user)
    } catch (error) {
      res.status(400).json(error)
    }
  } else {
    res.status(400).json('Email already registered')
  }
}

// Log in
exports.login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await UserModel.login(email, password)
  
    res.cookie('user', user._id, { maxAge: 1000 * 60 * 60 * 24 })
    console.log('request made')

    res.status(200).json(`${user.email} has been logged in`)
  } catch (error) {
    res.status(400).json(error)
  }
}

// Log out
exports.logout = (req, res) => {

  try {
    res.cookie('user', '', { maxAge: 1 })
    res.status(200).json('User has logged out')
  } catch (error) {
    res.status(400).json(error)
  }
}

exports.readCookies = (req, res) => {
  try {
    res.status(200).send(req.cookies)
  } catch (error) {
    res.status(400).send(error)
  }
}