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

		var credits_text = "Created by Vitor Navarro	www.vnavarro.com.br	Musics from	Incompetech by Kevin MacLeod            Sounds from OpenGameArt.Org by Blender Foundation and Mumu                     Sounds from freesound by JoelAudio";
        this.credits = new createjs.Text(credits_text,"18px MedievalSharp","#000000");
		this.credits.x = 380;
		this.credits.y = 210;
		this.credits.lineWidth = 210;
		this.credits.lineHeight = this.credits.getMeasuredLineHeight()+5

		this.addChild(this.credits);

        this.btn_play = new createjs.Bitmap("assets/btnPlay.png");
		this.btn_play.x = 150;
		this.btn_play.y = 180;
		this.btn_play.onClick = function (event){
			console.log("play!");
			createjs.SoundJS.play("play", createjs.SoundJS.INTERRUPT_NONE);
			loadLevelSelection();
		};

		this.addChild(this.btn_play);        

		this.btn_snd_on = new createjs.Bitmap("assets/snd_enabled.png");
		this.btn_snd_on.x = 110;
		this.btn_snd_on.y = 300;		
		this.btn_snd_on.onClick = function (event){
			console.log("play!");
			createjs.SoundJS.play("button", createjs.SoundJS.INTERRUPT_ANY);
			this.parent.btn_snd_off.alpha = 1;
			this.alpha = 0;			
			createjs.SoundJS.setMute(true);
		};

		this.addChild(this.btn_snd_on);        

		this.btn_snd_off = new createjs.Bitmap("assets/snd_disabled.png");
		this.btn_snd_off.x = 110;
		this.btn_snd_off.y = 300;		
		this.btn_snd_off.onClick = function (event){
			console.log("play!");
			this.parent.btn_snd_on.alpha = 1;
			this.alpha = 0;			
			createjs.SoundJS.setMute(false);
		};

		this.addChild(this.btn_snd_off); 

		if(createjs.SoundJS.muted){
			this.btn_snd_on.alpha = 0;
			this.btn_snd_off.alpha = 1;
		}else{
			this.btn_snd_on.alpha = 1;
			this.btn_snd_off.alpha = 0;
		}

    }

    MainMenu.prototype.unload = function() {
		this.removeAllChildren();
	};	

	window.MainMenu = MainMenu;
}());