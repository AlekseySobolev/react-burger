import { GET_REGISTER_REQUEST, GET_REGISTER_SUCCESS, GET_REGISTER_ERROR,
GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_ERROR,
GET_EDIT_USER_REQUEST, GET_EDIT_USER_SUCCESS, GET_EDIT_USER_ERROR,
GET_LOGIN_REQUEST, GET_LOGIN_SUCCESS, GET_LOGIN_ERROR,
GET_LOGOUT_REQUEST,GET_LOGOUT_SUCCESS, GET_LOGOUT_ERROR,
GET_FORGOT_PASSWORD_REQUEST, GET_FORGOT_PASSWORD_SUCCESS, GET_FORGOT_PASSWORD_ERROR,
GET_RESET_PASSWORD_REQUEST, GET_RESET_PASSWORD_SUCCESS, GET_RESET_PASSWORD_ERROR,
GET_REFRESH_TOKEN_REQUEST, GET_REFRESH_TOKEN_SUCCESS, GET_REFRESH_TOKEN_ERROR } from "../actions/auth"

const userInitialState = {
    user: null,
    password: null,
    throughForgotPassword: false,
    accessToken: null,
    refreshToken: null,
    isAuth: false,
    isAnon:true,
    userRequest: false,
    userFailed: false
}

export const authReducer = (state = userInitialState, action) =>{
    switch (action.type) {
        case GET_REGISTER_REQUEST: {
          return {
            ...state,
            userRequest: true
          };
        }
        case GET_REGISTER_SUCCESS: {
          return { ...state, userFailed: false, user: action.user, accessToken: action.accessToken, refreshToken: action.refreshToken, userRequest: false };
        }
        case GET_REGISTER_ERROR: {
          return { ...state, userFailed: true, userRequest: false };
        }

        case GET_USER_REQUEST: {
          return {
            ...state,
            userRequest: true
          };
        }
        case GET_USER_SUCCESS: {
          return { ...state, userFailed: false, user: action.user, isAuth: true, isAnon: false, userRequest: false };
        }
        case GET_USER_ERROR: {
          return { ...state, userFailed: true, userRequest: false, isAnon: true };
        }

        case GET_EDIT_USER_REQUEST: {
          return {
            ...state,
            userRequest: true
          };
        }
        case GET_EDIT_USER_SUCCESS: {
          return { ...state, userFailed: false, user: action.user, isAuth: true, userRequest: false };
        }
        case GET_EDIT_USER_ERROR: {
          return { ...state, userFailed: true, userRequest: false };
        }

        case GET_LOGIN_REQUEST: {
          return {
            ...state,
            userRequest: true
          };
        }
        case GET_LOGIN_SUCCESS: {
          return { ...state, userFailed: false, user: action.user, password: action.password, isAuth: true,  isAnon: false, accessToken: action.accessToken, refreshToken: action.refreshToken, userRequest: false };
        }
        case GET_LOGIN_ERROR: {
          return { ...state, userFailed: true, userRequest: false };
        }

        case GET_LOGOUT_REQUEST: {
          return {
            ...state,
            userRequest: true
          };
        }
        case GET_LOGOUT_SUCCESS: {
          return { ...state, userFailed: false, user: null, password: null, isAuth: false, accessToken: null, refreshToken: null, userRequest: false, isAnon: true };
        }
        case GET_LOGOUT_ERROR: {
          return { ...state, userFailed: true, userRequest: false };
        }

        case GET_FORGOT_PASSWORD_REQUEST: {
          return {
            ...state,
            userRequest: true
          };
        }
        case GET_FORGOT_PASSWORD_SUCCESS: {
          return { ...state, userFailed: false, userRequest: false, throughForgotPassword:true};
        }
        case GET_FORGOT_PASSWORD_ERROR: {
          return { ...state, userFailed: true, userRequest: false };
        }

        case GET_RESET_PASSWORD_REQUEST: {
          return {
            ...state,
            userRequest: true
          };
        }
        case GET_RESET_PASSWORD_SUCCESS: {
          return { ...state, userFailed: false, userRequest: false, throughForgotPassword:false};
        }
        case GET_RESET_PASSWORD_ERROR: {
          return { ...state, userFailed: true, userRequest: false };
        }

        case GET_REFRESH_TOKEN_REQUEST: {
          return {
            ...state
          };
        }
        case GET_REFRESH_TOKEN_SUCCESS: {
          return { ...state, userFailed: false, accessToken: action.accessToken };
        }
        case GET_REFRESH_TOKEN_ERROR: {
          return { ...state, userFailed: true};
        }

        default:
          return state
        
    }
}
