(function(){
	var MainMenu = function() {
      this.initialize();
    }

    var p = MainMenu.prototype = new createjs.Container();
     
    p.Container_initialize = p.initialize;
    p.initialize = function() {	
        this.Container_initialize();

        this.bg = new createjs.Bitmap("assets/bgBig.png");
        //this.bg.x = 320-220;
        //this.bg.y = 240 - 150;

        this.addChild(this.bg);

        this.title = new createjs.Text("Chain-up!","60px MedievalSharp","#d4a00f");
		this.title.x = 190;
		this.title.y = 25;

		this.addChild(this.title);

		var credits_text = "Created by Vitor Navarro	www.vnavarro.com.br";
        this.credits = new createjs.Text(credits_text,"18px MedievalSharp","#784421");
		this.credits.x = 380;
		this.credits.y = 240;
		this.credits.lineWidth = 220;

		this.addChild(this.credits);

        this.btn_play = new createjs.Bitmap("assets/btnPlay.png");
		this.btn_play.x = 150;
		this.btn_play.y = 180;
		this.btn_play.parent = this;
		this.btn_play.onClick = function (event){
			console.log("play!");
			createjs.SoundJS.play("play", createjs.SoundJS.INTERRUPT_NONE);
			loadLevelSelection();
		};

		this.addChild(this.btn_play);        
    }

    MainMenu.prototype.unload = function() {
		this.removeAllChildren();
	};	

	window.MainMenu = MainMenu;
}());