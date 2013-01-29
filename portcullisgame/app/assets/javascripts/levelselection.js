(function(){
	var LevelSelection = function() {
      this.initialize();
    }

    var p = LevelSelection.prototype = new createjs.Container();
     
    p.Container_initialize = p.initialize;
    p.initialize = function() {	
        this.Container_initialize();

        this.bg = new createjs.Bitmap("assets/bgBig.png");        
        //this.bg.x = 320-this.bg.width/2;
        //this.bg.y = 240-this.bg.height/2;

        this.addChild(this.bg);

        this.title = new createjs.Text("Level Selection","32px MedievalSharp","#784421");
		this.title.x = 215;
		this.title.y = 60;

		this.addChild(this.title);

		var ini_x = 115;
		var ini_y = 125;
		var pad_x = 0;
		var pad_y = 0;
		for (var i = 0; i < game_data.length; i++) {
			pad_x = i%4;
			pad_y = Math.floor(i/4);
			ini_x = 115+(90 + 15)*pad_x;
			ini_y = 125+(90 + 15)*pad_y;
			var new_btn = this.createLevelButton(game_data[i].code,ini_x,ini_y);			
			this.addChild(new_btn);			
		};		
    }

    LevelSelection.prototype.createLevelButton = function(level_code,x,y) {    	
    	var btn = new createjs.Container();
    	btn.x = x;
    	btn.y = y;
    	btn.level_code = level_code;
    	btn.onClick = function(event){
    		this.parent.openLevel(this.level_code);
    	};

    	var bg = new createjs.Bitmap("assets/cleanBtnBg.png");        
    	btn.addChild(bg);

    	var btn_title = new createjs.Text(level_code,"40px MedievalSharp","#c8b7b7");
    	btn_title.x = 45 - btn_title.getMeasuredWidth()/2;
    	btn_title.y = 45 - btn_title.getMeasuredHeight()/2;
    	btn.addChild(btn_title);    	    	

    	return btn;
    };

    LevelSelection.prototype.openLevel = function(level_code) {    	
    	loadLevel(level_code);
    };

     LevelSelection.prototype.unload = function() {
		this.removeAllChildren();
	};	

	window.LevelSelection = LevelSelection;
}());