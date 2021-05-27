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
      isAdmin: false
    }

    try {
      const user = await UserModel.create(newUser)
      res.status(201).json(user)
    } catch (error) {
      res.status(400).json(error)
    }
  } else {
    let errors = { email: '' }

    // if email already exists in db
    errors.email = 'Denna email är redan registrerad'
    console.log(errors)

    res.status(400).json({ errors })
  }
}

// Log in
exports.login = async (req, res) => {
  const { email, password } = req.body
  let errors = { email: '', password: '' }

  try {
    const user = await UserModel.login(email, password)
    res.cookie('user', user._id, { maxAge: 1000 * 60 * 60 * 24 })
    res.status(200).json({ user })
  } catch (err) { // här fångas error från "throw"

    //incorrect email
    if (err.message === 'incorrect email') {
      errors.email = 'Denna email finns ej registrerad'
    }
    
    //incorrect password
    if (err.message === 'incorrect password') {
      errors.password = 'Fel lösenord'
    }

    res.status(400).json({ errors })
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