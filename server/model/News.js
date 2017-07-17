const mongoose = require('mongoose')

let NewsSchema = mongoose.Schema({
  title: String,
  description: String,
  poster: String,
  tags: Array,
  user: {
    type: String,
    ref: 'User'
  },
  created_at: {
    type: Date,
    default: new Date()
  }
})

mongoose.model('News', NewsSchema)
