import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_SUCCESS, WS_ON_MESSAGE } from "../actions/wsActionTypes";

const feedInitialState = {
    orders: [],
    wsConnected: false,
    error:false
}


export const userOrdersReducer = (state = feedInitialState, action) => {
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