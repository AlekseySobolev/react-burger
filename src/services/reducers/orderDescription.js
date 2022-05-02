import { GET_OREDERDESCRIPTION_REQUEST, GET_OREDERDESCRIPTION_SUCCESS, GET_INGREDIENTS_ERROR } from '../actions/ingredients';

const orderDescriptionInitialState = {
    orderDescription: [],
    orderDescriptionRequest: false,
    orderDescriptionFailed: false,
}

export const ingredientsReducer = (state = orderDescriptionInitialState, action) =>{
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
          return {
            ...state,
            orderDescriptionRequest: true
          };
        }
        case GET_INGREDIENTS_SUCCESS: {
          return { ...state, orderDescriptionFailed: false, orderDescription: action.orderDescription, orderDescriptionRequest: false };
        }
        case GET_INGREDIENTS_ERROR: {
          return { ...state, orderDescriptionFailed: true, orderDescriptionRequest: false };
        }
        default:
          return state
        
    }
}

