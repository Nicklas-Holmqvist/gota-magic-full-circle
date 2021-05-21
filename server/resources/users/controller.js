const express = require('express')
const UserModel = require('./model')
const bcrypt = require('bcrypt');

// Create new user
exports.createUser = async (req, res) => {
  // try {
    console.log('HEJHEJ')

    const { email, password } = req.body
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

  // } catch (error) {
  //   console.error(error)
  // }
}

// Log in
exports.login = async (req, res) => {

}