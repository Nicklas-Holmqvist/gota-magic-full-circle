const UserModel = require('../users/model')

exports.auth = async (req, res, next) => {
  console.log('AUTH IS HERE =============')
  // const user = await UserModel.findById('60aba162010c3c2f005643e8')
  const admin = req.body.isAdmin
  console.log(admin)
  
  if (admin) {
    // res.send('User is an admin')
    console.log('User is an admin')
  } else {
    // res.send('User is not an admin')
    console.log('User is not an admin')
  }

  next()
}