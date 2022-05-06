import { baseUrl } from "../../utils/constants";
import { v4 as uuidv4 } from 'uuid';
import { checkResponse } from "../../utils/functions";
export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_ERROR = "GET_INGREDIENTS_ERROR";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const DEL_INGREDIENT = "DEL_INGREDIENT";
export const INCREASE_QTY = "INCREASE_QTY";
export const DECREASE_QTY = "DECREASE_QTY";
export const CHANGE_POSITION = "CHANGE_POSITION";

const ingredientsUrl = baseUrl + "/ingredients";


export const addIngredientToConstructor = (ingredient) => ({
      type: ADD_INGREDIENT,
      ingredientWithUuid: {
        ...ingredient,
        uuid: uuidv4()
      } 
    });

    export const changeIngredientPosition = (dragIndex, dropIndex) => ({
      type: CHANGE_POSITION,
      payload:{dragIndex: dragIndex, dropIndex: dropIndex}
    });

export function getIngredients() {

    return function(dispatch) {
      dispatch({
        type: GET_INGREDIENTS_REQUEST
      });
     fetch(ingredientsUrl)
     .then(checkResponse)
     .then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            ingredients: res.data
          });
        } else {
          dispatch({
            type: GET_INGREDIENTS_ERROR,
          });
        }
      })
    };
    
  }
