import { combineReducers } from 'redux';
import { ingredientsReducer } from "./ingredients";
import { orderDescriptionReducer } from './orderDescription';
import { ingredientDescriptionReducer } from './ingredientDescription';
import { authReducer } from './auth';
import { feedReducer } from './feed';
import { userOrdersReducer } from './userOrders';
import { userOrderDescriptionReducer } from './userOrderDescription';

export const rootReducer = combineReducers({
    burgerIngredients: ingredientsReducer,
    orderDescription: orderDescriptionReducer,
    ingredientDescription: ingredientDescriptionReducer,
    auth: authReducer,
    feed: feedReducer,
    userOrder: userOrdersReducer,
    userOrderDescription: userOrderDescriptionReducer
});