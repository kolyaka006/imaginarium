const mongoose = require('mongoose')

let ChatSchema = mongoose.Schema({
  room: String,
  history: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Message'
  }],
  created_at: {
    type: Date,
    default: new Date()
  }
})

mongoose.model('Chat', ChatSchema)
