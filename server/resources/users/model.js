const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  email: {
    type: 'String',
    required: true,
    lowercase: true
  },
  password: {
    type: 'String',
    required: true
  },
  isAdmin: Boolean
})

userSchema.statics.login = async function(email, password){
  const user = await this.findOne({ email });
  
  if (user) {    
    const auth = await bcrypt.compare(password, user.password)
    if (auth) {      
      return user;
    }
    throw Error('incorrect password')
  }
  throw Error('incorrect email')
}

const UserModel = mongoose.model('user', userSchema)

module.exports = UserModel;
