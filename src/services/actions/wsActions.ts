import { TUserOrders } from '../types/data';
import {
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_ON_MESSAGE
} from './wsActionTypes';

export interface IWsStartConnectionAction {
  readonly type: typeof WS_CONNECTION_START;
  payload: {
    wsUrl: string;
    token?: string ;
  };
}

export interface IWsCloseConnectionAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWsConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
}

export interface IWsConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWsOnMessageAction {
  readonly type: typeof WS_ON_MESSAGE;
  payload: TUserOrders[]
}

export type TWsActions =
  | IWsStartConnectionAction
  | IWsCloseConnectionAction
  | IWsConnectionErrorAction
  | IWsConnectionSuccessAction
  | IWsOnMessageAction;

export const wsStartConnection = (url: { wsUrl: string, token?: string}) => {
  return {
    type: WS_CONNECTION_START,
    payload: {
      wsUrl: url.wsUrl,
      token: url.token
    }
  };
};

export const wsCloseConnection = () => {
  return {
    type: WS_CONNECTION_CLOSED
  };
};

export const wsConnectionError = () => {
  return {
    type: WS_CONNECTION_ERROR
  };
};

export const wsConnectionSuccess = () => {
  return {
    type: WS_CONNECTION_SUCCESS
  };
};

export const wsOnMesagge = (restParsedData: TUserOrders[]) => {
  return {
    type: WS_CONNECTION_START,
    payload: restParsedData
  }
};
