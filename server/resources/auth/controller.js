const UserModel = require('../users/model')

exports.auth = async (req, res, next) => {

  const userCookieId = req.cookies.user
  const loggedInUser = await UserModel.findById(userCookieId)
  
  if(loggedInUser === null) {
    res.status(401).json('Your not logged in!')
    return next()
  } else {
    if (loggedInUser.isAdmin) {
      console.log(loggedInUser.email, 'is admin')
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
    // redirecta till log in page här

    return next(error)
  } else {
    console.log('logged in')
    return next()
  }

}

exports.isAuth = async (req, res) => {
  const cookie = req.cookies.user

  const user = await UserModel.findOne({ _id: cookie })
  
  if(!user) {
    res.status(400).json('No logged in!')
  } else {
    res.status(200).json(user)
  }

}