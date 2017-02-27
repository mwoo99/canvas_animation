//model for HTML5 canvas-based animation

//access canvas and buttons via DOM
var c = document.getElementById("playground");
var stopButton = document.getElementById( "stop" );

//prepare to interact with canvas in 2D
var ctx = c.getContext("2d");
var dvd = new Image();
dvd.src = "dvd.jpg"
ctx.fillStyle = "#ffff00";



var requestID;


var clear = function(e) {
    e.preventDefault();
    ctx.clearRect(0, 0, 500, 500);
};


//wrapper function will allow inner function to keep track of
// its own complement of local variables (radius, xcor...)
var anime = function() {
	
    window.cancelAnimationFrame( requestID );
	
    console.log(requestID);

    //init params for drawing dot
    var radius = 50;
    var xcor = c.width / 2;
    
    //Q: what happens w/ & w/o next line?
    //window.cancelAnimationFrame( requestID );

    var drawDot = function() {
	console.log( requestID )

	ctx.clearRect( 0, 0, c.width, c.height );
	
	ctx.beginPath();
	ctx.arc( xcor, 150, radius, 0, 2 * Math.PI );
	ctx.stroke();
	ctx.fill();

	xcor++;

	requestID = window.requestAnimationFrame( drawDot );
    };
    drawDot();
};

var growingDot = function() {
	
    window.cancelAnimationFrame( requestID );
	
    console.log(requestID);

    //init params for drawing dot
    var radius = 1;
    var xcor = c.width / 2;
    var ycor = c.height/ 2;
    var growing = true;

    //Q: what happens w/ & w/o next line?
    //window.cancelAnimationFrame( requestID );

    var drawDot = function() {

	ctx.clearRect( 0, 0, c.width, c.height );
	
	ctx.beginPath();
	ctx.arc( xcor, ycor, radius, 0, 2 * Math.PI );
	ctx.stroke();
	ctx.fill();
	
	if (radius == 250) { growing = false; }
    if (radius == 0) {growing = true;}
    if (growing) { radius ++; }
    else { radius --;}

	requestID = window.requestAnimationFrame( drawDot );
    };
    drawDot();
};


var animateDVD = function(){
  window.cancelAnimationFrame( requestID );
    var x = Math.random() * 100;
    var y = Math.random() * 100;
    var right = true;
    var down = true;

  var drawDVD = function(){
    ctx.clearRect(0, 0, 500, 500);
    ctx.drawImage(dvd, x, y, 150 , 100);

    if (x >= 350) { right = false; }
    else if (x <= 0) { right = true; }
    if (y <= 0) { down = true; }
    else if (y >= 400) { down = false; }

    if (right) { x++; }
    else  { x--; }
    if (down) { y++; }
    else { y--; }

    requestId = window.requestAnimationFrame(drawDVD);
  }
  drawDVD();
}

var stopIt = function() {
    console.log( requestID );
    window.cancelAnimationFrame( requestID );
};


//tie click-on-canvas to anime function
c.addEventListener( "click", animateDVD )

//ideally, clicking stop will make the animation stop
stopButton.addEventListener( "click",  stopIt );
