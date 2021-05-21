const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  email: {
    type: 'String',
    required: true
  },
  password: {
    type: 'String',
    required: true
  },
  isAdmin: Boolean
})

userSchema.statics.login = async function(email, password){
  const user = await this.findOne({ email });
  console.log('user is:', user)
  console.log('email is:', email)
  
  if(user) {    
    const auth = await bcrypt.compare(password, user.password)
    console.log('user.password:', user.password)
    if(auth) 
    {      
      return user;
    }
    throw ('Incorrect Password')
  }
  throw ('incorrect email')
}

const UserModel = mongoose.model('user', userSchema)

module.exports = UserModel;
