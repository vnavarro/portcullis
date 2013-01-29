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
	if(stage_screen && stage_screen.unload) stage_screen.unload();
	stage.removeAllChildren();
}

function loadMenu(){
	unloadCurrentScreen();
	stage_screen  = new MainMenu();
	stage.addChild(stage_screen);
}

function loadLevelSelection(){	
	unloadCurrentScreen();
	stage_screen = new LevelSelection();
	stage.addChild(stage_screen);
}

function loadLevel(level_code){
	unloadCurrentScreen();
	stage_screen = new Level(level_code);
	stage_screen.addBoardOnStage(stage);
}

function loadEndGame(remaining_time,time_limit,completed,level_id){
	unloadCurrentScreen();
	stage_screen = new EndGameScreen(remaining_time,time_limit,completed,level_id);
	stage.addChild(stage_screen);
}