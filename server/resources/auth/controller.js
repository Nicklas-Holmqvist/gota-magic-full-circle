const UserModel = require('../users/model')

exports.auth = async (req, res, next) => {

  const userCookieId = req.cookies.user
  const loggedInUser = await UserModel.findById(userCookieId)
  
  if(loggedInUser === null) {
    res.status(401).json('Your not logged in!')
    return next()
  } else {
    if (loggedInUser.isAdmin) {
      return next()
    } else {
      let error = new Error('User is unauthorized and has no admin rights')
      // error.status = 403
      return next(error)
    }
  }  
}

exports.isLoggedIn = async (req, res, next) => {
  const userCookieId = req.cookies.user

  if(userCookieId === undefined) {
    let error = new Error('Not logged in') 
    error.status = 401

    return next(error)
  } else {
    return next()
  }
}

exports.isAuth = async (req, res) => {
  const cookie = req.cookies.user

  const user = await UserModel.findOne({ _id: cookie })
  if(user === undefined){
    res.status(400).json(false)
  }
  if(!user) {
    res.status(400).json(user)
  } else {
    res.status(200).json(user)
  }
}