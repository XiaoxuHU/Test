import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const addIngredients = (name) =>{
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredients = (name) =>{
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const setIngredients = (ingredients)=>{
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredientName: ingredients
    }
}



export const fetchIngredientsFailed = ()=>{
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () =>{
    return dispatch =>{
        axios.get('https://burger-builder-e5fbc.firebaseio.com/ingredients.json')
            .then( res=>{
                dispatch(setIngredients(res.data));
            })
            .catch( error=>{
                fetchIngredientsFailed();
            });
    }
}