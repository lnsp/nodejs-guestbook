// load express framework
var bodyParser = require('body-parser')
var express = require('express')
var urlEncoding = bodyParser.urlencoded({ extended: false })
var app = express()

var submissions = [{
  text: 'My dear Frodo, you asked me once if I had told you everything there was to know about my adventures. And while I can honestly say I have told you the truth, I may not have told you all of it. I am old now, Frodo. I\'m not the same hobbit as I once was. I think it is time for you to know what really happened.',
  name: 'Bilbo Baggins'
}]

// set render engine
app.set('view engine', 'pug')

// handle post submission
app.post('/submit', urlEncoding, function (req, res) {
  var entry = {
    text: req.body.text,
    name: req.body.name
  }
  console.log('submitted guestbook entry %s', entry)
  submissions.push(entry)
  res.redirect('/')
})

// handle guestbook listing
app.get('/', function (req, res) {
  res.render('index', { title: 'Guestbook', submissions: submissions })
})

var server = app.listen(process.env.PORT, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('Server listening on http://%s:%s', host, port)
})
