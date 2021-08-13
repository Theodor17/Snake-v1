import React, {Component} from 'react';
import './ButtonReset.css';


class ButtonReset extends Component{

    render(){

        return(

            <div className = "ButtonReset"
                onClick = {this.props.onClick}
                data-value = {this.props.value}
            >

            <link rel="stylesheet" href="https://use.typekit.net/oov2wcw.css"/>
            {this.props.symbol}

            </div>

        )

    }


}

export default ButtonReset;