(function(){ 
	var socket = io();

	var redBlock = document.getElementById("red-block");
	var greenBlock = document.getElementById("green-block");

	redBlock.addEventListener("click", function(){
	     var redClick = redBlock.classList.toggle("red-block-on");
	     socket.emit('red', redClick + "_red");
	});

	greenBlock.addEventListener("click", function(){
	     var greenClick = greenBlock.classList.toggle("green-block-on");
	     socket.emit('green', greenClick + "_green");
	});
})();