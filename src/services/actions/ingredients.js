import { baseUrl } from "../../utils/constants";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_ERROR = "GET_INGREDIENTS_ERROR";

const ingredientsUrl = baseUrl + "/ingredients";

const checkResponse = (response) => {
  if (!response.ok) {
    throw new Error("Error occurred!")
  }
  return response.json()

}

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
