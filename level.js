function Level(level_id){
	this.time_limit = 10;
	this.chains_needed = 1;
	this.chains_completed = 0;
	this.receivers = [];
	this.level_id = level_id;

	this.blocks = new Array();	

	var map = this.getLevelFromData();
	this.columns = map[0].length;
	this.rows = map.length;	

	for (var i = 0; i < this.rows; i++) {
		var col_blocks = new Array();
		for (var j = 0; j < this.columns; j++) {			
			var chain = new Chain(map[i][j],32,i,j);						
			chain.onClickDelegate = this.chainClickDelegate;
			chain.parent_level = this;
			col_blocks.push(chain);	
		};		
		this.blocks.push(col_blocks);	
	};	

	this.update();
}

Level.prototype.getLevelFromData = function() {
	for (var i = game_data.length - 1; i >= 0; i--) {
		if (game_data[i].code == this.level_id){
			return game_data[i].map;
		}
	};
};

Level.prototype.addBoardOnStage = function(stage) {
	for (var i = 0;i<this.rows; i++) {
		for (var j = 0;j<this.columns;j++) {
			stage.addChild(this.blocks[i][j]);		
		};
	};		
};

Level.prototype.chainClickDelegate = function(chain) {
	this.parent_level.chains_completed = 0;
	for (var i = 0; i < this.parent_level.blocks.length; i++) {
		for (var j = 0; j < this.parent_level.blocks[i].length; j++) {
			this.parent_level.blocks[i][j].changeConnected(false);
		};
	};
	this.parent_level.update();
	if(this.parent_level.isLevelCompleted()){
		alert("Winner!");
	}
};

Level.prototype.update = function() {
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
			chain.is_connected = true;
			this.chains_completed++;
			return;
		}

	    if (chain.hasConnector(fromDirection) && !chain.is_connected)
	    {    		        
	        chain.is_connected = true;
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

//https://dl.dropbox.com/u/14137502/Portcullis/main.html