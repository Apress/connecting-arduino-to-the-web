(function(){     
    var socket = io();
    var stopGame = false;
    var startElement = document.getElementById('start');
    var playAgainElement = document.getElementById('again');

    socket.on('data', function(data){
        Game.newData(data);
    });

    startElement.addEventListener("click", function(){

        Countdown.init();
        Countdown.add(stopGame);
        Points.updatePoints(0);
        Game.animate();
        startElement.classList.add('hidden');
    });

    playAgainElement.addEventListener("click", function(){
        stopGame = false;
        Points.resetPoints();
        Points.updatePoints(0);
        Countdown.init();
        Countdown.add(stopGame);
        Game.animate();
        playAgainElement.classList.add("hidden");
    })
})();