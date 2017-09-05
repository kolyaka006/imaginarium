const express = require('express')
const path = require('path')
const webpack = require('webpack')
const logger = require('../build/lib/logger')
const webpackConfig = require('../build/webpack.config')
const project = require('../project.config')
const compress = require('compression')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const mongoose = require('mongoose')
const SocketIo = require('socket.io')


const app = express()
app.use(compress())
// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
//if (project.env === 'development') {
const compiler = webpack(webpackConfig)

logger.info('Enabling webpack development and HMR middleware')
app.use(require('webpack-dev-middleware')(compiler, {
  publicPath  : webpackConfig.output.publicPath,
  contentBase : path.resolve(project.basePath, project.srcDir),
  hot         : true,
  quiet       : false,
  noInfo      : false,
  lazy        : false,
  stats       : 'normal',
}))
app.use(require('webpack-hot-middleware')(compiler, {
  path: '/__webpack_hmr'
}))

mongoose.connect('mongodb://nick:Ihn3drOUGpH55Mpy@imaginarium-shard-00-00-oauwz.mongodb.net:27017,' +
  'imaginarium-shard-00-01-oauwz.mongodb.net:27017,imaginarium-shard-00-02-oauwz.mongodb.net:27017' +
  '/imaginarium?ssl=true&replicaSet=imaginarium-shard-0&authSource=admin')

require('./model/User')
require('./model/Game')
require('./model/Message')
require('./model/Chat')
const model = require('../server/model/DB')
app.use(bodyParser.json())
app.use(bodyParser({ uploadDir:'../public' }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(fileUpload())

// Serve static assets from ~/public since Webpack is unaware of
// these files. This middleware doesn't need to be enabled outside
// of development since this directory will be copied into ~/dist
// when the application is compiled.
app.use(express.static(path.resolve(project.basePath, 'public')))

let usersArray = []
let newsID = 0
app.get('/api/login', (req, res) => {
  model.User.findOne({ login: req.query.login }, (err1, resp) => {
    console.log('.....err1', err1, resp)
    if (resp) {
      if (resp.password === req.query.password) {
        return res.send({userId: resp._id, login: resp.login, name: resp.name })
      } else {
        return res.sendStatus(403)
      }
    } else {
      model.User.create({
        login: req.query.login,
        password: req.query.password,
        avatar: '',
        name: req.query.login
      }, (err2, user) => {
        return res.send(user)
      })
    }
  })
})
app.get('/api/userInfo', (req, res) => {
  model.User.findOne({ _id: req.query.id }, 'name avatar', (err, user) => {
    model.News.find({ user: req.query.id }).populate('user', 'avatar name').exec((err, news) => {
      return res.send({ user: user, news: news })
    })
  })
})
app.get('/api/game/:id', (req, res) => {
  model.Game.findById(req.params.id).exec((err, resp) => {
    return res.status(200).json({ game: resp })
  })
})
app.patch('/api/user/:id', (req, res) => {
  model.User.update({ _id:req.params.id }, { name: req.body.info.name }, (err, resp) => {
    if (err) {
      return res.statusCode(500)
    }
    return res.json({ info: { name: req.body.info.name } })
  })
})
app.post('/api/game', (req, res) => {
  model.Game.create({ users: [req.body.userId] }, (err, game) => {
    res.send(game)
  })
})

app.post('/api/upload/:userID/:type', function (req, res, next) {
  let sampleFile = req.files.photo
  let avatarName = +req.params.type ? 'newsID' : 'userID'
  avatarName += req.params.userID + '.' + sampleFile.name.split('.').pop()
  sampleFile.mv(path.resolve(__dirname, '../public/') + '/' + avatarName, function (err) {
    if (err) {
      return res.status(500).send(err)
    }
    if (!+req.params.type) {
      model.User.update({ _id: req.params.userID }, { avatar: avatarName }, { new: true }, (err, resp) => {
        return res.json({ avatar: avatarName })
      })
    } else {
      return res.json({ poster: avatarName })
    }
  })
})
app.use('*', function (req, res, next) {
  const filename = path.join(compiler.outputPath, 'index.html')
  compiler.outputFileSystem.readFile(filename, (err, result) => {
    if (err) {
      return next(err)
    }
    res.set('content-type', 'text/html')
    res.send(result)
    res.end()
  })
})

logger.info('Starting server...')
const server = app.listen(process.env.PORT || 8000, () => {
  logger.success('Server is running at http://localhost:' + process.env.PORT)
})

const io = new SocketIo(server, { path: '/api/chat' })
const socketEvents = require('./socketEvents')(io)

module.exports = app
