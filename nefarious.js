var global, shapeCreator, shapeEnclosure;
var canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d");

var shapeEnclosureConstructor = function() {
	this.cx = global.windowWidth/2;
	this.cy = global.windowHeight/2;
	this.width = 200;
	this.height = 200;
	this.dx = this.cx - this.width/2;
	this.dy = this.cy - this.height/2;
};

window.addEventListener("resize", onResize);

function onResize() {
	global = {
		"windowWidth" : window.innerWidth,
		"windowHeight" : window.innerHeight,
		"lesserDimension" : (window.innerHeight < window.innerWidth) ? window.innerHeight : window.innerWidth,
	};

	shapeCreator = {
		"length" : 200,
		"color" : "rgb(0,0,0)",
		"thickness" : 10,
	};

	shapeEnclosure = new shapeEnclosureConstructor();

	canvas.width = global.windowWidth;
	canvas.height = global.windowHeight;
}

onResize();

function drawEnclosure() {
	ctx.lineWidth = shapeCreator.thickness;
	ctx.rect(shapeEnclosure.dx, shapeEnclosure.dy, shapeEnclosure.width, shapeEnclosure.height);
	ctx.stroke();
	//console.log("yo");
}

function frame () {
	requestAnimationFrame(frame);
	//console.log("yo");
	drawEnclosure();
}

frame();
