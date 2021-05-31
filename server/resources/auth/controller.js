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
    // redirecta till log in page här

    return next(error)
  } else {
    console.log('logged in')
    return next()
  }

}