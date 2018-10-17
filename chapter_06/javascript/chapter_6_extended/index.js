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
    serialport.on('data', function(data){
            var dataKey = data.slice(0,2);

            var dataString = data.slice(2);
            dataString = dataString.replace(/(\r\n|\n|\r)/gm, "");

            if(dataKey === "BP"){
                var dataArray = dataString.split(",");
                socket.emit("button-data", dataArray);
            } else {
                var dataObject = {
                    dataKey: dataKey,
                    dataString: dataString
                }
                socket.emit("bar-data", dataObject);
            }
    });

     socket.on('percentData', function(data){
        serialport.write(data + 'T');
    });
    
    socket.on('disconnect', function(){
        console.log('disconnected');
    });
});

server.listen(3000, function(){
    console.log('listening on port 3000...');
});