var canvas;
var stage;
var level;
var stage_screen;
var screen_width;
var screen_height;
var current_screen;
var current_music_handle;


function init(){

	createjs.SoundJS.registerPlugins([createjs.HTMLAudioPlugin, createjs.FlashPlugin]);
	createjs.SoundJS.checkPlugin(true);	
	createjs.SoundJS.stop();

	canvas = document.getElementById("canvas");

	var manifest = [
		{id:"play", src:"/assets/snd_sword_atk.mp3"},
		{id:"ingame", src:"/assets/Kumasi Groove.mp3"},
		{id:"endgame", src:"/assets/Danse Macabre - Finale.mp3"},
		{id:"menu", src:"/assets/Darkest Child.mp3"}		
	];

	preload = new createjs.PreloadJS();
	preload.onComplete = doneLoading;
	preload.installPlugin(createjs.SoundJS);
	preload.loadManifest(manifest);
}

function doneLoading(){
	startGame();
}

function startGame() {
	// create a new stage and point it at our canvas:
	stage = new createjs.Stage(canvas);
	
	// grab canvas width and height for later calculations:
	screen_width = canvas.width;
	screen_height = canvas.height;
	
	loadMenu();

	// we want to do some work before we update the canvas,
	// otherwise we could use Ticker.addListener(stage);
	createjs.Ticker.addListener(window);
	createjs.Ticker.useRAF = true;
	createjs.Ticker.setFPS(60);

	current_music_handle = createjs.SoundJS.play("menu", createjs.SoundJS.INTERRUPT_ANY, 0, 0, -1, 1);
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
	if(current_music_handle){
		current_music_handle.stop();
		current_music_handle = createjs.SoundJS.play("menu", createjs.SoundJS.INTERRUPT_ANY, 0, 1, -1, 1);
	}
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
	current_music_handle.stop();
	current_music_handle = createjs.SoundJS.play("ingame", createjs.SoundJS.INTERRUPT_ANY, 0, 1, -1, 0.6);
	unloadCurrentScreen();
	stage_screen = new Level(level_code);
	stage_screen.addBoardOnStage(stage);
}

function loadEndGame(remaining_time,time_limit,completed,level_id){
	unloadCurrentScreen();
	stage_screen = new EndGameScreen(remaining_time,time_limit,completed,level_id);
	stage.addChild(stage_screen);
}