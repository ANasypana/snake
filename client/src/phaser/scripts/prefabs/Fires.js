import Phaser from "phaser";

import Apples from "./Apples";
import GameObject from "./GameObject";


export default class Fires extends Apples{
    constructor(scene, level) {
        super(scene, level);
        this.countMax = 10 + this.level * 2;
        this.timer = this.scene.time.addEvent({
                delay: 4000 - this.level*500,
                callback: this.tick,
                callbackScope: this,
                loop: true
            }
        )

    }

    createElements(){
        let fire = this.getFirstDead();

        if(!fire){
            const data = GameObject.generateAttributes(this.scene);
            fire = new GameObject({
                scene: this.scene,
                x: data.x,
                y: data.y,
                texture: "fire",
                frame: "fire",
                velocity: -300 -(this.level*40),
                enemy: true
            });
            this.add(fire)
        }else {
            fire.reset()
        }
        fire.move();
        ++this.countCreated;
    }
}