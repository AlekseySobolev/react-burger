import { combineReducers } from 'redux';
import { ingredientsReducer } from "./ingredients";
import { orderDescriptionReducer } from './orderDescription';
import { ingredientDescriptionReducer } from './ingredientDescription';


export const rootReducer = combineReducers({
    burgerIngredients: ingredientsReducer,
    orderDescription: orderDescriptionReducer,
    ingredientDescription: ingredientDescriptionReducer,
});