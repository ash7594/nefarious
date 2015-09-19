var global;
var canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d");

window.addEventListener("resize", resizeDetect);

function resizeDetect() {
    global = {
        "windowWidth" : {
            "full" : window.innerWidth,
            "half" : window.innerWidth/2,
    	},
    	"windowHeight" : {
        	"full" : window.innerHeight,
        	"half" : window.innerHeight/2,
    	},
	};

	canvas.width = global.windowWidth.full;
	canvas.height = global.windowHeight.full;
}

resizeDetect();

var shapeCreator = {
	"length" : 200,
	"color" : "rgb(0,0,0)",
	"thickness" : 10,
};

var shapeEnclosure = {
	"x" : global.windowWidth,
	"y" : global.windowHeight,
	"width" : 200,
	"height" : 200,
};

function drawEnclosure() {
	ctx.lineWidth = shapeCreator.thickness;
	ctx.rect(shapeEnclosure.x.half, shapeEnclosure.y.half, shapeEnclosure.width, shapeEnclosure.height);
	ctx.stroke();
}

function frame () {
	requestAnimationFrame(frame);
	//console.log("yo");
	drawEnclosure();
}

frame();
