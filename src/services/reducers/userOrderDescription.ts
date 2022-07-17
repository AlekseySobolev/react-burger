import { SET_CLICKED_ORDER, REMOVE_CLICKED_ORDER, TUserOrderDescriptionActions } from "../actions/userOrderDescription";
import { TUserOrderDescription } from "../types/data";

export type TUserOrderDescriptionState ={
  userOrderDescription: TUserOrderDescription | null;
};

const userOrderDescriptionInitialState: TUserOrderDescriptionState = {
  userOrderDescription: null
}

export const userOrderDescriptionReducer = (state = userOrderDescriptionInitialState, action: TUserOrderDescriptionActions): TUserOrderDescriptionState => {
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

