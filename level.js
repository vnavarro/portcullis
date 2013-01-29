window.GameStatesEnum = {
	LOADING:0,
	ENDED:1,
	PREPLAYING:2,
    PLAYING:3,
    PAUSED:4
};

function Level(level_id){
	this.level_id = level_id;

	var game_data = this.getLevelFromData();

	this.chains_needed = game_data.chains;
	this.chains_completed = 0;

	this.receivers = [];	

	this.time_limit = game_data.tlimit;
	this.time_consumed = 0;
	this.time_since_last_update = 0;

	this.current_game_state = GameStatesEnum.LOADING;

	this.blocks = new Array();	

	var map = game_data.map;
	this.columns = map[0].length;
	this.rows = map.length;	

	paddin_x = 15+(220-((37*this.columns)/2));
	padding_y = 70+(200-((37*this.rows)/2));
	for (var i = 0; i < this.rows; i++) {
		var col_blocks = new Array();
		for (var j = 0; j < this.columns; j++) {			
			var chain = new Chain(map[i][j],32,i,j,paddin_x,padding_y);						
			chain.onClickDelegate = this.chainClickDelegate;
			chain.parent_level = this;
			col_blocks.push(chain);	
		};		
		this.blocks.push(col_blocks);	
	};	

	this.clock = new createjs.Text("Remaining Time:0","32px MedievalSharp");
	this.clock.x = 90;
	this.clock.y = 25;

	this.btn_back = new createjs.Bitmap("assets/btnBack.png");
	this.btn_back.x = 510;
	this.btn_back.y = 130;
	this.btn_back.level = this;
	this.btn_back.onClick = function (event){
		console.log("Back clickado");
		loadLevelSelection();
	};

	this.btn_pause = new createjs.Bitmap("assets/btnPause.png");
	this.btn_pause.x = 510;
	this.btn_pause.y = 245;
	this.btn_pause.level = this;
	this.btn_pause.onClick = function (event){
		console.log(this.level.current_game_state,this);
		if(this.level.current_game_state != GameStatesEnum.PAUSED && 
			this.level.current_game_state != GameStatesEnum.PLAYING) return;

		console.log("pause clickado");	
		createjs.Ticker.setPaused(!createjs.Ticker.getPaused());		
		if(createjs.Ticker.getPaused()){
			this.level.current_game_state = GameStatesEnum.PAUSED;
		}
		else{
			this.level.current_game_state = GameStatesEnum.PLAYING;
		}
	};

	this.bg = new createjs.Bitmap("assets/boardBg.png");
	this.bg.x = 15;
	this.bg.y = 70;

	this.updateConnections();
}

Level.prototype.getLevelFromData = function() {
	for (var i = game_data.length - 1; i >= 0; i--) {
		if (game_data[i].code == this.level_id){
			return game_data[i];
		}
	};
};

Level.prototype.addBoardOnStage = function(stage) {
	stage.addChild(this.bg);
	for (var i = 0;i<this.rows; i++) {
		for (var j = 0;j<this.columns;j++) {
			stage.addChild(this.blocks[i][j]);		
		};
	};		
	this.current_game_state = GameStatesEnum.PLAYING;
	stage.addChild(this.clock);
	stage.addChild(this.btn_back);
	stage.addChild(this.btn_pause);
};

Level.prototype.chainClickDelegate = function(chain) {
	this.parent_level.chains_completed = 0;
	for (var i = 0; i < this.parent_level.blocks.length; i++) {
		for (var j = 0; j < this.parent_level.blocks[i].length; j++) {
			this.parent_level.blocks[i][j].changeConnected(false);
		};
	};
	//this.parent_level.updateConnections();	
};

Level.prototype.updateConnections = function() {
    for (var y = 0; y < this.columns; y++)
	{	    
    	this.checkChainConnections(1,y,OrientationEnum.DOWN);
	}
};

Level.prototype.checkChainConnections = function(x,y,fromDirection) {
	if ((y >= 0) && (y < this.columns) &&
        (x >= 0) && (x < this.rows))
	{
		var chain =	this.blocks[x][y];
		if(chain.chain_type == ChainTypeEnum.RECEIVER){
			chain.changeConnected(true);
			this.chains_completed++;
			return;
		}

	    if (chain.hasConnector(fromDirection) && !chain.is_connected)
	    {    		        
	        chain.changeConnected(true);
	        var next_directions = chain.getOtherEnds(fromDirection);	        
	        for (var i = 0; i < next_directions.length; i++) {
	        	switch(next_directions[i]){
	        		case OrientationEnum.LEFT: this.checkChainConnections(x, y - 1, OrientationEnum.LEFT);
	                    break;
	                case OrientationEnum.RIGHT: this.checkChainConnections(x, y + 1, OrientationEnum.RIGHT);
	                    break;
	                case OrientationEnum.UP: this.checkChainConnections(x-1, y, OrientationEnum.UP);
	                    break;
	                case OrientationEnum.DOWN: this.checkChainConnections(x+1, y, OrientationEnum.DOWN);
	                    break;
	        	}
	        };
	    }
	    else{
	    	chain.changeConnected(false);
	    }	    	    
	}
};

Level.prototype.isLevelCompleted = function(){
	if (this.chains_completed >= this.chains_needed){
		return true;
	}
}

Level.prototype.update = function(){
	if(this.current_game_state != GameStatesEnum.PLAYING) return;

	this.updateConnections();
	if(this.isLevelCompleted()){
		this.current_game_state = GameStatesEnum.ENDED;
		this.callLoadEndGame(true);
	}
	
	this.time_since_last_update += createjs.Ticker.getTime(false)/1000;

	if (this.time_since_last_update >= this.time_limit/60)
	{
	    this.time_consumed++;
	    this.time_since_last_update -= this.time_limit/60;
	}
	if (this.time_consumed >= this.time_limit*(createjs.Ticker.getFPS()))
	{
		this.current_game_state = GameStatesEnum.ENDED;			    
	    this.callLoadEndGame(false);
	}
	else this.clock.text = "Remaining Time:"+Math.floor(this.time_limit-(this.time_consumed/this.time_limit));
};

Level.prototype.callLoadEndGame = function(completed){
	loadEndGame(Math.floor(this.time_limit-(this.time_consumed/this.time_limit)),this.time_limit,completed,this.level_id);
};