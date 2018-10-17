var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

var title = "Some Arduino components starting with P"
var componentArray = ['potentiometer', 'piezo', 'phototransistor', 'pushbutton'];

app.get('/', function (req, res) {
	res.render('index', {
        title: title,
        components: componentArray
	});
});

server.listen(3000, function() {
  console.log('Listening on port 3000...')
});