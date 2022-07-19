import { GET_OREDERDESCRIPTION_REQUEST, GET_OREDERDESCRIPTION_SUCCESS, GET_OREDERDESCRIPTION_ERROR } from '../actions/orderDescription';
import { TOrderDescription } from '../types/data';
import { TOrderDescriptionActions } from '../actions/orderDescription';

export type TOrderDescriptionState = {
  orderDescription: TOrderDescription | null;
  orderDescriptionRequest: boolean;
  orderDescriptionFailed: boolean;
}

const orderDescriptionInitialState: TOrderDescriptionState = {
    orderDescription: null,
    orderDescriptionRequest: false,
    orderDescriptionFailed: false,
}

export const orderDescriptionReducer = (state = orderDescriptionInitialState, action: TOrderDescriptionActions): TOrderDescriptionState => {
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

