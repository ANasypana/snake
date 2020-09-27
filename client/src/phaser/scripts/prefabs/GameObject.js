import Phaser from "phaser";

export default class GameObject extends Phaser.GameObjects.Sprite{
    constructor(data) {
        super(data.scene, data.x, data.y, data.texture, data.frame)
        this.init(data);

    }

    init(data){
        this.enemy = data.enemy
        this.velocity = data.velocity;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.enable = true;
        this.scene.events.on("update", this.update, this);

    }

    static generateAttributes(scene){
        const x = scene.sceneWidth + 200;
        const y = Phaser.Math.Between(100, scene.sceneHeight - 100);
        return {x, y}
    }

    move(){
        this.body.setVelocityX(this.velocity);
    }

    isDead(){
        return this.x < -this.width
    }

    update(){
        if(this.active && this.isDead() ){
            this.setAlive(false);
        }
    }

    setAlive(status=true, killed= true){
        this.body.enable = status;
        this.setVisible(status);
        this.setActive(status);
        if(!killed){
            this.emit("killed")
        }
    }

    reset(){
        const data = GameObject.generateAttributes(this.scene);
        this.x = data.x;
        this.y = data.y;
        this.setAlive();
    }
}