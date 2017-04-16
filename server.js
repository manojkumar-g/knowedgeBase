var path = require('path')
var webpack = require('webpack')
var express = require('express')
import bodyParser from 'body-parser'
import passport from 'passport'
var config = require('./webpack.config')

var app = express()
import conf from './config'
import connection from './src/api/db'

import authRoutes from './src/api/routes/auth.js'
import passportConfig from './src/api/config/passport';

var compiler = webpack(config)

connection(conf.dbUri)
app.set('port',(process.env.PORT || 1234))
app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  noInfo : true,
  hot : true
}))

app.use(require('webpack-hot-middleware')(compiler))

app.use(bodyParser.json())

app.use(passport.initialize())

passportConfig(passport)
authRoutes(app,passport)

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})


app.listen(app.get('port'), function(err) {
  if (err) {
    return console.error(err)
  }

  console.log('Listening at http://localhost:1234/')
})
