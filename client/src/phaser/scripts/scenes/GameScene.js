import Phaser from "phaser";
import Player from "../prefabs/Player";
import Apples from "../prefabs/Apples";
import Fires from "../prefabs/Fires";
import GameObject from "../prefabs/GameObject";



export default class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    init() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.score = 0;
        this.timeout = 60;
        this.timer = this.time.addEvent({
                delay: 1000,
                callback: this.tick,
                callbackScope: this,
                loop: true
            }
        )
    }

    create(data) {
        this.createBackground();
        this.level = data.level;
        this.sceneWidth = data.width;
        this.sceneHeight = data.height;
        this.player = new Player(this);
        this.apples = new Apples(this, this.level);
        this.fires = new Fires(this, this.level);
        this.createText();
        this.addOverlap();
        this.createCompleteEvents()
    }

    tick(){
        if(this.timeout > 0){
            --this.timeout;
            this.timeText.setText(`Time: ${this.timeout}`);
        }else {
            this.onComplete()
        }
    }

    createText() {
        this.scoreText = this.add.text(50, 100, "Score: 0", {
            font: '32px CurseCasual',
            fill: '#FFFFFF'
        });
        this.timeText = this.add.text(50, 50, "Time: 0", {
            font: '32px CurseCasual',
            fill: '#FFFFFF'
        });
    }

    update(){
        this.player.move();
        this.bg.tilePositionX += 0.5;
    }

    addOverlap(){
        this.physics.add.overlap(this.player, this.apples,
            this.onOverlap, undefined, this);
        this.physics.add.overlap(this.player, this.fires,
            this.onOverlap, undefined, this);
    }

    onOverlap(source, target){
        if(target.enemy){
            source.setAlive(false, false);
            target.setAlive(false, false);
        }else {
            ++this.score;
            this.scoreText.setText(`Score: ${this.score}`);
            target.setAlive(false, false);
        }
    }

    createCompleteEvents(){
        this.player.once("killed", this.onComplete, this);
        this.events.once("apples-killed", this.onComplete, this)

    }

    onComplete(){
        this.scene.start("Start", {
            score: this.score,
            completed: this.player.active
        });
    }

    createBackground(){
        this.bg = this.add.tileSprite(0, 0, this.sceneWidth, this.sceneHeight, "bg").setOrigin(0);
    }

}