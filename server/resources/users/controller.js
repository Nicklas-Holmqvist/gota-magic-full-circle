const express = require('express')
const UserModel = require('./model')
const bcrypt = require('bcrypt');

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
    res.status(400).json('Email already registered')
  }
}

// Log in
exports.login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await UserModel.login(email, password)

    // set cookie here

    res.status(200).json("user is logged in")
  } catch (error) {
    res.status(400).json(error)
  }
}