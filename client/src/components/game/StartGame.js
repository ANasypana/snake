import React, {Fragment, useEffect, useRef, useState} from "react";
import {connect} from "react-redux";
import Phaser from "phaser";
import { IonPhaser } from '@ion-phaser/react';
import {updatePlayer, deleteAccount} from "../../actions/player";

import background from "../../phaser/sprites/background.png";
import PreloadScene from "../../phaser/scripts/scenes/PreloadScene";
import StartScene from "../../phaser/scripts/scenes/StartScene";
import GameScene from "../../phaser/scripts/scenes/GameScene";
import {Spinner} from "../layout/Spinner";
import applePng from "../../phaser/sprites/apple.png";
import firePng from "../../phaser/sprites/fire.png";




const mapStateToProps = state => ({
    player: state.auth.player,
    loading: state.auth.loading,

});


export const StartGame = connect(mapStateToProps, {updatePlayer, deleteAccount})(
    ({updatePlayer, deleteAccount, player, loading }) => {

    const gameEl = useRef(null);
    const trigger = player === null ? 0 : 1;

    useEffect(()=>{

        class BootScene extends Phaser.Scene {
            constructor() {
                super('Boot');
            }
            preload() {
                this.load.image("bg", background);
            }

            create(){
                this.scene.start("Preload",
                    {player,
                        updateData: updatePlayer,
                        width: 1280,
                        height: 720,})
            }
        }
        const config = {
            type: Phaser.AUTO,
            width: 1280,
            height: 720,
            scene: [BootScene, PreloadScene, StartScene, GameScene, ],
            physics: {
                default: "arcade",
                arcade: {
                    debug: false
                }
            }
        };

        const game =  new Phaser.Game(config);

        gameEl.current = player === null ? null : game;

        return () => {
            const can = document.querySelector("canvas");
            can.remove();
            gameEl.current = null;
        }
    }, [loading, trigger]);

    return (
        <Fragment>
            {loading && loading ? <Spinner/> :
                <Fragment>
                    <IonPhaser game={gameEl.current}  />
                    <div className="text-right">
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={deleteAccount}
                        >
                            Delete Account
                        </button>
                    </div>
                </Fragment>

            }
        </Fragment>

        )

})