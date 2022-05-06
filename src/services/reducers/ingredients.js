import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_ERROR, INCREASE_QTY, ADD_INGREDIENT, DEL_INGREDIENT, DECREASE_QTY, CHANGE_POSITION } from '../actions/ingredients';

const ingredientsInitialState = {
  ingredients: [],
  constructorIngredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
}

export const ingredientsReducer = (state = ingredientsInitialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true
      }
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsFailed: false,
        ingredients: action.ingredients,
        ingredientsRequest: false
      }
    }
    case GET_INGREDIENTS_ERROR: {
      return {
        ...state,
        ingredientsFailed: true,
        ingredientsRequest: false
      }
    }
    case INCREASE_QTY: {
      return {
        ...state,
        ingredients: [...state.ingredients].map(item =>
          item._id === action.id ? { ...item, __v: ++item.__v } : item
        )
      }
    }
    case CHANGE_POSITION:{
      const constructorIngredientsArray = [...state.constructorIngredients];
      constructorIngredientsArray.splice(action.payload.dropIndex, 0, ...constructorIngredientsArray.splice(action.payload.dragIndex, 1))
      return{
        ...state,
        constructorIngredients:[...constructorIngredientsArray]
      }
    }
    case DECREASE_QTY: {
      return {
        ...state,
        ingredients: [...state.ingredients].map(item =>
          item._id === action.id ? { ...item, __v: --item.__v } : item
        )
      }
    }
    case ADD_INGREDIENT: {
      return {
        ...state,
        constructorIngredients: [...state.constructorIngredients, action.ingredientWithUuid]
      }
    }

    case DEL_INGREDIENT: {
      return {
        ...state,
        constructorIngredients: [...state.constructorIngredients].filter(ingredientWithUuid => ingredientWithUuid.uuid !== action.uuid)
      }
    }

    default:
      return state

  }
}

