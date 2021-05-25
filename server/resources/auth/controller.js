const UserModel = require('../users/model')

exports.auth = async (req, res, next) => {

  const userCookieId = req.cookies.user
  const loggedInUser = await UserModel.findById(userCookieId)

  if (loggedInUser.isAdmin) {
    console.log(loggedInUser.email, 'is admin')
    return next()
  } else {
    let error = new Error('User is unauthorized and has no admin rights')
    error.status = 401
    return next(error)
  }
}

exports.isLoggedIn = async (req, res, next) => {
  const userCookieId = req.cookies.user

  if(userCookieId === undefined) {
    let error = new Error('Not logged in') 
    error.status = 400
    // redirecta till log in page här

    return next(error)
  } else {
    console.log('logged in')
    return next()
  }

}