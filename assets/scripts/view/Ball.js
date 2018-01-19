cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    large: function () {
        cc.log("ball large");
        this.node.width  += 5;
        this.node.height += 5;
        var physicsCircle = this.node.getComponent(cc.PhysicsCircleCollider);
        physicsCircle.radius = this.node.width/2;
        physicsCircle.apply();
    },
    little: function () {
        cc.log("ball little");
        this.node.width  -= 5;
        this.node.height -= 5;
        var physicsCircle = this.node.getComponent(cc.PhysicsCircleCollider);
        if (physicsCircle.radius > 17) {
            physicsCircle.radius -= 5;
            physicsCircle.apply();
        }
    },
    reset: function () {
        cc.log("ball reset");
        cc.log(this.name);
        this.node.position = cc.v2(360,270);//初始化位置
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(800,800);//初始化速度

        this.node.width  = 34;
        this.node.height = 34;
        var physicsCircle = this.node.getComponent(cc.PhysicsCircleCollider);
        physicsCircle.radius = 17;
        physicsCircle.apply();
    },

    init(gameCtl) {
        cc.log("ball init");
        cc.log(this.name);
        this.gameCtl = gameCtl;
        this.node.position = cc.v2(360,270);//初始化位置
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,0);//初始化速度
        // this.reset();
    },

    onBeginContact(contact, self, other) {
        cc.log('onBeginContact', contact, self, other);
        switch (other.tag) {
            case 1://球碰到砖块
                this.gameCtl.onBallContactBrick(self.node, other.node);
                break;
            case 2://球碰到地面
                this.gameCtl.onBallContactGround(self.node, other.node);
                break;
            case 3://球碰到托盘
                this.gameCtl.onBallContactPaddle(self.node, other.node);
                break;
            case 4://球碰到墙
                this.gameCtl.onBallContactWall(self.node, other.node);
                break;
        }
    },
});