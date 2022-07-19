import { SEND_REGISTER_REQUEST, SEND_REGISTER_SUCCESS, SEND_REGISTER_ERROR,
SEND_USER_REQUEST, SEND_USER_SUCCESS, SEND_USER_ERROR,
SEND_EDIT_USER_REQUEST, SEND_EDIT_USER_SUCCESS, SEND_EDIT_USER_ERROR,
SEND_LOGIN_REQUEST, SEND_LOGIN_SUCCESS, SEND_LOGIN_ERROR,
SEND_LOGOUT_REQUEST,SEND_LOGOUT_SUCCESS, SEND_LOGOUT_ERROR,
SEND_FORGOT_PASSWORD_REQUEST, SEND_FORGOT_PASSWORD_SUCCESS, SEND_FORGOT_PASSWORD_ERROR,
SEND_RESET_PASSWORD_REQUEST, SEND_RESET_PASSWORD_SUCCESS, SEND_RESET_PASSWORD_ERROR,
SEND_REFRESH_TOKEN_REQUEST, SEND_REFRESH_TOKEN_SUCCESS, SEND_REFRESH_TOKEN_ERROR } from "../actions/auth"

import { TAuthActions } from "../actions/auth";
import { TUser } from "../types/data";

export type TUserState = {
  user: TUser | null,
  password: string,
  throughForgotPassword: boolean,
  accessToken?: string,
  refreshToken?: string,
  isAuth: boolean,
  isAnon: boolean,
  userRequest: boolean,
  userFailed: boolean
};

const userInitialState: TUserState = {
    user: null,
    password: "",
    throughForgotPassword: false,
    accessToken: undefined,
    refreshToken: undefined,
    isAuth: false,
    isAnon:true,
    userRequest: false,
    userFailed: false
}

export const authReducer = (state = userInitialState, action: TAuthActions): TUserState =>{
    switch (action.type) {
        case SEND_REGISTER_REQUEST: {
          return {
            ...state,
            userRequest: true
          };
        }
        case SEND_REGISTER_SUCCESS: {
          return { ...state, userFailed: false, user: action.user, accessToken: action.accessToken, refreshToken: action.refreshToken, userRequest: false };
        }
        case SEND_REGISTER_ERROR: {
          return { ...state, userFailed: true, userRequest: false };
        }

        case SEND_USER_REQUEST: {
          return {
            ...state,
            userRequest: true
          };
        }
        case SEND_USER_SUCCESS: {
          return { ...state, userFailed: false, user: action.user, isAuth: true, isAnon: false, userRequest: false };
        }
        case SEND_USER_ERROR: {
          return { ...state, userFailed: true, userRequest: false, isAnon: true };
        }

        case SEND_EDIT_USER_REQUEST: {
          return {
            ...state,
            userRequest: true
          };
        }
        case SEND_EDIT_USER_SUCCESS: {
          return { ...state, userFailed: false, user: action.user, isAuth: true, userRequest: false };
        }
        case SEND_EDIT_USER_ERROR: {
          return { ...state, userFailed: true, userRequest: false };
        }

        case SEND_LOGIN_REQUEST: {
          return {
            ...state,
            userRequest: true
          };
        }
        case SEND_LOGIN_SUCCESS: {
          return { ...state, userFailed: false, user: action.user, password: action.password, isAuth: true,  isAnon: false, accessToken: action.accessToken, refreshToken: action.refreshToken, userRequest: false };
        }
        case SEND_LOGIN_ERROR: {
          return { ...state, userFailed: true, userRequest: false };
        }

        case SEND_LOGOUT_REQUEST: {
          return {
            ...state,
            userRequest: true
          };
        }
        case SEND_LOGOUT_SUCCESS: {
          return { ...state, userFailed: false, user: null, password: "", isAuth: false, accessToken: undefined, refreshToken: undefined, userRequest: false, isAnon: true };
        }
        case SEND_LOGOUT_ERROR: {
          return { ...state, userFailed: true, userRequest: false };
        }

        case SEND_FORGOT_PASSWORD_REQUEST: {
          return {
            ...state,
            userRequest: true
          };
        }
        case SEND_FORGOT_PASSWORD_SUCCESS: {
          return { ...state, userFailed: false, userRequest: false, throughForgotPassword:true};
        }
        case SEND_FORGOT_PASSWORD_ERROR: {
          return { ...state, userFailed: true, userRequest: false };
        }

        case SEND_RESET_PASSWORD_REQUEST: {
          return {
            ...state,
            userRequest: true
          };
        }
        case SEND_RESET_PASSWORD_SUCCESS: {
          return { ...state, userFailed: false, userRequest: false, throughForgotPassword:false};
        }
        case SEND_RESET_PASSWORD_ERROR: {
          return { ...state, userFailed: true, userRequest: false };
        }

        case SEND_REFRESH_TOKEN_REQUEST: {
          return {
            ...state
          };
        }
        case SEND_REFRESH_TOKEN_SUCCESS: {
          return { ...state, userFailed: false, accessToken: action.accessToken };
        }
        case SEND_REFRESH_TOKEN_ERROR: {
          return { ...state, userFailed: true};
        }

        default:
          return state
        
    }
}
