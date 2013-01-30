var canvas;
var stage;
var level;
var stage_screen;
var screen_width;
var screen_height;
var current_screen;
var current_music_handle;


function init(){
	canvas = document.getElementById("canvas");
	// create a new stage and point it at our canvas:
	stage = new createjs.Stage(canvas);

	var messageField = new createjs.Text("Loading...", "bold 42px MedievalSharp", "#000000");
	messageField.maxWidth = 1000;
	messageField.textAlign = "center";
	messageField.x = canvas.width / 2;
	messageField.y = canvas.height / 2;
	stage.addChild(messageField);
	stage.update();

	createjs.SoundJS.registerPlugins([createjs.HTMLAudioPlugin, createjs.FlashPlugin]);
	createjs.SoundJS.checkPlugin(true);	
	createjs.SoundJS.stop();

	var manifest = [
		//{id:"play", src:"/assets/snd_sword_atk.mp3",data:6},
		//{id:"ingame", src:"/assets/kumasigroove.mp3",data:6},
		{id:"ingame", src:"/assets/kumasigroove.mp3",data:6}
		//{id:"endgame", src:"/assets/Danse Macabre - Finale.mp3",data:6},
		//{id:"menu", src:"/assets/Darkest Child.mp3",data:6}		
	];

	preload = new createjs.PreloadJS();
	preload.onComplete = doneLoading;
	preload.installPlugin(createjs.SoundJS);
	preload.loadManifest(manifest);
}

function doneLoading(){
	stage.removeAllChildren();
	current_music_handle = createjs.SoundJS.play("ingame", createjs.SoundJS.INTERRUPT_ANY, 0, 1, -1, 1);
	/*var snd = new Audio('');
	if(snd.canPlayType('audio/mp3')) {
        snd = new Audio("/assets/kumasigroove.mp3");
    }
       
	snd.play();*/
	startGame();
}

function startGame() {	
	// grab canvas width and height for later calculations:
	screen_width = canvas.width;
	screen_height = canvas.height;
	
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