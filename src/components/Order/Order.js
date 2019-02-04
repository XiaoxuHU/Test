import React from 'react';
import classes from './Order.css'

const order = (props) =>{
    const ingredients = [];
    for(let ingredientName in props.ingrdients){
        ingredients.push({
            number:props.ingrdients[ingredientName],
            name:ingredientName
        });
    }
    
    const ingrdientOutput = ingredients.map( ig=>{
        return <span key={ig.name} style={{textTransform:'capitalize',display:'inline-block',margin:'0 10px',border:'1px solid #ccc',padding:'5px'}}>{ig.name} ({ig.number})</span>
    })
    
    return(
        <div className={classes.Order}>
            <p>Ingredients:{ingrdientOutput}</p>
            <p>Price: <strong>${Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
}

export default order;