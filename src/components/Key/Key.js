import React, { Component, createRef } from 'react';

import styles from './Key.module.css';

class Key extends Component {
    constructor(props) {
        super(props)
        this.theRef = createRef()
    }
     
    removeTransition = (e) => {
        if(e.propertyName !== 'transform') return;
        this.theRef.current.classList = styles["key"];
        this.props.onTransEnd(this.theRef);
    }

    componentDidMount() {
        this.theRef.current.addEventListener('transitionend', this.removeTransition);
    }

    componentWillUnmount() {
        this.theRef.current.removeEventListener('transitionend', this.removeTransition);
    }
    
    render = () => {
        let ClassList = styles["key"];
        
        if (this.props.keyPlaying) {
            ClassList += ' ' + styles["playing"];
        }else {
            ClassList = styles["key"];
        }
          
        return (
            <div 
            data-key={this.props.keyNumber} 
            className={ClassList}
            ref={this.theRef}>
                <kbd>{this.props.keyLetter}</kbd>
                <span className={styles["sound"]}>{this.props.keyName}</span>
            </div>
        );
    }
}

export default Key;