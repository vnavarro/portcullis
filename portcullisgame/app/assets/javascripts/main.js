var canvas;
var stage;
var level;
var stage_screen;
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
	
	//level = new Level(1);
	//level.addBoardOnStage(stage);
	loadMenu();

	// we want to do some work before we update the canvas,
	// otherwise we could use Ticker.addListener(stage);
	createjs.Ticker.addListener(window);
	createjs.Ticker.useRAF = true;
	createjs.Ticker.setFPS(60);
}

function tick(){

	if(stage_screen.update)stage_screen.update();
	stage.update();
}

function unloadCurrentScreen(){
	stage_screen.unload();
	stage.removeAllChildren();
}

function loadMenu(){
	var on_play = function(){
		unloadCurrentScreen();
		loadLevelSelection();		
	};
	stage_screen  = new MainMenu(on_play);
	stage.addChild(stage_screen);
}

function loadLevelSelection(){	
	stage_screen = new LevelSelection();
	stage.addChild(stage_screen);
}

function loadLevel(level_code){
	unloadCurrentScreen();
	stage_screen = new Level(level_code);
	stage_screen.addBoardOnStage(stage);
}