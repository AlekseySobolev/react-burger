import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_SUCCESS, WS_ON_MESSAGE } from "../actions/wsActionTypes";

import { TWsActions } from '../actions/wsActions';
import { TUserOrders } from "../types/data";

export type TUserOrderState = {
    orders:  TUserOrders[] | [],
    wsConnected: boolean,
    error: boolean
}

const userOrderInitialState: TUserOrderState = {
    orders: [],
    wsConnected: false,
    error:false
}


export const userOrdersReducer = (state = userOrderInitialState, action: TWsActions): TUserOrderState => {
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

        default:
            return state

    }
}