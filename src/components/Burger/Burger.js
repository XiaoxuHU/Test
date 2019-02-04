import React from 'react';
import BurgerIngrdients from './BurgerIngrdients/BurgerIngrdients';
import classes from './Burger.css';

const burger =(props) => {
    //{"salad": 1,"cheese":2} => [salad0,cheese0,cheese1]
    let transformedIngredients = [];
    for (let ingKey in props.ingredients) {
        let value = props.ingredients[ingKey];
        for (let i = 0; i < value;i++) {
            transformedIngredients = transformedIngredients.concat(<BurgerIngrdients key={ingKey + i} type={ingKey} />);
        }
    }
    
    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please Add Ingredients</p>;
    }
    return (<div className={classes.Burger}>
                <BurgerIngrdients type='bread-top'/>
                {transformedIngredients}
                <BurgerIngrdients type='bread-bottom'/>
           </div>);
};

export default burger;