const mongoose = require('mongoose')

let MessageSchema = mongoose.Schema({
  userId: String,
  name: String,
  text: String,
  created_at: {
    type: Date,
    default: new Date().toISOString()
  }
})

mongoose.model('Message', MessageSchema)
