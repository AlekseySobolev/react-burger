import { ThunkAction } from 'redux-thunk';
import { ActionCreator } from 'redux';
import { TIngredientDescriptionActions } from '../actions/ingredientDescription';
import { TOrderDescriptionActions } from '../actions/orderDescription';
import { TUserOrderDescriptionActions } from '../actions/userOrderDescription';
import { TIngredientsActions } from '../actions/ingredients';
import { TWsActions } from '../actions/wsActions';
import {rootReducer} from '../reducers/rootReducer';
import { TAuthActions } from '../actions/auth';
import { Dispatch } from 'react';

type TApplicationActions =
  | TAuthActions
  | TIngredientDescriptionActions
  | TIngredientsActions
  | TOrderDescriptionActions
  | TUserOrderDescriptionActions
  | TWsActions;
  
  export type RootState = ReturnType<typeof rootReducer>;
  export type AppDispatch = Dispatch<TApplicationActions>;

export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, RootState, unknown, TApplicationActions>
>;
