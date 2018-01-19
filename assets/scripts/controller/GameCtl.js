const GameModel = require('GameModel');
cc.Class({
    extends: cc.Component,

    properties: {
        gameView: require('GameView'),
        ball: require('Ball'),
        paddle: require('Paddle'),
        brickLayout: require('BrickLayout'),
        overPanel: require('OverPanel'),
        startPanel: require('StartPanel'),
    },

    //this.physicsManager.debugDrawFlags =0;
    // cc.PhysicsManager.DrawBits.e_aabbBit |
    // cc.PhysicsManager.DrawBits.e_pairBit |
    // cc.PhysicsManager.DrawBits.e_centerOfMassBit |
    // cc.PhysicsManager.DrawBits.e_jointBit |
    // cc.PhysicsManager.DrawBits.e_shapeBit
    // ; 

    // use this for initialization
    onLoad() {
        //安卓返回键退出
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, (event) => {
            if (event.keyCode === cc.KEY.back) {
                cc.director.end();
            }
        });
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            // 有按键按下时，判断是否是我们指定的方向控制键，并设置向对应方向加速
            onKeyPressed: function(keyCode, event) {
                console.log("onKeyPressed", keyCode, event)
                switch(keyCode) {
                    case cc.KEY.a:
                        self.startGame();
                        break;
                }
            },
            // 松开按键时，停止向该方向的加速
            onKeyReleased: function(keyCode, event) {
                console.log("onKeyReleased", keyCode, event)
            }
        }, self.node);
    
        this.physicsManager = cc.director.getPhysicsManager();
        this.gameModel = new GameModel();
        // this.startGame();
        this.init();
    },

    init() {
        this.startPanel.init(this);
        this.ball.init(this);
        this.overPanel.init(this);
        this.physicsManager.enabled = true;
    },
    startGame() {
        this.physicsManager.enabled = true;
        this.gameModel.init();

        this.gameView.init(this);
        this.ball.reset();
        this.paddle.init();
        this.brickLayout.init(this.gameModel.bricksNumber);
        this.overPanel.init(this);
    
        this.expendTimes = 1;
    },

    pauseGame() {
        this.physicsManager.enabled = false;
    },

    resumeGame() {
        this.physicsManager.enabled = true;
    },

    stopGame() {
        this.physicsManager.enabled = false;
        this.overPanel.show(this.gameModel.score, this.gameModel.bricksNumber === 0);
    },

    onBallContactBrick(ballNode, brickNode) {
        brickNode.parent = null;
        this.gameModel.addScore(1);
        if (this.gameModel.score >= 5*this.expendTimes) {
            this.paddle.expand();
            this.expendTimes += 1;
        }else {
            this.ball.large();
        }
        this.gameModel.minusBrick(1);
        this.gameView.updateScore(this.gameModel.score);
        if (this.gameModel.bricksNumber <= 0) {
            this.stopGame();
        }
    },

    onBallContactGround(ballNode, groundNode) {
        this.stopGame();
    },

    onBallContactPaddle(ballNode, paddleNode) {

    },

    onBallContactWall(ballNode, brickNode) {

    },

    onDestroy() {
        this.physicsManager.enabled = false;
    }

});