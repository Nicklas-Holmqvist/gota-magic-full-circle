const UserModel = require('../users/model')

exports.auth = async (req, res, next) => {

  const userCookieId = req.cookies.user
  const loggedInUser = await UserModel.findById(userCookieId)

  if (loggedInUser.isAdmin) {
    console.log(loggedInUser.email, 'is admin')
  } else {
    console.log(loggedInUser.email, 'is not admin')
  }

  next()
}

exports.isLoggedIn = async (req, res, next) => {
  const userCookieId = req.cookies.user

  if(userCookieId == '') {
    res.send('not logged in')
  } else {
    res.send('logged in')
  }

  next()
}