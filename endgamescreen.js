(function(){
	var EndGameScreen = function(remaining_time,time_limit,completed,level_id) {
      this.initialize(remaining_time,time_limit,completed,level_id);
    }

    var p = EndGameScreen.prototype = new createjs.Container();
     
    p.Container_initialize = p.initialize;
    p.initialize = function(remaining_time,time_limit,completed,level_id) {	
        this.Container_initialize();

        this.next_level = level_id+1;

        this.bg = new createjs.Bitmap("assets/bgEndGame.png");        
        this.addChild(this.bg);

        var text = "YOU OPENED THE GATES!";
        if(!completed) text = "THE GUARDS FOUND YOU!"

        this.title = new createjs.Text(text,"32px MedievalSharp","#d4a00f");
		this.title.x = 320-this.title.getMeasuredWidth()/2;
		this.title.y = 60;
		this.addChild(this.title);

        text = "THE TREASURE IS YOURS.";
        var x = 320+160-45;
        if(!completed){
            text = "YOU LOST THIS TREASURE FOREVER.";
            x = 320-45;
        }

        this.subtitle = new createjs.Text(text,"32px MedievalSharp","#d4a00f");
        this.subtitle.x = 320-this.subtitle.getMeasuredWidth()/2;
        this.subtitle.y = 115;
        this.addChild(this.subtitle);

		this.btn_back = new createjs.Bitmap("assets/btnBack.png");
		this.btn_back.x = x;
		this.btn_back.y = 350;
		this.btn_back.onClick = function (event){
			console.log("Back clickado");
			loadLevelSelection();
		};
		this.addChild(this.btn_back);

        if(completed){
            this.btn_continue = new createjs.Bitmap("assets/btnContinue.png");
            this.btn_continue.x = 320-160-45;
            this.btn_continue.y = 350;
            this.btn_continue.onClick = function (event){
                if(this.parent.hasMoreLevels(this.parent.next_level)) loadLevel(this.parent.next_level);
                else loadMenu();
            };
            this.addChild(this.btn_continue);
        }

        x = 60;
        if(!completed) x = 320-98.5;
        this.chest = new createjs.Bitmap("assets/chest.png");
        this.chest.x = x;
        this.chest.y = 180;
        this.addChild(this.chest);

        var time_percentage = (remaining_time*100)/time_limit;
        var stars = 0;        
        if(time_percentage >= 80) stars = 3;
        else if(time_percentage >= 50) stars = 2;
        else if(time_percentage >= 30) stars = 1;

        for (var i = 0; i < stars; i++) {
          this.createStar(i);  
        };        
    };

    EndGameScreen.prototype.createStar = function(index){
        this.star = new createjs.Bitmap("assets/star.png");
        this.star.x = 340+62*index;
        this.star.y = ((index==1) ? 170 : 200) ;
        this.addChild(this.star);        
    };

     EndGameScreen.prototype.unload = function() {
		this.removeAllChildren();
	};	

    EndGameScreen.prototype.hasMoreLevels = function(level_id){
        for (var i = 0; i < game_data.length; i++) {
            if(game_data[i].code == level_id)return true;
        };
        return false;
    };

	window.EndGameScreen = EndGameScreen;
}());