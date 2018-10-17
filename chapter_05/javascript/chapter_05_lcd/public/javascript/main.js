(function(){ 
	var socket = io();

	var sendTextButton = document.getElementById("send-text");

	sendTextButton.addEventListener("click", function(){
		var sendText = document.getElementById("input-text").value;
	     socket.emit('input-text', sendText);
	});
})();