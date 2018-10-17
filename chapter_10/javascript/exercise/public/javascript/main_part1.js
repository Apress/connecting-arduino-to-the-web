(function(){ 
    var socket = io();
    socket.on('data', function(data){
        Game.newData(data);
    });
})();