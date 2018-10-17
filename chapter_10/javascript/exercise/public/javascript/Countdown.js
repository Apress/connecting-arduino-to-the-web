var Countdown = (function(){
	var countdown = document.getElementById('countdown');
	var seconds; 
	var minutes; 
	var hours;
    var stopGame;

    var init = function(){
        hours = 0;
        seconds = 5;
        minutes = 0;
    }

    var add = function(stop){
        stopGame = stop;
        seconds--;
        if(seconds === 0 && minutes === 0){
            stopGame = true;
        }
        if(seconds < 0){
            seconds = 59;
            minutes--;
        }    
        countdown.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
        
        if(!stopGame){
            setTimeout(add, 1000);
        }

    }

    var getStopGame = function(){
        return stopGame;
    }
    
    return{
        init:init,
        add: add,
        getStopGame: getStopGame
    }
})();