function Level(level_id){
	this.time_limit = 10;
	this.chains_needed = 1;
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
			col_blocks.push(chain);	
		};		
		this.blocks.push(col_blocks);	
	};	
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
	
};

Level.prototype.checkSurroundings = function(chain){
	var chainsToCheck = [];
	if (chain.isConnector()) return;
	if(chain.column != 0){
		var l_neighbour = this.blocks[chain.line][chain.column-1];
		if((l_neighbour.orientation.input == OrientationEnum.UP && chain.orientation.input == OrientationEnum.DOWN) || 
			(chain.orientation.input == OrientationEnum.UP && l_neighbour.orientation.input == OrientationEnum.DOWN)){
			if (l_neighbour.is_connected) chain.is_connected = true;
			else chainsToCheck.push(l_neighbour);
		}
	}
};

Level.prototype.update = function() {
    for (var y = 0; y < this.columns; y++)
	{	    
    	this.checkChainConnections(1,y,OrientationEnum.UP);
	}
};

Level.prototype.checkChainConnections = function(x,y,fromDirection) {
	if ((y >= 0) && (y < this.columns) &&
        (x >= 0) && (x < this.rows))
	{
		var chain =	this.blocks[x][y];
	    if (chain.hasConnector(fromDirection) && !chain.is_connected)
	    {    	
	        //WaterTracker.Add(new Vector2(x, y));
	        chain.is_connected = true;
	        var next_directions = chain.getOtherEnds(fromDirection);
	        for (var i = 0; i < next_directions.length; i++) {
	        	switch(next_directions[i]){
	        		case OrientationEnum.LEFT: this.checkChainConnections(x - 1, y, OrientationEnum.RIGHT);
	                    break;
	                case OrientationEnum.RIGHT: this.checkChainConnections(x + 1, y, OrientationEnum.LEFT);
	                    break;
	                case OrientationEnum.UP: this.checkChainConnections(x, y - 1, OrientationEnum.DOWN);
	                    break;
	                case OrientationEnum.DOWN: this.checkChainConnections(x, y + 1, OrientationEnum.UP);
	                    break;
	        	}
	        };
	    }
	    else{
	    	chain.changeConnected(false);
	    }
	}
};

//https://dl.dropbox.com/u/14137502/Portcullis/main.html