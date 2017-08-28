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

mongoose.connect('mongodb://kolyaka:nanaki123@cluster0-shard-00-00-zr61a.mongodb.net:27017,' +
  'cluster0-shard-00-01-zr61a.mongodb.net:27017,cluster0-shard-00-02-zr61a.mongodb.net:27017/' +
  'testDB?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin')

require('./model/User')
require('./model/Game')
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
  model.User.findOne({ login: req.query.login, password: req.query.password }, (err1, resp) => {
    return resp
      ? res.send(resp)
      : model.User.create({
        login: req.query.login,
        password: req.query.password,
        avatar: '',
        name: req.query.login,
        news: [] }, (err2, user) => {
        return res.send(user)
      })
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
app.post('/api/news', (req, res) => {
  let news = Object.assign({}, req.body.news, { user: req.body.id, created_at: new Date() })
  let sendUser = (id) => {
    model.News.findById(id).populate('user', 'avatar name').exec((err, news) => {
      res.json(news)
    })
  }
  model.News.create(news, (err, resp) => {
    if (req.body.poster) {
      news.poster = 'newsID' + resp._id + '.' + req.body.poster
      resp.update({ poster: news.poster }, (err, upd) => {
        sendUser(resp._id)
      })
    } else {
      sendUser(resp._id)
    }
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
const server = app.listen(8000, () => {
  logger.success('Server is running at http://localhost:8000')
})

const io = new SocketIo(server, { path: '/api/chat' })
const socketEvents = require('./socketEvents')(io)

module.exports = app
