const mongoose = require('mongoose')

module.exports = {
  User: mongoose.model('User'),
  News: mongoose.model('News')
}
