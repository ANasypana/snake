import Phaser from "phaser";

export default class StartScene extends Phaser.Scene{
    constructor() {
        super("Start");
    }

    create(data){
        this.createBackground();
        if(data.player === null){
            return
        }

        if( data.score === undefined){
            this.playerName = data.player.name || "";
            this.currentScores = data.player.scores || 0;
            this.currentLevel = data.player.level || 1;
            this.updatePlayer = data.updateData;
            this.sceneWidth = data.width;
            this.sceneHeight = data.height;
            const textTitle = `HI ${this.playerName.toUpperCase()}`;
            const textScore = `Your Total Score: ${this.currentScores}`;
            const textLevel = `Your Current Level: ${ this.currentLevel}`;
            this.createStats(textTitle, textScore, textLevel, "Tap to Start");

        }else{
            if(data.completed){
                this.currentScores += data.score;
                if(this.currentLevel < 5) ++this.currentLevel;
                console.log(data.score)
                this.updatePlayer({scores: data.score, level: this.currentLevel});
            }

            const textTitle = data.completed ? "Level Completed!!!!" : "Game Over:(((";
            const textScore = data.completed ? `Your Score: ${data.score}` : "";
            const textTotalScore = data.completed ? `Your Total Score: ${this.currentScores}`: "";
            const textLevel = this.currentLevel < 5 ? "Tab to Go Next Level" : "Tab to Start New Game"
            const tabText = data.completed ? textLevel : "Tab to Restat";

            this.createStats(textTitle, textScore, textTotalScore, tabText);
        }


        this.setEvents()

    }

    createBackground(){
        this.add.sprite(0, 0,"bg").setOrigin(0);
    }

    createStats(textTitle, textScore, textLevel, tabText){
        this.add.graphics()
            .fillStyle(0x000000, 0.4)
            .fillRoundedRect(this.sceneWidth/2 - 200, this.sceneHeight/2 - 200, 400, 400);

        const textStyle = {
            font: '40px CurseCasual',
            fill: '#FFFFFF'
        };

        this.add.text(this.sceneWidth/2, 250, textTitle, textStyle).setOrigin(0.5);
        this.add.text(this.sceneWidth/2, 350, textScore, textStyle).setOrigin(0.5);
        this.add.text(this.sceneWidth/2, 400, textLevel, textStyle).setOrigin(0.5);
        this.add.text(this.sceneWidth/2, 500, tabText, textStyle).setOrigin(0.5);

    }

    setEvents(){
        this.input.on("pointerdown", ()=>{
            this.scene.start("Game", {level: this.currentLevel, width: this.sceneWidth,  height: this.sceneHeight})
        })
    }

}
