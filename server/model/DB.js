const mongoose = require('mongoose')

module.exports = {
  User: mongoose.model('User'),
  Game: mongoose.model('Game'),
  Message: mongoose.model('Message'),
  Chat: mongoose.model('Chat')
}
