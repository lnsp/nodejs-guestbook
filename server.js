// load express framework
var bodyParser = require('body-parser')
var express = require('express')
var humanDate = require('human-date')
var mongojs = require('mongojs')
var urlEncoding = bodyParser.urlencoded({
  extended: false
})
var app = express()

var db = mongojs(process.env.MONGO_URL)
var submissions = db.collection('submissions')

// set render engine
app.set('view engine', 'pug')

// handle post submission
app.post('/submit', urlEncoding, function (req, res) {
  if (req.body.message === '' || req.body.author === '') {
    res.redirect('/')
    return
  }

  // insert submission into database
  submissions.insert({
    message: req.body.message,
    author: req.body.author,
    date: humanDate.prettyPrint(new Date())
  }, function (err) {
    if (err != null) {
      res.write('could not save submission. please try again later.')
    } else {
      res.redirect('/')
    }
  })
})

// handle guestbook listing
app.get('/', function (req, res) {
  submissions.find(function (err, docs) {
    if (err != null) {
      res.write('error while reading from database. please try again later.')
      console.log(err)
    } else {
      res.render('index', {
        title: 'Guestbook',
        submissions: docs
      })
    }
  })
})

var server = app.listen(process.env.PORT, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('Server listening on http://%s:%s', host, port)
})