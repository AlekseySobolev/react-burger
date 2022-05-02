import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_OREDERDESCRIPTION_ERROR } from '../actions/orderDescription';

const ingredientsInitialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
}

export const ingredientsReducer = (state = ingredientsInitialState, action) =>{
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
          return {
            ...state,
            ingredientsRequest: true
          };
        }
        case GET_INGREDIENTS_SUCCESS: {
          return { ...state, ingredientsFailed: false, ingredients: action.ingredients, ingredientsRequest: false };
        }
        case GET_INGREDIENTS_ERROR: {
          return { ...state, ingredientsFailed: true, ingredientsRequest: false };
        }
        default:
          return state
        
    }
}

