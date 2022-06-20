import {
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_START
  } from './wsActionTypes';
  
  export const wsStartConnection = (url) => {
    return {
      type: WS_CONNECTION_START,
      payload: url
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
  
  