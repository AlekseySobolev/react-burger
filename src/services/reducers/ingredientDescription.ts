import { SET_INGREDIENT_DESCRIPTION, REMOVE_INGREDIENT_DESCRIPTION, TIngredientDescriptionActions} from '../actions/ingredientDescription';
import type { TIngredientDescription } from '../types/data';

export type TIngredientDescriptionState ={
  ingredientDescription: TIngredientDescription | null;
};


const ingredientDescriptionInitialState: TIngredientDescriptionState = {
    ingredientDescription: null,
}

export const ingredientDescriptionReducer = (state = ingredientDescriptionInitialState, action:TIngredientDescriptionActions): TIngredientDescriptionState => {
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

