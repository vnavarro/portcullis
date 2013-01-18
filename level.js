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

