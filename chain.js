window.ChainTypeEnum = {
    L : {code:"L",image:"assets/stoneblock.png"},
    STRAIGHT : {code:"S",image:"assets/stoneblock.png"},
    CROSS : {code:"C",image:"assets/stoneblock.png"},
    T : {code:"T",image:"assets/stoneblock.png"},
    BROKENCROSS : {code:"BC",image:"assets/stoneblock.png"},
    BROKEN : {code:"B",image:"assets/stoneblock.png"},
    DOUBLEL : {code:"DL",image:"assets/stoneblock.png"},
    SENDER : {code:"SE",image:"assets/stoneblock.png"},
    RECEIVER : {code:"RE",image:"assets/stoneblock.png"}
};

window.OrientationEnum = {
    UP : {name:"up",code:"U"},
    RIGHT : {name:"right",code:"R"},
    DOWN : {name:"down",code:"D"},
    LEFT : {name:"left",code:"L"}
};

(function() {
 
    var Chain = function(type_code,size,i,j) {
      this.initialize(type_code,size,i,j);
    }

    var p = Chain.prototype = new createjs.Container();
     
    p.Container_initialize = p.initialize;
    p.initialize = function(type_code,size,i,j) {	
        this.Container_initialize();
        
        this.line = i;
        this.column = j;

        this.chain_type = this.getChainTypeFromCode(type_code);        
        this.orientation = {input : [OrientationEnum.UP], output : [OrientationEnum.DOWN]};        
        this.is_connected = false;
        this.setAsConnector();

        this.onClickDelegate = null;

        this.bmp = new createjs.Bitmap(this.chain_type.image);

        this.bmp.image.width = this.bmp.image.height = size;

        this.width = this.height = size;
        this.regX = this.bmp.regX = this.bmp.image.width/2;
        this.regY = this.bmp.regY = this.bmp.image.height/2;    

        this.bmp.x = this.bmp.y = 0;

        this.x = (15*(this.column+1))+ this.bmp.image.width*(this.column+1);
    	this.y = (15*(this.line+1)) + this.bmp.image.height*(this.line+1);

    	this.addChild(this.bmp);
    }

    Chain.prototype.getChainTypeFromCode = function(type_code) {
         switch(type_code){
            case ChainTypeEnum.STRAIGHT.code:
                return ChainTypeEnum.STRAIGHT;
            case ChainTypeEnum.L.code:
                return ChainTypeEnum.L;
            case ChainTypeEnum.CROSS.code:
                return ChainTypeEnum.CROSS;
            case ChainTypeEnum.T.code:
                return ChainTypeEnum.T;
            case ChainTypeEnum.BROKENCROSS.code:
                return ChainTypeEnum.BROKENCROSS;
            case ChainTypeEnum.BROKEN.code:
                return ChainTypeEnum.BROKEN;
            case ChainTypeEnum.DOUBLEL.code:
                return ChainTypeEnum.DOUBLEL;
            case ChainTypeEnum.SENDER.code:
                return ChainTypeEnum.SENDER;
            case ChainTypeEnum.RECEIVER.code:
                return ChainTypeEnum.RECEIVER;                                
        }
    };

    Chain.prototype.isConnector = function(){
        return this.chain_type == ChainTypeEnum.SENDER ||
         this.chain_type == ChainTypeEnum.RECEIVER;
    };

    Chain.prototype.changeConnected = function(connected){
        this.is_connected = connected;
    }

    Chain.prototype.setAsConnector = function() {
        if (this.chain_type == ChainTypeEnum.SENDER){
            this.is_connected = true;
        }
        else if(this.chain_type == ChainTypeEnum.RECEIVER){
            this.is_connected = false;
        }
    };

    Chain.prototype.hasConnector = function(fromDirection) {
        return this.orientation.input.indexOf(fromDirection) != -1;
    };

    Chain.prototype.getOtherEnds = function(fromDirection) {
        var other_connections = [];
        for (var i = 0; i < this.orientation.output.length; i++) {
            if(this.orientation.output[i] != fromDirection){
                other_connections.push(this.orientation.output[i]);
            }
        };
        return other_connections;
    };

    Chain.prototype.changeOrientationOnRotation = function() {
        switch(this.chain_type){
            case ChainTypeEnum.STRAIGHT:
                if (this.bmp.rotation == 0 || this.bmp.rotation == 180){
                    this.orientation = {input : [OrientationEnum.UP], output : [OrientationEnum.DOWN]};                            
                }
                else if(this.bmp.rotation == 90 || this.bmp.rotation == 270){
                    this.orientation = {input : [OrientationEnum.LEFT], output : [OrientationEnum.RIGHT]};                            
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
        if (this.isConnector()) return;

        this.bmp.rotation = (this.bmp.rotation+90)%360;
        this.changeOrientationOnRotation();
        if(this.onClickDelegate) this.onClickDelegate(this);
        stage.update();
    }
     
    window.Chain = Chain;
}());