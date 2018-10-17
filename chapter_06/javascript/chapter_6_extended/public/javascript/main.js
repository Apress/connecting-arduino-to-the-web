(function(){ 
    var socket = io();
    
    var totalClickCounter = 0;
    var accumulatorArrayA0 = [0,0,0,0,0,0,0,0,0,0,0];
    var accumulatorArrayA1 = [0,0,0,0,0,0,0,0,0,0,0];
    
    socket.on("bar-data", function(data){
        var current = data.dataKey;
        
        var svgBar = document.getElementById(current);
        
        var newWidth = data.dataString * 40;
        
        svgBar.setAttribute("width", newWidth);

        currentInputValue(data);
        addRemoveClass("add");
    });

    socket.on("button-data", function(data){

        var percetageSpan = document.getElementById('percent');
        totalClickCounter = totalClickCounter + 2;

        accumulatorArrayA0[data[0]] = accumulatorArrayA0[data[0]] + 1;
        accumulatorArrayA1[data[1]] = accumulatorArrayA1[data[1]] + 1;

        var positiveTotal1 = sumPositiveResponses(accumulatorArrayA0);
        var positiveTotal2 = sumPositiveResponses(accumulatorArrayA1);

        var positiveTotals = positiveTotal1 + positiveTotal2;

        var positivePercentage = (positiveTotals/totalClickCounter) * 100;

        positivePercentage = Math.floor(positivePercentage);
        percent.innerHTML = positivePercentage;

        socket.emit('percentData', positivePercentage);
        
        addRemoveClass("remove");
    });

    function sumPositiveResponses(dataArray){      
      var positiveTotal = 0;
      for(var i = 5; i< dataArray.length; i++){
        positiveTotal = positiveTotal + dataArray[i];
      }
      return positiveTotal;
    }


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
