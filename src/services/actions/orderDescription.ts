import { baseUrl } from "../../utils/constants";
import { checkResponse, getCookie } from "../../utils/functions";
import { TOrderDescription } from "../types/data";
import { AppThunk, AppDispatch } from "../types";

const orderNumberUrl = baseUrl + "/orders";

const requestHeaders: any =  {
  'Content-Type': 'application/json',
  Authorization:  getCookie('accessToken')
};

export const GET_OREDERDESCRIPTION_REQUEST: 'GET_OREDERDESCRIPTION_REQUEST' = "GET_OREDERDESCRIPTION_REQUEST";
export const GET_OREDERDESCRIPTION_SUCCESS: 'GET_OREDERDESCRIPTION_SUCCESS' = "GET_OREDERDESCRIPTION_SUCCESS";
export const GET_OREDERDESCRIPTION_ERROR: 'GET_OREDERDESCRIPTION_ERROR' = "GET_OREDERDESCRIPTION_ERROR";

export interface IGetOrderDescriptionRequestAction {
  readonly type: typeof GET_OREDERDESCRIPTION_REQUEST;
}

export interface IGetOrderDescriptionSuccessAction {
  readonly type: typeof GET_OREDERDESCRIPTION_SUCCESS;
  readonly orderDescription: TOrderDescription | null;
}

export interface IGetOrderDescriptionErrorAction {
  readonly type: typeof GET_OREDERDESCRIPTION_ERROR;
}

export type TOrderDescriptionActions =
| IGetOrderDescriptionRequestAction
| IGetOrderDescriptionSuccessAction
| IGetOrderDescriptionErrorAction;


 export const getOrderDescriptionRequest = (): IGetOrderDescriptionRequestAction => ({
  type: GET_OREDERDESCRIPTION_REQUEST
 })

 export const getOrderDescriptionSuccess = (orderDescription: TOrderDescription): IGetOrderDescriptionSuccessAction => ({
    type: GET_OREDERDESCRIPTION_SUCCESS,
    orderDescription
 })

 export const getOrderDescriptionError = (): IGetOrderDescriptionErrorAction => ({
  type: GET_OREDERDESCRIPTION_ERROR
 })


const fetchOrderDescription = async (idBurgersElement: string) => 

  await fetch(orderNumberUrl, {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify({
      ingredients: idBurgersElement
    })

 })

export const getOrderDescription: AppThunk = (idBurgersElement: string) => (dispatch: AppDispatch) => {

      dispatch(getOrderDescriptionRequest());

      fetchOrderDescription(idBurgersElement)
     .then(checkResponse)
     .then(res => {
        if (res && res.success) {
          dispatch(getOrderDescriptionSuccess(res));
        } else {
          dispatch(getOrderDescriptionError());
        }
      }).catch(err =>{
        dispatch(getOrderDescriptionError());
      })
    };
    
  
