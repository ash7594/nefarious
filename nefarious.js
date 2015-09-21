var global, shapeCreator, shapeEnclosure, entity;
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
	this.r = global.lesserDimension/4;
};

var paddle = new function() {
	this.startAngle = Math.random()*360;
	this.widthAngle = 60;
	this.thick = 10;
	this.color = "rgb(255,0,0)";
	this.rotation = new function() {
		this.v = 0;
		this.f = 0.98;
		this.acc = 1;
		this.maxv = 10;
	};
};

var entityConstructor = function() {
	this.x = global.windowWidth/2 + Math.random()*100-50;
	this.y = global.windowHeight/2 + Math.random()*100-50;
	this.px = global.windowWidth/2;
	this.py = global.windowHeight/2;
	this.color = "rgb(0,0,0)";
	this.r = 5;
	this.vel = Math.random()*11 - 5;
	//this.f = 1;
	this.acc = 1;
	this.angle = Math.random()*360;
	//console.log(this.angle);
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
		"thickness" : 5,
	};

	shapeEnclosure = new shapeEnclosureConstructor();
	//entity = new entityConstructor();

	canvas.width = global.windowWidth;
	canvas.height = global.windowHeight;
}

onResize();
entity = new entityConstructor();

function rotatePaddle() {
	if (userControl[userKeys.rotateLeft]) {
		if (Math.abs(paddle.rotation.v) < paddle.rotation.maxv) {
			paddle.rotation.v -= paddle.rotation.acc;
		}
	} 
	if (userControl[userKeys.rotateRight]) {
		if (Math.abs(paddle.rotation.v) < paddle.rotation.maxv) {
			paddle.rotation.v += paddle.rotation.acc;
		}
	}
	paddle.rotation.v *= paddle.rotation.f;
	paddle.startAngle += paddle.rotation.v;
}

function entityMotion() {
	entity.px = entity.x;
	entity.py = entity.y;
	entity.x += entity.vel*Math.cos(entity.angle * Math.PI / 180);
	entity.y += entity.vel*Math.sin(entity.angle * Math.PI / 180);
}

function entityCollision() {
	var dx = entity.x-shapeEnclosure.cx;
	var dy = entity.y-shapeEnclosure.cy;
	if (Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2))+entity.r >= shapeEnclosure.r) {
		console.log("collide");
		var angle = Math.atan2(dy,dx) * 180 / Math.PI;
		angle += 360;
		angle %= 360;
		console.log(angle+" "+entity.angle);
		entity.angle = 2*angle - entity.angle;
		entity.angle += 180;
		entity.angle %= 360;
		entity.x = entity.px;
		entity.y = entity.py;
	}
}

function drawEntity() {
	ctx.beginPath();
	ctx.fillStyle = entity.color;
	ctx.arc(entity.x, entity.y, entity.r, 0, 2*Math.PI);
	ctx.closePath();
	ctx.fill();
}

function drawEnclosure() {
	ctx.beginPath();
	//ctx.save();
	//ctx.translate(shapeEnclosure.cx, shapeEnclosure.cy);
	//ctx.rotate(shapeEnclosure.rotation.angle / 180 * Math.PI);
	ctx.strokeStyle = shapeCreator.color;
	ctx.lineWidth = shapeCreator.thickness;
	ctx.arc(shapeEnclosure.cx, shapeEnclosure.cy, shapeEnclosure.r, 0, 2*Math.PI);
	//ctx.rect(-1*shapeEnclosure.cx + shapeEnclosure.dx, -1*shapeEnclosure.cy + shapeEnclosure.dy, shapeEnclosure.width, shapeEnclosure.height);
	ctx.stroke();
	//ctx.restore();
	ctx.closePath();
}

function drawPaddle() {
	ctx.beginPath();
	ctx.lineWidth = paddle.thick;
	ctx.fillStyle = paddle.color;
	//ctx.strokeStyle = paddle.color;
	ctx.arc(shapeEnclosure.cx, shapeEnclosure.cy, shapeEnclosure.r, paddle.startAngle*Math.PI/180, (paddle.startAngle+paddle.widthAngle)*Math.PI/180);
	//ctx.stroke();
	ctx.closePath();
	ctx.fill();
}

function frame() {
	requestAnimationFrame(frame);
	ctx.clearRect(0,0,canvas.width,canvas.height);
	//console.log("yo");
	rotatePaddle();
	entityMotion();
	entityCollision();

	drawEnclosure();
	drawPaddle();
	drawEntity();
}

frame();
