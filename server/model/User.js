const mongoose = require('mongoose')

let UserSchema = mongoose.Schema({
  login: String,
  password: String,
  name: String,
  avatar: String,
  created_at: {
    type: Date,
    default: new Date()
  }
})

mongoose.model('User', UserSchema)
