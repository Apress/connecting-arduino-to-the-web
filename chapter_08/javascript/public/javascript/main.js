(function(){ 

    var socket = io();

    var temperature = new DonutChart();

    temperature.setSensorDomain([-6,50]);
    temperature.setSvgDiv('#donut1');
    temperature.createChart('\u00B0'+"c", "temp");

    var humidity = new DonutChart();

    humidity.setSensorDomain([0,90]);
    humidity.setSvgDiv('#donut2');
    humidity.createChart('\u0025', "humidity");

    var light = new DonutChart();

    light.setSensorDomain([0,10]);
    light.setSvgDiv('#donut3');
    light.createChart('', "light");

    socket.on("initial-data", function(data){
        temperature.updateChart(data.temp.current);
        humidity.updateChart(data.humidity.current);
        light.updateChart(data.light.current);
        changeHighLow(data);
    });

    socket.on('data', function(data){
        console.log('new data')
        temperature.updateChart(data.temp.current);
        humidity.updateChart(data.humidity.current);
        light.updateChart(data.light.current);
        changeHighLow(data);
    });  

    socket.on('change-day', function(data){
        changeDate();
    }) 

    function changeHighLow(data){

        for (key in data) {
            if (data.hasOwnProperty(key)) {
                var className = key + "-high";
                document.getElementById(className).innerHTML = data[key].high;
                className = key + "-low";
                document.getElementById(className).innerHTML = data[key].low;
            } 
        }

    }

    function changeDate(){
        var date = new Date();
        var displayDate = document.getElementById('date');
        displayDate.innerHTML = date.toDateString();
    }

    changeDate();

})();