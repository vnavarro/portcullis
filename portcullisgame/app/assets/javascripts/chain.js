window.ChainTypeEnum = {
    L : {code:"L",image:"assets/chain_b.png",image_on:"assets/chain_b_on.png"},
    STRAIGHT : {code:"S",image:"assets/chain_a.png",image_on:"assets/chain_a_on.png"},
    CROSS : {code:"C",image:"assets/stoneblock.png",image_on:""},
    T : {code:"T",image:"assets/stoneblock.png",image_on:""},
    BROKENCROSS : {code:"BC",image:"assets/stoneblock.png",image_on:""},
    BROKEN : {code:"B",image:"assets/chain_d.png",image_on:""},
    DOUBLEL : {code:"DL",image:"assets/stoneblock.png",image_on:""},
    SENDER : {code:"SE",image:"assets/chain_c.png",image_on:"assets/chain_c_on.png"},
    RECEIVER : {code:"RE",image:"assets/chain_c.png",image_on:"assets/chain_c_on.png"}
};

window.OrientationEnum = {
    UP : {name:"up",code:"U"},
    RIGHT : {name:"right",code:"R"},
    DOWN : {name:"down",code:"D"},
    LEFT : {name:"left",code:"L"}
};

(function() {
 
    var Chain = function(chain_data,size,i,j,padding_x,padding_y) {
      this.initialize(chain_data,size,i,j,padding_x,padding_y);
    }

    var p = Chain.prototype = new createjs.Container();
     
    p.Container_initialize = p.initialize;
    p.initialize = function(chain_data,size,i,j,padding_x,padding_y) {	
        this.Container_initialize();
        
        this.line = i;
        this.column = j;

        this.chain_type = this.getChainTypeFromCode(chain_data.ct);        
        //this.orientation = {input : [OrientationEnum.UP], output : [OrientationEnum.DOWN]};        
        this.is_connected = false;
        this.setAsConnector();

        this.onClickDelegate = null;

        /*// create spritesheet and assign the associated data.
        var spriteSheet = new createjs.SpriteSheet({
            // image to use
            images: [this.chain_type.image,this.chain_type.image_on], 
            // width, height & registration point of each sprite
            frames: [ 
                [0, 0, 32,32, 0,  16,  16],
                [0, 0, 32,32, 1,  16,  16]
                //[x:0, y:0, width: 32, height: 32, imageIndex:0, regX: 16, regY: 16],
                //[x:0, y:0, width: 32, height: 32, imageIndex:1, regX: 16, regY: 16]
            ], 
            // To slow down the animation loop of the sprite, we set the frequency to 4 to slow down by a 4x factor
            animations: {
                off: [0, 0],
                on: [1, 1]
            }
        });

        // create a BitmapSequence instance to display and play back the sprite sheet:
        this.bmp = new createjs.BitmapAnimation(spriteSheet);
        
        // set the registration point (the point it will be positioned and rotated around)
        // to the center of the frame dimensions:
        //this.bmp.regX = this.bmp.spriteSheet.__frameWidth/2|0;
        //this.bmp.regY = this.bmp.spriteSheet._frameHeight / 2 | 0;

        // start playing the first sequence:
        // walk_h has been generated by addFlippedFrames and
        // contained the right facing animations
        this.bmp.gotoAndPlay("off");

        this.bmp.name = this.chain_type.code;
        //this.bmp.direction = 90;
        //this.bmp.vX = 1;

        //this.bmp.spriteSheet._frameWidth = this.bmp.spriteSheet._frameHeight = size;

        this.width = this.height = size;
        this.regX = this.bmp.regX = this.bmp.spriteSheet.frameWidth/2 | size/2;
        this.regY = this.bmp.regY = this.bmp.spriteSheet.frameHeight/2 | size/2;    

        this.bmp.x = this.bmp.y = 0;

        this.x = 100+(5*(this.column+1))+ size*(this.column+1);
        this.y = 100+(5*(this.line+1)) + size*(this.line+1);

        this.bmp.rotation = chain_data.r;
        this.changeOrientationOnRotation();*/


        this.bmp = new createjs.Bitmap(this.chain_type.image);

        this.bmp.image.width = this.bmp.image.height = size;

        this.width = this.height = size;
        this.regX = this.bmp.regX = this.bmp.image.width/2;
        this.regY = this.bmp.regY = this.bmp.image.height/2;    

        this.bmp.x = this.bmp.y = 0;

        this.x = padding_x+(5*(this.column+1))+ this.bmp.image.width*(this.column+1);//
    	this.y = padding_y+ (5*(this.line+1)) +this.bmp.image.height*(this.line+1);//

        this.bmp.rotation = chain_data.r;
        this.changeOrientationOnRotation();

    	this.addChild(this.bmp);

        this.bmp_on = new createjs.Bitmap(this.chain_type.image_on);
        this.bmp_on.alpha = 0;

        this.bmp_on.image.width = this.bmp_on.image.height = size;

        this.width = this.height = size;
        this.regX = this.bmp_on.regX = this.bmp_on.image.width/2;
        this.regY = this.bmp_on.regY = this.bmp_on.image.height/2;    

        this.bmp_on.x = this.bmp_on.y = 0;

        //this.x = padding_x+(5*(this.column+1))+ this.bmp_on.image.width*(this.column+1);
        //this.y = padding_y+(5*(this.line+1)) + this.bmp_on.image.height*(this.line+1);

        this.bmp_on.rotation = this.bmp.rotation;

        this.addChild(this.bmp_on);
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
        if (this.chain_type == ChainTypeEnum.SENDER) return;        
        this.is_connected = connected;        
    }

    Chain.prototype.updateOnOffConnection = function() {
        if(this.is_connected){
            this.bmp.alpha = 0;
            this.bmp_on.alpha = 1;
        }
        else{
            this.bmp.alpha = 1;
            this.bmp_on.alpha = 0;
        }
    };

    Chain.prototype.setAsConnector = function() {
        if (this.chain_type == ChainTypeEnum.SENDER){
            this.is_connected = true;
        }
        else if(this.chain_type == ChainTypeEnum.RECEIVER){
            this.is_connected = false;
        }
    };

    Chain.prototype.hasConnector = function(fromDirection) {
        switch(fromDirection){
            case OrientationEnum.DOWN:
                return this.orientation.input.indexOf(OrientationEnum.UP) != -1 || 
                    this.orientation.output.indexOf(OrientationEnum.UP) != -1
            case OrientationEnum.RIGHT:
                return this.orientation.input.indexOf(OrientationEnum.LEFT) != -1 || 
                        (this.orientation.output.indexOf(OrientationEnum.LEFT) != -1 && this.bmp.rotation == 270);
            case OrientationEnum.LEFT:
                return this.orientation.input.indexOf(OrientationEnum.RIGHT) != -1 || 
                        (this.orientation.output.indexOf(OrientationEnum.RIGHT) != -1 && this.bmp.rotation == 0);
            case OrientationEnum.UP:
                return this.orientation.input.indexOf(OrientationEnum.DOWN) != -1 || 
                        this.orientation.output.indexOf(OrientationEnum.DOWN) != -1;
        }         
    };

    Chain.prototype.getOpposeDirection = function(direction){
        if (direction == OrientationEnum.DOWN) return OrientationEnum.UP;
        if (direction == OrientationEnum.UP) return OrientationEnum.DOWN;
        if (direction == OrientationEnum.RIGHT) return OrientationEnum.LEFT;
        if (direction == OrientationEnum.LEFT) return OrientationEnum.RIGHT;
    }

    Chain.prototype.getOtherEnds = function(fromDirection) {
        var opposeDirection = this.getOpposeDirection(fromDirection);

        var other_connections = [];
        for (var i = 0; i < this.orientation.output.length; i++) {
            if(this.orientation.output[i] != opposeDirection){
                other_connections.push(this.orientation.output[i]);
            }
        };
        
        for (var i = 0; i < this.orientation.input.length; i++) {
            if(this.orientation.input[i] != opposeDirection){
                other_connections.push(this.orientation.input[i]);
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
                if (this.bmp.rotation == 0){
                    this.orientation = {input : [OrientationEnum.UP], output : [OrientationEnum.RIGHT]};
                }
                else if(this.bmp.rotation == 90){
                    this.orientation = {input : [OrientationEnum.RIGHT],output : [OrientationEnum.DOWN]};
                }
                else if(this.bmp.rotation == 180){
                    this.orientation = {input : [OrientationEnum.LEFT],output : [OrientationEnum.DOWN]};
                }
                else if(this.bmp.rotation == 270){
                    this.orientation = {input : [OrientationEnum.UP],output : [OrientationEnum.LEFT]};
                }
                break;
            case ChainTypeEnum.CROSS:
                break;
            case ChainTypeEnum.T:
                break;
            case ChainTypeEnum.BROKENCROSS:                
                break;
            default:
                this.orientation = {input:[],output:[]};
                break;
            case ChainTypeEnum.DOUBLEL:
                break;                
        }
    };

    p.onClick = function(event){
        if (this.isConnector() || this.parent_level.current_game_state != GameStatesEnum.PLAYING) return;

        this.bmp.rotation = (this.bmp.rotation+90)%360;
        this.bmp_on.rotation = this.bmp.rotation;
        this.changeOrientationOnRotation();
        if(this.onClickDelegate) this.onClickDelegate(this);
        stage.update();
    }
     
    window.Chain = Chain;
}());