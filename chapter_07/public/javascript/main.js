(function(){ 
    var socket = io();

    var accumulatorArrayA0 = [0,0,0,0,0,0,0,0,0,0,0];
    var accumulatorArrayA1 = [0,0,0,0,0,0,0,0,0,0,0];

    BarChart.setup(accumulatorArrayA0);

    socket.on("bar-data", function(data){
        var current = data.dataKey;
        var svgBar = document.getElementById(current);
        
        var newWidth = data.dataString * 40;
        
        svgBar.setAttribute("width", newWidth);

        currentInputValue(data);
        addRemoveClass("add");
    });

    socket.on("button-data", function(data){

        accumulatorArrayA0[data[0]] = accumulatorArrayA0[data[0]] + 1;
        accumulatorArrayA1[data[1]] = accumulatorArrayA1[data[1]] + 1;

        addRemoveClass("remove");

        BarChart.updateBar(accumulatorArrayA0);
    });

    function addRemoveClass(action){
        var buttonResponse = document.getElementById("bar-A0").getElementsByClassName("text-block-response")[0];
        
        buttonResponse.classList[action]("hidden");

        buttonResponse = document.getElementById("bar-A1").getElementsByClassName("text-block-response")[0];
        
        buttonResponse.classList[action]("hidden");
    }

    function currentInputValue(data){
        var targetP = document.getElementById("bar-" + data.dataKey).getElementsByClassName("text-block")[0].getElementsByTagName("p")[0];

        targetP.innerHTML = data.dataString;
    }
})();
