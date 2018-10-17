
var Game = (function(){

    var currentScore = document.getElementById('current-score');
    var playAgainElement = document.getElementById('again');

    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;

    var colorArray = [0xff0000, 0x00ff00, 0x0000ff];
    var ballColor = Math.floor(Math.random() * 3);
    var colorChoice = 0;

    var collisionTimer = 15;

    var stopGame;

    var minMaxX = xMinMax(windowWidth);
    minMaxX = (parseFloat((minMaxX/10))-3.0.toFixed(1));

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, windowWidth/windowHeight, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( windowWidth, windowHeight );

    document.body.appendChild( renderer.domElement );

    var geometry = new THREE.BoxGeometry( 2, 0.2, 0.8 );
    var material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
    
    var geometrySphere = new THREE.SphereGeometry( 0.3, 32, 32 );
        var materialSphere = new THREE.MeshLambertMaterial( {color: colorArray[ballColor]}  );
        
    var paddle = new THREE.Mesh( geometry, material );   
 
    var ball = new THREE.Mesh( geometrySphere, materialSphere );

    updateBallPosition();

    paddle.position.y = -2;
    camera.position.z = 5;

    
    var light = new THREE.DirectionalLight(0xe0e0e0);
    light.position.set(5,2,5).normalize();

    scene.add(light);
    scene.add(new THREE.AmbientLight(0x656565));
    scene.add( paddle );
    scene.add( ball );

    var newData = function(data){
        updateScene(data);
    }

    var updateScene = function(data){
        var screenCoordinates = getCoordinates();
        var moveObjectBy;
        var x = data[0];
        var y = data[1];
        var button = data[2];
        x = x.substr(1);
        y = y.substr(1);
        button = button.substr(1);
        
        if(button ==="0"){
            updatePaddleColor();
        }
        
        if(x > 5){
            if(screenCoordinates[0] < windowWidth - 150){
                moveObjectBy = moveObjectAmount(x);
                paddle.position.x = paddle.position.x + moveObjectBy;
            }

        } else if (x < 5){
            if(screenCoordinates[0] > 0 + 150){
                moveObjectBy = moveObjectAmount(x);
                paddle.position.x = paddle.position.x + moveObjectBy;
            }
        }
        if(y > 5){
            if(screenCoordinates[1] < windowHeight  - 100){
                paddle.position.y = paddle.position.y - 0.2;
            }

        } else if (y < 5){
            if(screenCoordinates[1] > 0 + 300){
                paddle.position.y = paddle.position.y + 0.2;
            }

        }
        renderer.render(scene, camera);
    }

    var moveObjectAmount = function(x){
        var scaledX = scaleInput(x);
        scaledX = scaledX/10;
        scaledX = Math.round(scaledX * 10) / 10;
        return scaledX;
    }

    var scaleInput=function(input){
        var xPositionMin = -4;
        var xPositionMax = 4;

        var inputMin = 1;
        var inputMax = 10;

        var percent = (input - inputMin) / (inputMax - inputMin);
        var outputX = percent * (xPositionMax - xPositionMin) + xPositionMin;
        
        return outputX;
    }
    var getCoordinates = function() {
            var screenVector = new THREE.Vector3();
            paddle.localToWorld( screenVector );
            screenVector.project( camera );
            var posx = Math.round(( screenVector.x + 1 ) * renderer.domElement.offsetWidth / 2 );
            var posy = Math.round(( 1 - screenVector.y ) * renderer.domElement.offsetHeight / 2 );
            return [posx, posy];
    }

    function randomPosition(num){
        var newPostion = (Math.random() * (0 - num) + num).toFixed(1);
        newPostion *= Math.floor(Math.random()*2) == 1 ? 1 : -1;

        return newPostion;
    }
    
    function xMinMax(input){
        xPositionMin = 4;
        xPositionMax = 184;

        xWindowMin = 200;
        xWindowMax = 2000;

        var percent = (input - xWindowMin) / (xWindowMax - xWindowMin);
        var outputX = percent * (xPositionMax - xPositionMin) + xPositionMin;
        return outputX;
    }
    function updateBallPosition(){
            xPos = randomPosition(minMaxX);
            ball.position.y = 5;
            ball.position.x = xPos;
            ballColor = Math.floor(Math.random() * 3);
            ball.material.color.setHex( colorArray[ballColor]);
    }

    var updatePaddleColor = function(){
        colorChoice++;
        if(colorChoice === 3){
            colorChoice = 0;
        }

         paddle.material.color.setHex( colorArray[colorChoice]);
    }

    var animate = function () {

        var firstBB = new THREE.Box3().setFromObject(ball);

        var secondBB = new THREE.Box3().setFromObject(paddle); 
        
        var collision = firstBB.isIntersectionBox(secondBB);

        if(!collision){ 
            collisionTimer = 15;
            if(ball.position.y > (paddle.position.y - 0.5)){
                ball.position.y -= 0.08;
            } else {
                Points.updatePoints(-1);
                updateBallPosition();
            }
        }

        if(collision){
            if(collisionTimer > 0){
                collisionTimer = collisionTimer -1;
            } else {
               

            var tempPaddleColor = paddle.material.color;
            var tempBallColor = ball.material.color;

            if((tempBallColor.r === tempPaddleColor.r)&& (tempBallColor.g === tempPaddleColor.g) && (tempBallColor.b === tempPaddleColor.b) ){
            
                Points.updatePoints(1);
            } else {

                Points.updatePoints(-1);
            }
            updateBallPosition();
            }  
        }
        renderer.render(scene, camera); 
        
        // requestAnimationFrame( animate ); 

        stopGame = Countdown.getStopGame();

        if(!stopGame){
            requestAnimationFrame( animate );
        } else {
            updateBallPosition();
            var gamePoints = Points.getPoints();
            currentScore.innerHTML = gamePoints;
            playAgainElement.classList.remove("hidden");
        }
    };
    // animate();

    return{
        newData: newData,
        animate: animate
    }
})();
