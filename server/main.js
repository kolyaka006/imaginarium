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

const app = express()
app.use(compress())

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (project.env === 'development') {
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
  let userID = 0
  let newsID = 0
  app.get('/api/login', (req, res) => {
    console.log('.....req.query', req.query)
    console.log('.....usersArray', usersArray)
    usersArray.forEach(user => {
      if (user.login === req.query.login && user.password === req.query.password) {
        return res.send(user)
      }
    })
    usersArray.push(Object.assign({}, req.query, { name: req.query.login, id: ++userID, news: [] }))
    return res.json(Object.assign({}, req.query, { name: req.query.login, id: userID, news: [] }))
  })
  app.get('/api/userInfo', (req, res) => {
    usersArray.forEach(user => {
      if (user.id === +req.query.id) {
        return res.json({ avatar: user.avatar, name: user.name })
      }
    })
  })
  app.get('/api/news', (req, res) => {
    let news = []
    usersArray.forEach(user => {
      if (req.query.id === 'all' ? true : user.id === +req.query.id) {
        news = [...news, ...user.news]
      }
    })
    return res.status(200).json(news)
  })
  app.patch('/api/user/:id', (req, res) => {
    usersArray = usersArray.map(user => {
      if (user.id === +req.params.id) {
        user.name = req.body.info.name
      }
      return user
    })
    return res.json({ info: { name: req.body.info.name } })
  })
  app.post('/api/news', (req, res) => {
    let news = Object.assign({}, req.body.news, {
      created_at: new Date().toISOString(),
      userID: req.body.id,
      id: ++newsID })
    if (req.body.poster) {
      news.poster = 'newsID' + news.id + '.' + req.body.poster
    }
    usersArray = usersArray.map(user => {
      if (user.id === +req.body.id) {
        user.news = user.news || []
        user.news.push(news)
      }
      return user
    })
    return res.status(200).json({ news: news })
  })

  app.post('/api/upload/:userID/:type', function (req, res) {
    let sampleFile = req.files.photo
    console.log('.....req.params', req.params)
    let avatarName = +req.params.type ? 'newsID' : 'userID'
    avatarName += req.params.userID + '.' + sampleFile.name.split('.').pop()
    sampleFile.mv(__dirname + '/upload/' + avatarName, function (err) {
      if (err) {
        return res.status(500).send(err)
      }
      if (!+req.params.type) {
        usersArray = usersArray.map(user => {
          if (user.id === +req.params.userID) {
            user.avatar = user.avatar || ''
            user.avatar = avatarName
          }
          return user
        })
      }
      return res.send({ avatar: avatarName })
    })
  })
  // This rewrites all routes requests to the root /index.html file
  // (ignoring file requests). If you want to implement universal
  // rendering, you'll want to remove this middleware.
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
} else {
  logger.warn(
    'Server is being run outside of live development mode, meaning it will ' +
    'only serve the compiled application bundle in ~/dist. Generally you ' +
    'do not need an application server for this and can instead use a web ' +
    'server such as nginx to serve your static files. See the "deployment" ' +
    'section in the README for more information on deployment strategies.'
  )

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(express.static(path.resolve(project.basePath, project.outDir)))
}

module.exports = app
