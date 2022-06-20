import { SEND_EDIT_USER_ERROR, SEND_USER_ORDER_REQUEST, SEND_USER_ORDER_SUCCESS } from "../actions/auth";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_SUCCESS, WS_ON_MESSAGE } from "../actions/wsActionTypes";

const feedInitialState = {
    orders: [],
    userOrderInfo: null,
    wsConnected: false,
    error:false
}


export const feedReducer = (state = feedInitialState, action) => {
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
              case SEND_EDIT_USER_ERROR: {
                return { ...state, userFailed: true, userRequest: false };
              }

        default:
            return state

    }
}