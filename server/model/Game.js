const mongoose = require('mongoose')

let GameSchema = mongoose.Schema({
  users: Array,
  step: String,
  cards: Array,
  desk: Array,
  hand: Array,
  created_at: {
    type: Date,
    default: new Date()
  }
})

mongoose.model('Game', GameSchema)
