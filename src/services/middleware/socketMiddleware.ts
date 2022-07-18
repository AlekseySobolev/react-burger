import { MiddlewareAPI } from 'redux';
import { IWsActions } from '../../services/store'
import { AppDispatch, RootState } from '../types';

export const socketMiddleware = (wsActions: IWsActions) => (store: MiddlewareAPI<AppDispatch, RootState>) => {

      let socket: WebSocket | null = null;
  
      return next => action => {

        const { dispatch } = store;
        const { type, payload } = action;
        const {wsInit, onOpen, onClose, onError, onMessage } = wsActions;

        if (type === wsInit) {
          
          if(payload.token){
            socket = new WebSocket(`${payload.wsUrl}?token=${payload.token.replace("Bearer ", "")}`);
          }
          else{
            socket = new WebSocket(`${payload.wsUrl}`);
          }
          
          socket.onopen = (event) => {
            dispatch({ type: onOpen, payload: event });

          };

          socket.onerror = (event) => {
            dispatch({ type: onError, payload: event });
          };

          socket.onclose = (event) => {
            dispatch({ type: onClose, payload: event });
            
          };

          socket.onmessage = (event) => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            const { success, ...restParsedData } = parsedData;
  
            dispatch({ type: onMessage, payload: restParsedData });
          };

        }

        if (socket && type === onClose) {
          socket.close(1000);
        }
  
        next(action);
      };

  };