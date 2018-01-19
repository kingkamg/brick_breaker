cc.Class({
    extends: cc.Component,

    expand: function () {
        cc.log("paddle expand");
        this.node.width += 50;
        var physicsBox = this.node.getComponent(cc.PhysicsBoxCollider);
        physicsBox.size.width = this.node.width;
        physicsBox.apply();
        cc.log("paddle resetSize", this.node.width, physicsBox.size.width);
    },
    shrink: function () {
        cc.log("paddle shrink");
        this.node.width -= 50;
        if (this.node.width < 150) {
            return;
        }
        var physicsBox = this.node.getComponent(cc.PhysicsBoxCollider);
        physicsBox.size.width = this.node.width;
        physicsBox.apply();
        cc.log("paddle resetSize", this.node.width, physicsBox.size.width);
    },
    reset: function () {
        cc.log("paddle resetSize");
        var physicsBox = this.node.getComponent(cc.PhysicsBoxCollider);
        this.node.width = 177;
        physicsBox.size.width = this.node.width;
        physicsBox.apply();
        cc.log("paddle resetSize", this.node.width, physicsBox.size.width);
    },

    onLoad: function () {
        this.node.parent.on("touchmove", (event) => {
            //将世界坐标转化为本地坐标
            let touchPoint = this.node.parent.convertToNodeSpace(event.getLocation());
            this.node.x = touchPoint.x;
        });
        // this.physicsBox = this.node.getComponent(cc.PhysicsBoxCollider);
    },

    init(){
        cc.log("paddle init");
        this.node.x = 360;
        this.reset();
    }

});