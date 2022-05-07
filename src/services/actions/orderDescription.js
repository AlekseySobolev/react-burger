import { baseUrl } from "../../utils/constants";
import { checkResponse } from "../../utils/functions";

export const GET_OREDERDESCRIPTION_REQUEST = "GET_OREDERDESCRIPTION_REQUEST";
export const GET_OREDERDESCRIPTION_SUCCESS = "GET_OREDERDESCRIPTION_SUCCESS";
export const GET_OREDERDESCRIPTION_ERROR = "GET_OREDERDESCRIPTION_ERROR";

const orderNumberUrl = baseUrl + "/orders";

export function getOrderDescription(idBurgersElement) {

    return function(dispatch) {
      dispatch({
        type: GET_OREDERDESCRIPTION_REQUEST
      });
     fetch(orderNumberUrl, {
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
            type: GET_OREDERDESCRIPTION_SUCCESS,
            orderDescription: res
          });
        } else {
          dispatch({
            type: GET_OREDERDESCRIPTION_ERROR
          });
        }
      }).catch(err =>{
        console.log(`Error: ${err}`);
      })
    };
    
  }
