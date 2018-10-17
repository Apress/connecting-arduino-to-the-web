var Points = (function(){
    var points = 0;
    var pointDisplay = document.getElementById("points");
    
    var resetPoints = function(){
    	console.log('in points')
    	points = 0;
    }
    var updatePoints = function(num){
        points = points + num;
        pointDisplay.innerHTML = points;  
    }
    var getPoints = function(){
    	return points;
    }
    return{
    	resetPoints: resetPoints,
        updatePoints: updatePoints,
        getPoints: getPoints
    }
})();