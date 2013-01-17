window.ChainTypeEnum = {
    L : {code:"L"},
    STRAIGHT : {code:"S"},
    CROSS : {code:"C"},
    T : {code:"T"},
    BROKENCROSS : {code:"BC"},
    BROKEN : {code:"B"},
    DOUBLEL : {code:"DL"} 
};

window.OrientationEnum = {
    UP : {name:"up",code:"U"},
    RIGHT : {name:"right",code:"R"},
    DOWN : {name:"down",code:"D"},
    LEFT : {name:"left",code:"L"}
};

(function() {
 
    var Chain = function(imageOrUri,size,i,j) {
      this.initialize(imageOrUri,size,i,j);
    }
    var p = Chain.prototype = new createjs.Container();
     
    p.Container_initialize = p.initialize;
    p.initialize = function(imageOrUri,size,i,j) {	
        this.Container_initialize();
        
        this.line = i;
        this.column = j;

        this.chain_type = ChainTypeEnum.STRAIGHT;
        this.orientation = {input : OrientationEnum.UP, output : OrientationEnum.DOWN};        
        this.is_connected = false;
        this.is_top_connector = this.is_bottom_connector = false;

        this.bmp = new createjs.Bitmap(imageOrUri);

        this.bmp.image.width = this.bmp.image.height = size;

        this.width = this.height = size;
        this.regX = this.bmp.regX = this.bmp.image.width/2;
        this.regY = this.bmp.regY = this.bmp.image.height/2;    

        this.bmp.x = this.bmp.y = 0;

        this.x = (15*(this.column+1))+ this.bmp.image.width*(this.column+1);
    	this.y = (15*(this.line+1)) + this.bmp.image.height*(this.line+1);

    	this.addChild(this.bmp);
    }

    Chain.prototype.setAsConnector = function(line_min,line_max) {
        if (this.line == line_min){
            this.is_top_connector = true;
            this.is_connected = true;
        }
        else if(this.line == line_max){
            this.is_bottom_connector = true;
        }
    };

    Chain.prototype.changeOrientationOnRotation = function() {
        switch(this.chain_type){
            case ChainTypeEnum.STRAIGHT:
                if (this.bmp.rotation == 0 || this.bmp.rotation == 180){
                    this.orientation = {input : OrientationEnum.UP, output : OrientationEnum.DOWN};                            
                }
                else if(this.bmp.rotation == 90 || this.bmp.rotation == 270){
                    this.orientation = {input : OrientationEnum.LEFT, output : OrientationEnum.RIGHT};                            
                }
                break;
            case ChainTypeEnum.L:
                break;
            case ChainTypeEnum.CROSS:
                break;
            case ChainTypeEnum.T:
                break;
            case ChainTypeEnum.BROKENCROSS:
                break;
            case ChainTypeEnum.BROKEN:
                break;
            case ChainTypeEnum.DOUBLEL:
                break;                
        }
    };

    p.onClick = function(event){
        if (this.is_top_connector || this.is_bottom_connector) return;

        this.bmp.rotation = (this.bmp.rotation+90)%360;
        this.changeOrientationOnRotation();
        //TODO:Check is connected on Level.checkSurroundings(i,j)
        stage.update();
    }
     
    window.Chain = Chain;
}());