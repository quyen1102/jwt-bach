const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const {Schema} =mongoose
const UserSchema = new Schema({
   name: {
      type: String,
      require: [true, 'Must provide a name'],
      minLength: 3,
      maxLength: 20,
      unique: [true, 'This name already exists']
   },
   email: {
      type: String,
      require: [true, 'Must provide a email'],
      minLength: 3,
      maxLength: 20,
      match: [
         /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
         'Please provide a valid email'
      ],// valid email address ()
      unique: [true, 'This name already exists']
   },
   password: {
      type: String,
      require: [true, 'Must provide a password'],
      minLength: 6,
   }
})

// Convert password to jwt and save to db
UserSchema.pre('save', async function(){
   const salt = await bcrypt.genSalt(10)
   this.password = await bcrypt.hash(this.password, salt)
})

//jwt có 3 đối số(argument): data, token secret, time
UserSchema.methods.createJWT = function() {
   return jwt.sign(
      {
         //data
         userID: this._id,
         name: this.name
      },
      process.env.JWT_TOKEN, // secret in env , private
      {
         expiresIn:process.env.JWT_LIFETIME //time
      })
}

// methods lay ra ten
UserSchema.methods.getName = function() {
   return this.name
}
// method so sanh xem co phai password(compare password)
UserSchema.methods.comparePassword = async function(candidatePassword) {
   const isMatch = await bcrypt.compare(candidatePassword, this.password)
   return isMatch
}
module.exports = mongoose.model('User', UserSchema)