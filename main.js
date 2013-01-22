var canvas;
var stage;
var level;
var screen_width;
var screen_height;
var current_screen;


function init(){
	canvas = document.getElementById("demoCanvas");
	startGame();
}

function startGame() {
	// create a new stage and point it at our canvas:
	stage = new createjs.Stage(canvas);
	
	// grab canvas width and height for later calculations:
	screen_width = canvas.width;
	screen_height = canvas.height;
	
	level = new Level(1);
	level.addBoardOnStage(stage);
	//loadMenu();

	// we want to do some work before we update the canvas,
	// otherwise we could use Ticker.addListener(stage);
	createjs.Ticker.addListener(window);
	createjs.Ticker.useRAF = true;
	createjs.Ticker.setFPS(60);
}

function tick(){
	/*for (var i = 0; i < stage.children.length; i++) {
		stage.children[i].changeConnected(false);
	};*/

	//level.update();

	stage.update();
}

function loadMenu(){
	//var menu = Menu.new();
	current_screen = "MENU";
}