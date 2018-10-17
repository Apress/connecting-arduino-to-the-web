var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);
var SerialPort = require('serialport');
var serialport = new SerialPort('ADD IN THE SERIAL PORT FOR YOUR ARDUINO', {
    parser: SerialPort.parsers.readline('\n')
});

app.engine('ejs', require('ejs').__express);
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res){
    res.render('index');
});

serialport.on('open', function(){
    console.log('serial port opened');
});

io.on('connection', function(socket){
    console.log('socket.io connection');

    socket.on('red', function(data){
        serialport.write(data + 'T');
    });

    socket.on('green', function(data){
        serialport.write(data + 'T');
    });
    
	socket.on('disconnect', function(){
        console.log('disconnected');
    });
});

server.listen(3000, function(){
    console.log('listening on port 3000...');
});
