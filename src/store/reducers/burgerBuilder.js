import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initalState = {
    ingredients:null,
    totalPrice:3,
    error:false,
    building: false
}

const INGREDIENT_PRICE = {
    salad:1,
    bacon:1.5,
    cheese:1.2,
    meat:2
}

const addIngredient = (state,action) =>{
    const updatedIngredient = { [action.ingredientName] : state.ingredients[action.ingredientName] + 1 }
    const updatedIngredients = updateObject(state.ingredients,updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice:state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
        building: true
    };
    return updateObject(state,updatedState);
}

const removeIngredient =(state,action) =>{
    const removeIngredient = { [action.ingredientName] : state.ingredients[action.ingredientName] - 1 }
    const removeIngredients = updateObject(state.ingredients,removeIngredient);
    const removedState = {
        ingredients: removeIngredients,
        totalPrice:state.totalPrice - INGREDIENT_PRICE[action.ingredientName],
        building: true
    }
    return updateObject(state,removedState);
}

const setIngeedient = (state,action) =>{
    return updateObject(state,{
        ingredients: {
            salad: action.ingredientName.salad,
            cheese: action.ingredientName.cheese,
            bacon: action.ingredientName.bacon,
            meat: action.ingredientName.meat
            },
            totalPrice:3,
            error: false,
            building: false
    });
}


const reducer = (state=initalState,action) =>{
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state,action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state,action);
        case actionTypes.SET_INGREDIENTS: return setIngeedient(state,action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return updateObject(state,{error: true});

        default:
            return state;
    }
}

export default reducer;