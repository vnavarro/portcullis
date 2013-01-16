

function Level(){
	this.columns = 10;
	this.rows = 10;	
	this.timelimit = 10;
	this.chainsneeded = 1;
	this.levelid = 1;

	this.blocks = new Array();
	for (var i = this.columns - 1; i >= 0; i--) {
		var col_blocks = new Array();
		for (var j = this.rows - 1; j >= 0; j--) {			
			var events = new Object();
			events.onClick = function(event){ alert("Block pos:"+event) };
			var chain = new Chain("img/stoneblock.png",32,i,j,events);						
			col_blocks.push(chain);	
		};		
		this.blocks.push(col_blocks);	
	};	
}

Level.prototype.addBoardOnStage = function(stage) {
	for (var i = this.columns - 1; i >= 0; i--) {
		for (var j = this.columns - 1; j >= 0; j--) {
			stage.addChild(this.blocks[i][j]);		
		};
	};	
};