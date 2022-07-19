import { baseUrl } from "../../utils/constants";
import { v4 as uuidv4 } from 'uuid';
import { checkResponse } from "../../utils/functions";
import { TIngredientDescription, TIngredientDescriptionWithUuid } from "../types/data";
import { AppThunk, AppDispatch } from "../types";

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_ERROR: 'GET_INGREDIENTS_ERROR' = "GET_INGREDIENTS_ERROR";
export const ADD_INGREDIENT: 'ADD_INGREDIENT' = "ADD_INGREDIENT";
export const DEL_INGREDIENT: 'DEL_INGREDIENT' = "DEL_INGREDIENT";
export const INCREASE_QTY: 'INCREASE_QTY' = "INCREASE_QTY";
export const DECREASE_QTY: 'DECREASE_QTY' = "DECREASE_QTY";
export const CHANGE_POSITION: 'CHANGE_POSITION' = "CHANGE_POSITION";

export interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredients: TIngredientDescription[]
}

export interface IGetIngredientsErrorAction {
  readonly type: typeof GET_INGREDIENTS_ERROR;
}

export interface IAddIngredientAction {
  readonly type: typeof ADD_INGREDIENT;
  readonly ingredientWithUuid: TIngredientDescriptionWithUuid
}

export interface IDelIngredientAction {
  readonly type: typeof DEL_INGREDIENT;
  readonly uuid: string;
}

export interface IIncreaseQtyAction {
  readonly type: typeof INCREASE_QTY;
  readonly id: string;
}

export interface IDecreaseQtyAction {
  readonly type: typeof DECREASE_QTY;
  readonly id: string;
}

export interface IChangePositionAction {
  readonly type: typeof CHANGE_POSITION;
  readonly payload: { 
    dragIndex: number, 
    dropIndex: number 
  }
}

export type TIngredientsActions =
  | IGetIngredientsRequestAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsErrorAction
  | IAddIngredientAction
  | IDelIngredientAction
  | IIncreaseQtyAction
  | IDecreaseQtyAction
  | IChangePositionAction;



interface IAddIngredientToConstructor {
  readonly type: typeof ADD_INGREDIENT;

  ingredientWithUuid: {
    ingredient?: TIngredientDescription,
    uuid: string
  }
 
}

interface IChangeIngredientPosition {
  readonly type: typeof CHANGE_POSITION;
  payload: {
    dragIndex: number,
    dropIndex: number
  }
}

const getIngredientsRequest = (): IGetIngredientsRequestAction => ({
  type:  GET_INGREDIENTS_REQUEST
})

const getIngredientsSuccess = (ingredients: TIngredientDescription[]): IGetIngredientsSuccessAction => ({
  type:  GET_INGREDIENTS_SUCCESS,
  ingredients
})

const getIngredientsError = (): IGetIngredientsErrorAction => ({
  type:  GET_INGREDIENTS_ERROR
})

export const addIngredientToConstructor = (ingredient: TIngredientDescription): IAddIngredientToConstructor => ({
  type: ADD_INGREDIENT,
  ingredientWithUuid: {
    ...ingredient,
    uuid: uuidv4()
  }
});

export const changeIngredientPosition = (dragIndex: number, dropIndex: number): IChangeIngredientPosition => ({
  type: CHANGE_POSITION,
  payload: { 
    dragIndex: dragIndex,
    dropIndex: dropIndex 
    }
});

const ingredientsUrl = baseUrl + "/ingredients";

export const getIngredients: AppThunk = () => (dispatch: AppDispatch) => {

    dispatch(getIngredientsRequest());
    fetch(ingredientsUrl)
      .then(checkResponse)
      .then(res => {
        if (res && res.success) {
          dispatch(getIngredientsSuccess(res.data));
        } else {
          dispatch(getIngredientsError());
        }
      }).catch(err => {
        dispatch(getIngredientsError());
      })
}
