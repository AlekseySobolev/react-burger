import { compose,  applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers/rootReducer';
import { legacy_createStore as createStore } from 'redux';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_ON_MESSAGE } from './actions/wsActionTypes';
import { socketMiddleware } from './middleware/socketMiddleware';
const wsActions = {
  wsInit: WS_CONNECTION_START,
  onClose: WS_CONNECTION_CLOSED,
  onOpen: WS_CONNECTION_SUCCESS,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_ON_MESSAGE,
};

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk), applyMiddleware(socketMiddleware(wsActions)));

export const store = createStore(rootReducer, enhancer);
