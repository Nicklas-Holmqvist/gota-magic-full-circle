const UserModel = require('../users/model')

exports.auth = async (req, res, next) => {
  console.log('AUTH IS HERE =============')
  const users = await UserModel.find()

  users.forEach((user) => {
    if (user.isAdmin) {
      console.log(user.email, 'is admin')
    } else {
      console.log(user.email, 'is NOT admin')
    }
  })

  next()
}

// get user from cookie
// access isAdmin
// if isAdmin == true --> return? true
//    else --> return? false
// next()

// const loggedInUser = await UserModel.findById('cookie-value')
// if (loggedInUser.isAdmin) {
//  return true
// } else {
//   return false 
// }