import Phaser from "phaser";

import applePng from "../../sprites/apple.png";





export default class PreloadSceneApple extends Phaser.Scene {
    constructor() {
        super('PreloadApple');

    }

    preload() {

        this.load.image("apple",applePng);
        /* this.load.image("fire", firePng);
 */
    }

    create(data) {
        console.log("Data Apple", data)
        this.scene.start("Preload", data);
    }
}