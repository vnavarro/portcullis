var canvas;
	var stage;
	function init() {
	    canvas = document.getElementById('myCanvas');
	    width = canvas.width;
	    height = canvas.height;
	    stage = new createjs.Stage(canvas);

	    var s = drawSmiley();
		s.x = (960-350)/2;
		s.y = 20;
	    stage.addChild(s);
	    stage.update();

	}


function new(){
	var s = new createjs.Shape();
    var g = s.graphics;

    //Right eye
    g.setStrokeStyle(5, 'round', 'round');
    g.beginStroke("#000");
    g.beginFill("#000");
    g.drawRoundRect(125, 64, 20, 50, 10);
    g.endFill();
	
	return s;
}
