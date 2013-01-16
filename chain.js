(function() {
 
var Chain = function(imageOrUri,size,i,j,events) {
  this.initialize(imageOrUri,size,i,j,events);
}
var p = Chain.prototype = new createjs.Container();
 
p.Container_initialize = p.initialize;
p.initialize = function(imageOrUri,size,i,j,events) {	
    this.Container_initialize();
    
    this.bmp = new createjs.Bitmap(imageOrUri);

    this.bmp.image.width = this.bmp.image.height = size;

    this.regX = this.bmp.regX = this.bmp.image.width/2;
    this.regY = this.bmp.regY = this.bmp.image.height/2;    

    this.bmp.x = this.bmp.y = 0;

    this.x = (15*(i+1))+ this.bmp.image.width*(i+1);
	this.y = (15*(j+1)) + this.bmp.image.height*(j+1);							
	this.onClick = events.onClick;

	this.orientation = 1;

	this.addChild(this.bmp);
}
 
window.Chain = Chain;
}());