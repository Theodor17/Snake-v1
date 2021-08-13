import React from 'react';

export default(props) =>{

    return(

        <div>

            {props.snakeDots.map((dot,i) =>{

            let p1 = dot[0];
            let p2 = dot[1];
            const style = {
                left: `${p1}%`,
                top: `${p2}%`
            }   

                return(
                    
                    <div className = "snake-dot" style = {style}></div>

                )

            }
            
        )}

        </div>

    )

}