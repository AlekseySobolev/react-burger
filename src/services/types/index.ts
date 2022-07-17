import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { store } from '../store';
import { TIngredientDescriptionActions } from '../actions/ingredientDescription';
import { TOrderDescriptionActions } from '../actions/orderDescription';
import { TUserOrderDescriptionActions } from '../actions/userOrderDescription';
import { TIngredientsActions } from '../actions/ingredients';
import { TWsActions } from '../actions/wsActions';

type TApplicationActions =
  | TIngredientDescriptionActions
  | TIngredientsActions
  | TOrderDescriptionActions
  | TUserOrderDescriptionActions
  | TWsActions;
  

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, RootState, unknown, TApplicationActions>
>;