import React from "react";
import card from './Card.css';

const Card=(props)=>{
    return(
        <div className='card' style={props.style} onClick={props.onClick}>
              {props.children}
        </div>
    )
}

export default Card;