import { SET_CLICKED_ORDER, REMOVE_CLICKED_ORDER } from "../actions/userOrderDescription";

const userOrderDescriptionInitialState = {
  userOrderDescription: null
}

export const userOrderDescriptionReducer = (state = userOrderDescriptionInitialState, action) =>{
    switch (action.type) {
       
        case SET_CLICKED_ORDER: {
          return { ...state, userOrderDescription: action.userOrderDescription };
        }
        case REMOVE_CLICKED_ORDER: {
          return { ...state, userOrderDescription: null };
        }
        default:
          return state
        
    }
}

