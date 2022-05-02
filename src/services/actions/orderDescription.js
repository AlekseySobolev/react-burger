import { baseUrl } from "../../utils/constants";

export const GET_OREDERDESCRIPTION_REQUEST = "GET_OREDERDESCRIPTION_REQUEST";
export const GET_OREDERDESCRIPTION_SUCCESS = "GET_OREDERDESCRIPTION_SUCCESS";
export const GET_OREDERDESCRIPTION_ERROR = "GET_OREDERDESCRIPTION_ERROR";

const ingredientsUrl = baseUrl + "/orders";

const checkResponse = (response) => {
  if (!response.ok) {
    throw new Error("Error occurred!")
  }
  return response.json()

}

export function getIngredients(idBurgersElement) {

    return function(dispatch) {
      dispatch({
        type: GET_OREDERDESCRIPTION_REQUEST
      });
     fetch(ingredientsUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ingredients: idBurgersElement
        })
     })
     .then(checkResponse)
     .then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_OREDERDESCRIPTION_ERROR,
            ingredients: res.data
          });
        } else {
          dispatch({
            type: GET_OREDERDESCRIPTION_ERROR,
          });
        }
      })
    };
    
  }
