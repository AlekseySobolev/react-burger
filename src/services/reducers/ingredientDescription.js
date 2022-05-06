import { SET_INGREDIENT_DESCRIPTION, REMOVE_INGREDIENT_DESCRIPTION} from '../actions/ingredientDescription';

const ingredientDescriptionInitialState = {
    ingredientDescription: null,
}

export const ingredientDescriptionReducer = (state = ingredientDescriptionInitialState, action) =>{
    switch (action.type) {
       
        case SET_INGREDIENT_DESCRIPTION: {
          return { ...state, ingredientDescription: action.ingredientDescription };
        }
        case REMOVE_INGREDIENT_DESCRIPTION: {
          return { ...state, ingredientDescription: null };
        }
        default:
          return state
        
    }
}

