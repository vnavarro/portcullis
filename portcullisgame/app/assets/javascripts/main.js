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

	var messageField = new createjs.Text("Loading...", "42px Arial", "#784421");
	messageField.maxWidth = 1000;
	messageField.textAlign = "center";
	messageField.x = canvas.width / 2;
	messageField.y = canvas.height / 2;
	stage.addChild(messageField);
	stage.update();


	createjs.SoundJS.registerPlugins([createjs.HTMLAudioPlugin, createjs.FlashPlugin]);
	createjs.SoundJS.checkPlugin(true);	

	var manifest = [
		{id:"play", src:"assets/button1.ogg"},
		{id:"button", src:"assets/button2.ogg"},
		{id:"ingame", src:"assets/earthprelude.ogg"},
		{id:"ingame2", src:"assets/kumasigroove.ogg"},
		{id:"gameover", src:"assets/herosendi.ogg"},
		{id:"win", src:"assets/end_level.ogg"}		
	];

	preload = new createjs.PreloadJS();
	preload.onComplete = doneLoading;
	preload.installPlugin(createjs.SoundJS);
	preload.loadManifest(manifest);
}

function doneLoading(){
	current_music_handle = createjs.SoundJS.play("ingame", createjs.SoundJS.INTERRUPT_ANY, 0, 0, -1, 1);
	var retry = 0
	while(current_music_handle.playState == null && retry < 1000){ 
		current_music_handle.stop();
		current_music_handle = createjs.SoundJS.play("ingame", createjs.SoundJS.INTERRUPT_ANY, 0, 0, -1, 1);
		retry++;
	}
	/*var snd = new Audio('');
	if(snd.canPlayType('audio/mp3')) {
        snd = new Audio("/assets/kumasigroove.mp3");
    }
       
	snd.play();*/
	//stage.removeAllChildren();
	setTimeout(startGame,3500);
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
	if(current_music_handle.src != "assets/earthprelude.ogg"){
		current_music_handle.stop();
		current_music_handle = createjs.SoundJS.play("ingame", createjs.SoundJS.INTERRUPT_NONE, 0, 0, -1, 0.8);
	}
	unloadCurrentScreen();
	stage_screen  = new MainMenu();
	stage.addChild(stage_screen);
}

function loadLevelSelection(){	
	if(current_music_handle.src != "assets/earthprelude.ogg"){
		current_music_handle.stop();
		current_music_handle = createjs.SoundJS.play("ingame", createjs.SoundJS.INTERRUPT_NONE, 0, 0, -1, 0.8);
	}
	unloadCurrentScreen();
	stage_screen = new LevelSelection();
	stage.addChild(stage_screen);
}

function loadLevel(level_code){
	current_music_handle.stop();
	current_music_handle = createjs.SoundJS.play("ingame2", createjs.SoundJS.INTERRUPT_ANY, 0, 0, -1, 0.8);
	unloadCurrentScreen();
	stage_screen = new Level(level_code);
	stage_screen.addBoardOnStage(stage);
}

function loadEndGame(remaining_time,time_limit,completed,level_id){
	setTimeout(function() {
		current_music_handle.stop();
		if(completed)
			current_music_handle = createjs.SoundJS.play("win", createjs.SoundJS.INTERRUPT_ANY, 0, 0, 0, 0.4);
		else
			current_music_handle = createjs.SoundJS.play("gameover", createjs.SoundJS.INTERRUPT_ANY, 0, 0, 0, 0.4);
		unloadCurrentScreen();
		stage_screen = new EndGameScreen(remaining_time,time_limit,completed,level_id);
		stage.addChild(stage_screen);
	}, 2000);
}