import React, {Component} from 'react';

export default(props) => {

    const style = {

        left: `${props.dot[0]}%`,
        top: `${props.dot[1]}%`

    }

    if(props.val == 0){
        return( 

        <div className = "TwoUnits" style = {style}></div>

        )
    }else return null;

}