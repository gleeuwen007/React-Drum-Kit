import React, { Component } from 'react';

import styles from './Keys.module.css';
import Key from '../Key/Key';

import boom from '../../assets/sounds/boom.wav';
import clap from '../../assets/sounds/clap.wav';
import hihat from '../../assets/sounds/hihat.wav';
import kick from '../../assets/sounds/kick.wav';
import openhat from '../../assets/sounds/openhat.wav';
import ride from '../../assets/sounds/ride.wav';
import snare from '../../assets/sounds/snare.wav';
import tink from '../../assets/sounds/tink.wav';
import tom from '../../assets/sounds/tom.wav';

class Keys extends Component {
    state = {
        soundKeys: [
            { keyNumber: '65', keyNote: "A", keyType: "clap", sound: boom, isPlaying: false },
            { keyNumber: '83', keyNote: "S", keyType: "hihat", sound: clap, isPlaying: false },
            { keyNumber: '68', keyNote: "D", keyType: "kick", sound: hihat, isPlaying: false },
            { keyNumber: '70', keyNote: "F", keyType: "openhat", sound: kick, isPlaying: false },
            { keyNumber: '71', keyNote: "G", keyType: "boom", sound: openhat, isPlaying: false },
            { keyNumber: '72', keyNote: "H", keyType: "ride", sound: ride, isPlaying: false },
            { keyNumber: '74', keyNote: "J", keyType: "snare", sound: snare, isPlaying: false },
            { keyNumber: '75', keyNote: "K", keyType: "tom", sound: tink, isPlaying: false },
            { keyNumber: '76', keyNote: "L", keyType: "tink", sound: tom, isPlaying: false }
        ]
    }

    componentDidMount() {
        window.addEventListener('keydown', (e) => this.downHandler(e));
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', (e) => this.downHandler(e));
    }

    downHandler = (e) => {
        const obj = this.state.soundKeys.find(obj => obj.keyNumber === String(e.keyCode));
        const objIndex = this.state.soundKeys.findIndex(obj => obj.keyNumber === String(e.keyCode));
        if(!obj) return;
        const sound = new Audio(obj.sound);
        sound.play();

        const updatedSoundKeys = {
            ...this.state.soundKeys
        };

        updatedSoundKeys[objIndex].isPlaying = true;
        this.setState({soudKeys: updatedSoundKeys});
    }

    soundEnd = (theElement) => {
        const objIndex = this.state.soundKeys.findIndex(obj => obj.keyNote === theElement.current.textContent.substring(0,1));
        
        const updatedSoundKeys = {
            ...this.state.soundKeys
        };

        updatedSoundKeys[objIndex].isPlaying = false;
        this.setState({soudKeys: updatedSoundKeys});
    }

    render = () => {
        return (
            <div className={styles["keys"]}>
               {this.state.soundKeys.map(soundKey => (
                <Key 
                    key={soundKey.keyNumber}
                    keyLetter={soundKey.keyNote}
                    keyName={soundKey.keyType}
                    keyPlaying={soundKey.isPlaying}
                    onTransEnd={this.soundEnd}
                />
            ))}
            </div>
        )
    }
}

export default Keys;