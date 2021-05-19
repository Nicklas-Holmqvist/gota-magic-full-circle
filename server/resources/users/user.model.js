const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  email: {
    type: 'String',
    required
  },
  password: {
    type: 'String',
    required
  },
  isAdmin: Boolean
})

userSchema.statics.login = async function(email, password){
  const user = await this.findOne({ email });
  
  if(user) {    
    const auth = await bcrypt.compare(password, user.password)
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
