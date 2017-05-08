var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var module = require('./module.js');

var app = express();
app.use(bodyParser.json());
app.use(cors());

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET, POST","PUT");
  next();
});

app.get('/', function(request, response) {
    module.chatbot.timestamp = new Date();
    module.chatbot.text = module.randomSentence();
    response.send(module.chatbot);
});

app.post('/', function(request, response) {
    response.send(request.body);
});

app.listen(3000, function() {
    console.log("Chatservern är online");
});