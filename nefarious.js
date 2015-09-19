var global, shapeCreator, shapeEnclosure;
var userControl = [];
var userKeys = {
	"left" : 37,
	"right" : 39,
	"top" : 38,
	"down" : 40,
	"rotateLeft" : 65,
	"rotateRight" : 68,
};
var canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d");

var shapeEnclosureConstructor = function() {
	this.cx = global.windowWidth/2;
	this.cy = global.windowHeight/2;
	this.width = 200;
	this.height = 200;
	this.dx = this.cx - this.width/2;
	this.dy = this.cy - this.height/2;
	this.rotation = new function() {
		this.angle = 0;
		this.v = 0;
		this.f = 0.98;
		this.acc = 1;
		this.maxv = 5;
	};
	//this.rotation = new this.rotationConstructor();
};

window.addEventListener("resize", onResize);
window.addEventListener("keydown", function(e) {
	userControl[e.keyCode] = true;
});

window.addEventListener("keyup", function(e) {
	userControl[e.keyCode] = false;
});

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

function rotateEnclosure() {
	if (userControl[userKeys.rotateLeft]) {
		if (Math.abs(shapeEnclosure.rotation.v) < shapeEnclosure.rotation.maxv) {
			shapeEnclosure.rotation.v -= shapeEnclosure.rotation.acc;
		}
	} 
	if (userControl[userKeys.rotateRight]) {
		if (Math.abs(shapeEnclosure.rotation.v) < shapeEnclosure.rotation.maxv) {
			shapeEnclosure.rotation.v += shapeEnclosure.rotation.acc;
		}
	}
	shapeEnclosure.rotation.v *= shapeEnclosure.rotation.f;
	shapeEnclosure.rotation.angle += shapeEnclosure.rotation.v;
}

function drawEnclosure() {
	ctx.beginPath();
	ctx.save();
	ctx.translate(shapeEnclosure.cx, shapeEnclosure.cy);
	ctx.rotate(shapeEnclosure.rotation.angle / 180 * Math.PI);
	ctx.lineWidth = shapeCreator.thickness;
	ctx.rect(-1*shapeEnclosure.cx + shapeEnclosure.dx, -1*shapeEnclosure.cy + shapeEnclosure.dy, shapeEnclosure.width, shapeEnclosure.height);
	ctx.stroke();
	ctx.restore();
	ctx.closePath();
	//console.log("yo");
}

function frame() {
	requestAnimationFrame(frame);
	ctx.clearRect(0,0,canvas.width,canvas.height);
	//console.log("yo");
	rotateEnclosure();
	drawEnclosure();
}

frame();
//setInterval(frame, 17);
