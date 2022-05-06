import { GET_OREDERDESCRIPTION_REQUEST, GET_OREDERDESCRIPTION_SUCCESS, GET_OREDERDESCRIPTION_ERROR } from '../actions/orderDescription';

const orderDescriptionInitialState = {
    orderDescription: [],
    orderDescriptionRequest: false,
    orderDescriptionFailed: false,
}

export const orderDescriptionReducer = (state = orderDescriptionInitialState, action) =>{
    switch (action.type) {
        case GET_OREDERDESCRIPTION_REQUEST: {
          return {
            ...state,
            orderDescriptionRequest: true
          };
        }
        case GET_OREDERDESCRIPTION_SUCCESS: {
          return { ...state, orderDescriptionFailed: false, orderDescription: action.orderDescription, orderDescriptionRequest: false };
        }
        case GET_OREDERDESCRIPTION_ERROR: {
          return { ...state, orderDescriptionFailed: true, orderDescriptionRequest: false };
        }
        default:
          return state
        
    }
}

