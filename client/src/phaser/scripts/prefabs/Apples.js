import Phaser from "phaser";

import GameObject from "./GameObject";


export default class Apples extends Phaser.Physics.Arcade.Group{
    constructor(scene, level) {
        super(scene.physics.world, scene);

        this.scene = scene;
        this.level = level;
        this.countMax = 120;
        this.countCreated = 0;
        this.countKilled=0;
        this.timer = this.scene.time.addEvent({
                delay: 500,
                callback: this.tick,
                callbackScope: this,
                loop: true
            }
        )

    }

    tick(){
        if(this.countCreated < this.countMax){
            this.createElements();
        }else {
            this.timer.remove();
        }
    }

    createElements(){
        let apple = this.getFirstDead();

        if(!apple){
            const data = GameObject.generateAttributes(this.scene);

            apple = new GameObject({
                scene: this.scene,
                x: data.x,
                y: data.y,
                texture: "apple",
                frame: "apple",
                velocity: -300 -(this.level*20),
                enemy: false
            });
            apple.on("killed", this.onAppleKilled, this)
            this.add(apple)
        }else {
            apple.reset()
        }

        apple.move();
        ++this.countCreated;
    }

    onAppleKilled(){
        ++this.countKilled;
        if(this.countKilled >= this.countMax){
            this.scene.events.emit("apples-killed")
        }
    }
}