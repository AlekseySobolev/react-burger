
import { SEND_USER_ORDER_ERROR, SEND_USER_ORDER_REQUEST, SEND_USER_ORDER_SUCCESS } from "../actions/auth";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_SUCCESS, WS_ON_MESSAGE } from "../actions/wsActionTypes";
import { TUserOrderDescription, TUserOrders } from "../types/data";

import { IWsStartConnectionAction, IWsCloseConnectionAction,  IWsConnectionErrorAction, IWsConnectionSuccessAction, IWsOnMessageAction} from "../actions/wsActions";
import { ISendUserOrderRequestAction, ISendUserOrderSuccessAction,  ISendUserOrderErrorAction} from "../actions/auth";

export type TFeedActions =
| IWsStartConnectionAction
| IWsCloseConnectionAction
| IWsConnectionErrorAction
| IWsConnectionSuccessAction
| IWsOnMessageAction
| ISendUserOrderRequestAction
| ISendUserOrderSuccessAction
| ISendUserOrderErrorAction;

export type TFeedState = {
    orders: TUserOrders[] | [],
    userOrderInfo: TUserOrderDescription[] | null,
    isAuth: boolean,
    userRequest: boolean,
    userFailed: boolean,
    wsConnected: boolean,
    error: boolean
}

const feedInitialState: TFeedState = {
    orders: [],
    userOrderInfo: null,
    isAuth: false,
    userRequest: false,
    userFailed: false,
    wsConnected: false,
    error: false
}


export const feedReducer = (state = feedInitialState, action: TFeedActions ): TFeedState  => {
    switch (action.type) {

        case WS_ON_MESSAGE:
            return {
                ...state,
                orders: action.payload,
                wsConnected: true
            };

        case WS_CONNECTION_ERROR:
            return {
                ...state,
                wsConnected: false
            };
        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                wsConnected: true
            };

        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                orders: [],
                wsConnected: false
            };

            case SEND_USER_ORDER_REQUEST: {
                return {
                  ...state,
                  userRequest: true
                };
              }
              case SEND_USER_ORDER_SUCCESS: {
                return { ...state, userFailed: false, userOrderInfo: action.userOrderInfo, isAuth: true, userRequest: false };
              }
              case SEND_USER_ORDER_ERROR: {
                return { ...state, userFailed: true, userRequest: false };
              }

        default:
            return state

    }
}