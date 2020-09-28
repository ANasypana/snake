import Phaser from "phaser";
import GameObject from "./GameObject";



export default class Player extends GameObject{
    constructor(scene) {
        super({
            scene,
            x: 150,
            y: scene.sceneHeight/2,
            texture: "dragon",
            frame: "dragon1",
            velocity: 500,
            enemy: false,
        });

        const frames = this.scene.anims.generateFrameNames("dragon", {
            prefix: "dragon",
            start: 1,
            end: 6
        });
        this.scene.anims.create({
            key: "fly",
            frames,
            frameRate: 10,
            repeat: -1
        });
        this.play("fly");
    }

    isDead(){
        return (this.x < -this.width) || (this.x > this.scene.sceneWidth + this.width ) ||
            (this.y < - this.height) || (this.y > this.scene.sceneHeight + this.height)
    }

    reset(){
        this.x = 150;
        this.y = this.scene.sceneHeight/2;
        this.setAlive();
    }

    move(){
        this.body.setVelocity(0);
        if (this.scene.cursors.left.isDown) {
            this.body.setVelocityX(-this.velocity)
        } else if (this.scene.cursors.right.isDown) {
            this.body.setVelocityX(this.velocity)
        }

        if (this.scene.cursors.up.isDown) {
            this.body.setVelocityY(-this.velocity)
        } else if (this.scene.cursors.down.isDown) {
            this.body.setVelocityY(this.velocity)
        }
    }

    update(){
        if(this.active && this.isDead() ){
            this.reset()
        }
    }



}