// model that is interacting with our database using mongoose to connect and bycrypt to hash/salt/encrypt our user password interactions to the database
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

// blueprint for user object
const UserSchema = new mongoose.Schema({
  userName: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String
})


// Password hash middleware.
 
 UserSchema.pre('save', function save(next) {
  const user = this
  if (!user.isModified('password')) { return next() }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err) }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) { return next(err) }
      user.password = hash
      next()
    })
  })
})


// Helper method for validating user's password.
// comparing passwords to make sure they match the salted/hashed/encrypted password in the database
UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch)
  })
}

// exporting the model so we canus it elsewhere in our code
module.exports = mongoose.model('User', UserSchema)
