import Phaser from "phaser";
import dragonPng from '../../sprites/dragon.png';
import dragonJson from '../../sprites/dragon.json';
import applePng from "../../sprites/apple.png";
import firePng from "../../sprites/fire.png";





export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super('Preload');

    }

    preload() {
        /*this.load.image("apple",applePng);
        this.load.image("fire", firePng);*/
        this.load.atlas("dragon", dragonPng, dragonJson);

    }

    create(data) {
        this.scene.start("Start", data);

    }
}