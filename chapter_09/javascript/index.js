var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);

var axios = require('axios');
var SerialPort = require('serialport');
var serialport = new SerialPort('ADD IN THE SERIAL PORT FOR YOUR ARDUINO', {
    baudRate: 9600
});

serialport.on("open", function () {
    console.log('open');
    makeCall();
});

var startTime = '2017-12-26T12:47:47'

var makeCall = function(){

    var endTime = new Date();
      endTime = endTime.toISOString();
      endTime = endTime.split('.')[0];

    var url = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=' + startTime + '&endtime=' + endTime + '&minmagnitude=4&limit=1';

    var request = axios({
        method:'get',
        url:url,
        responseType:'json'
    });

    request.then(function(response) {
        var data = response.data.features;
        console.log(data);

        if(data.length > 0){
            var date = new Date(data[0].properties.time);

            var formatDay = (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear().toString().substr(2,2);
            var formatClock = date.getHours() + ":" + date.getMinutes();

            var quakeString = data[0].properties.mag + " "
            + formatDay + " " + formatClock + " " + data[0].properties.place;

            console.log(quakeString);

            setTimeout(function() {
                serialport.write(quakeString, function() {
                    console.log('written to serialport');
                });
            }, 2000);

            startTime = endTime;
        }
    })
      .catch(function(error){
        console.log('request error: ' + error);
    }); 
    
    setTimeout(makeCall, 600000);
}

server.listen(3000, function(){
    console.log('listening on port 3000...');
});
