var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);
var SerialPort = require('serialport');
var serialport = new SerialPort('ADD IN THE SERIAL PORT FOR YOUR ARDUINO', {
    parser: SerialPort.parsers.readline('\n')
});
var schedule = require('node-schedule');

var sensors = {
    temp: {current: 0 , high:0, low:100 },
    humidity: {current: 0, high:0, low: 100},
    light: {current: 0, high:0, low: 10}
}

var changeDay = 0;

var j = schedule.scheduleJob('*/40 * * * * *', function(){
    for (key in sensors) {
        if (sensors.hasOwnProperty(key)) {
            sensors[key].current = 0;
            sensors[key].high = 0;
            sensors[key].low = 100;
        } 
    }
    changeDay = 1;
});

app.engine('ejs', require('ejs').__express);
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res){
    res.render('index');
});

io.on('connection', function(socket){

    console.log('socket.io connection');
    console.log(sensors)

    socket.emit("initial-data", sensors);

    serialport.on('data', function(data){
        data = data.replace(/(\r\n|\n|\r)/gm,"");
        //order is temperature, humidity, light
        var dataArray = data.split(',');

        var hasChanged = updateValues(dataArray);

        if (hasChanged > 0){
            console.log("sensor has changed")
            socket.emit("data", sensors);
        }

        if(changeDay === 1){
            changeDay = 0;
            socket.emit('change-day', "true");
        }
    });
    
    socket.on('disconnect', function(){
        console.log('disconnected');
    });
});

server.listen(3000, function(){
    console.log('listening on port 3000...');
});

function updateValues(data){

    var changed = 0;
    var keyArray = ["temp", "humidity", "light"];

    keyArray.forEach(function(key, index){

        var tempSensor = sensors[key];
        var newData = data[index];

        if(tempSensor.current !== newData){
            sensors[key].current = data[index];
            changed = 1;
        }

        if(tempSensor.high < newData){
            sensors[key].high = data[index];
            changed = 1;
        }

        if(tempSensor.low > newData ){
            sensors[key].low = data[index];
        }
    });
    return changed;
}
