import React, {Component} from 'react';

export default (props) =>{

    let p1 = props.dot[0];
    let p2 = props.dot[1];

    const style = {

        left: `${p1}%`,
        top: `${p2}%`
    } 

    return(
        <div className = "snake-food" style = {style}></div>
    )

}