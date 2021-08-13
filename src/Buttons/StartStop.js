import React, {Component} from 'react';
import './StartStop.css';

class StartStop extends Component{

    render(){

        return(

            <div className = "StartStop"
                onClick = {this.props.onClick}
                data-value = {this.props.value}
            >

            <link rel="stylesheet" href="https://use.typekit.net/oov2wcw.css"/>
            {this.props.symbol}

            </div>

        )

    }

}

export default StartStop;