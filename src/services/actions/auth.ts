//#region imports

import { baseUrl, authUrl, userOrderUrl } from "../../utils/constants";
import { checkResponse, deleteCookie } from "../../utils/functions";
import { getCookie, setCookie } from "../../utils/functions";
import { AppDispatch, AppThunk } from "../types";
import { TUser, TUserOrderDescription } from "../types/data";

//#endregion imports

//#region actions literal type

export const SEND_REGISTER_REQUEST: 'SEND_REGISTER_REQUEST' = "SEND_REGISTER_REQUEST";
export const SEND_REGISTER_SUCCESS: 'SEND_REGISTER_SUCCESS' = "SEND_REGISTER_SUCCESS";
export const SEND_REGISTER_ERROR: 'SEND_REGISTER_ERROR' = "SEND_REGISTER_ERROR";

export const SEND_USER_REQUEST: 'SEND_USER_REQUEST' = "SEND_USER_REQUEST";
export const SEND_USER_SUCCESS: 'SEND_USER_SUCCESS' = "SEND_USER_SUCCESS";
export const SEND_USER_ERROR: 'SEND_USER_ERROR' = "SEND_USER_ERROR";

export const SEND_EDIT_USER_REQUEST: 'SEND_EDIT_USER_REQUEST' = "SEND_EDIT_USER_REQUEST";
export const SEND_EDIT_USER_SUCCESS: 'SEND_EDIT_USER_SUCCESS' = "SEND_EDIT_USER_SUCCESS";
export const SEND_EDIT_USER_ERROR: 'SEND_EDIT_USER_ERROR' = "SEND_EDIT_USER_ERROR";

export const SEND_LOGIN_REQUEST: 'SEND_LOGIN_REQUEST' = "SEND_LOGIN_REQUEST";
export const SEND_LOGIN_SUCCESS: 'SEND_LOGIN_SUCCESS' = "SEND_LOGIN_SUCCESS";
export const SEND_LOGIN_ERROR: 'SEND_LOGIN_ERROR' = "SEND_LOGIN_ERROR";

export const SEND_FORGOT_PASSWORD_REQUEST: 'SEND_FORGOT_PASSWORD_REQUEST' = "SEND_FORGOT_PASSWORD_REQUEST";
export const SEND_FORGOT_PASSWORD_SUCCESS: 'SEND_FORGOT_PASSWORD_SUCCESS' = "SEND_FORGOT_PASSWORD_SUCCESS";
export const SEND_FORGOT_PASSWORD_ERROR: 'SEND_FORGOT_PASSWORD_ERROR' = "SEND_FORGOT_PASSWORD_ERROR";

export const SEND_RESET_PASSWORD_REQUEST: 'SEND_RESET_PASSWORD_REQUEST' = "SEND_RESET_PASSWORD_REQUEST";
export const SEND_RESET_PASSWORD_SUCCESS: 'SEND_RESET_PASSWORD_SUCCESS' = "SEND_RESET_PASSWORD_SUCCESS";
export const SEND_RESET_PASSWORD_ERROR: 'SEND_RESET_PASSWORD_ERROR' = "SEND_RESET_PASSWORD_ERROR";

export const SEND_REFRESH_TOKEN_REQUEST: 'SEND_REFRESH_TOKEN_REQUEST' = "SEND_REFRESH_TOKEN_REQUEST";
export const SEND_REFRESH_TOKEN_SUCCESS: 'SEND_REFRESH_TOKEN_SUCCESS' = "SEND_REFRESH_TOKEN_SUCCESS";
export const SEND_REFRESH_TOKEN_ERROR: 'SEND_REFRESH_TOKEN_ERROR' = "SEND_REFRESH_TOKEN_ERROR"

export const SEND_LOGOUT_REQUEST: 'SEND_LOGOUT_REQUEST' = "SEND_LOGOUT_REQUEST";
export const SEND_LOGOUT_SUCCESS: 'SEND_LOGOUT_SUCCESS' = "SEND_LOGOUT_SUCCESS";
export const SEND_LOGOUT_ERROR: 'SEND_LOGOUT_ERROR' = "SEND_LOGOUT_ERROR";

export const SEND_USER_ORDER_REQUEST: 'SEND_USER_ORDER_REQUEST' = "SEND_USER_ORDER_REQUEST";
export const SEND_USER_ORDER_SUCCESS: 'SEND_USER_ORDER_SUCCESS' = "SEND_USER_ORDER_SUCCESS";
export const SEND_USER_ORDER_ERROR: 'SEND_USER_ORDER_ERROR' = "SEND_USER_ORDER_ERROR";

//#endregion actions literal type

//#region interface actions

  //#region SEND_REGISTER
export interface ISendRegisterRequestAction {
  readonly type: typeof SEND_REGISTER_REQUEST;
}

export interface ISendRegisterSuccessAction {
  readonly type: typeof SEND_REGISTER_SUCCESS;
  user: TUser;
  accessToken?: string;
  refreshToken?: string;
}

export interface ISendRegisterErrorAction {
  readonly type: typeof SEND_REGISTER_ERROR;
}
  //#endregion SEND_REGISTER

  //#region SEND_USER
export interface ISendUserRequestAction {
  readonly type: typeof SEND_USER_REQUEST;
}

export interface ISendUserSuccessAction {
  readonly type: typeof SEND_USER_SUCCESS;
  user: TUser;
}

export interface ISendUserErrorAction {
  readonly type: typeof SEND_USER_ERROR;
}
  
  //#endregion SEND_USER

  //#region SEND_EDIT_USER
  export interface ISendEditUserRequestAction {
    readonly type: typeof SEND_EDIT_USER_REQUEST;
  }
  
  export interface ISendEditUserSuccessAction {
    readonly type: typeof SEND_EDIT_USER_SUCCESS;
    user: TUser;
    readonly password: string;
  }
  
  export interface ISendEditUserErrorAction {
    readonly type: typeof SEND_EDIT_USER_ERROR;
  }
  //#endregion SEND_EDIT_USER

  //#region SEND_LOGIN
export interface ISendLoginRequestAction {
  readonly type: typeof SEND_LOGIN_REQUEST;
}

export interface ISendLoginSuccessAction {
  readonly type: typeof SEND_LOGIN_SUCCESS;
  user: TUser;
  password: string;
  accessToken?: string;
  refreshToken?: string;
}

export interface ISendLoginErrorAction {
  readonly type: typeof SEND_LOGIN_ERROR;
}
  //#endregion SEND_LOGIN

  //#region SEND_FORGOT_PASSWORD
export interface ISendForgotPasswordRequestAction {
  readonly type: typeof SEND_FORGOT_PASSWORD_REQUEST;
}

export interface ISendForgotPasswordSuccessAction {
  readonly type: typeof SEND_FORGOT_PASSWORD_SUCCESS;
}

export interface ISendForgotPasswordErrorAction {
  readonly type: typeof SEND_FORGOT_PASSWORD_ERROR;
}
  //#endregion SEND_FORGOT_PASSWORD

   //#region SEND_RESET_PASSWORD
export interface ISendResetPasswordRequestAction {
  readonly type: typeof SEND_RESET_PASSWORD_REQUEST;
}

export interface ISendResetPasswordSuccessAction {
  readonly type: typeof SEND_RESET_PASSWORD_SUCCESS;
}

export interface ISendResetPasswordErrorAction {
  readonly type: typeof SEND_RESET_PASSWORD_ERROR;
}
  //#endregion SEND_RESET_PASSWORD

  //#region SEND_REFRESH_TOKEN
export interface ISendRefreshTokenRequestAction {
  readonly type: typeof SEND_REFRESH_TOKEN_REQUEST
}

export interface ISendRefreshTokenSuccessAction {
  readonly type: typeof SEND_REFRESH_TOKEN_SUCCESS;
  accessToken?: string;
}

export interface ISendRefreshTokenErrorAction {
  readonly type: typeof SEND_REFRESH_TOKEN_ERROR;
}
  //#endregion SEND_REFRESH_TOKEN

  //#region SEND_LOGOUT
export interface ISendLogoutRequestAction {
  readonly type: typeof SEND_LOGOUT_REQUEST
}

export interface ISendLogoutSuccessAction {
  readonly type: typeof SEND_LOGOUT_SUCCESS;
}

export interface ISendLogoutErrorAction {
  readonly type: typeof SEND_LOGOUT_ERROR;
}
  //#endregion SEND_LOGOUT

  //#region SEND_USER_ORDER
export interface ISendUserOrderRequestAction {
  readonly type: typeof SEND_USER_ORDER_REQUEST
}

export interface ISendUserOrderSuccessAction {
  readonly type: typeof SEND_USER_ORDER_SUCCESS;
  userOrderInfo: TUserOrderDescription[];

}

export interface ISendUserOrderErrorAction {
  readonly type: typeof SEND_USER_ORDER_ERROR;
}
  //#endregion SEND_USER_ORDER

//#endregion interface actions

//#region interface functions

  //#region SEND_REGISTER

export const getSendRegisterRequest = (): ISendRegisterRequestAction => ({
  type: SEND_REGISTER_REQUEST
})

export const getSendRegisterSuccess = (user: TUser, accessToken?: string, refreshToken?: string): ISendRegisterSuccessAction => ({
  type: SEND_REGISTER_SUCCESS,
  user,
  accessToken,
  refreshToken
})

export const getSendRegisterError = (): ISendRegisterErrorAction => ({
  type: SEND_REGISTER_ERROR
})

  //#endregion SEND_REGISTER

  //#region SEND_USER
export const getSendUserRequest = (): ISendUserRequestAction => ({
  type: SEND_USER_REQUEST
})

export const getSendUserSuccess = (user: TUser): ISendUserSuccessAction => ({
  type: SEND_USER_SUCCESS,
  user
})

export const getSendUserError = (): ISendUserErrorAction => ({
  type: SEND_USER_ERROR
})
  //#endregion SEND_USER

  //#region SEND_EDIT_USER
  export const getSendEditUserRequest = (): ISendEditUserRequestAction => ({
    type: SEND_EDIT_USER_REQUEST
  })
  
  export const getSendEditUserSuccess = (user: TUser, password: string): ISendEditUserSuccessAction => ({
    type: SEND_EDIT_USER_SUCCESS,
    user,
    password
  })
  
  export const getSendEditUserError = (): ISendEditUserErrorAction => ({
    type: SEND_EDIT_USER_ERROR
  })
  //#endregion SEND_EDIT_USER

  //#region SEND_LOGIN

export const getSendLoginRequest = (): ISendLoginRequestAction => ({
  type: SEND_LOGIN_REQUEST
})

export const getSendLoginSuccess = (user: TUser, password: string, accessToken?: string, refreshToken?: string): ISendLoginSuccessAction => ({
  type: SEND_LOGIN_SUCCESS,
  user,
  password,
  accessToken,
  refreshToken
})

export const getSendLoginError = (): ISendLoginErrorAction => ({
  type: SEND_LOGIN_ERROR
})
  //#endregion SEND_LOGIN

  //#region SEND_FORGOT_PASSWORD

export const getSendForgotPasswordRequest = (): ISendForgotPasswordRequestAction => ({
  type: SEND_FORGOT_PASSWORD_REQUEST
})

export const getSendForgotPasswordSuccess = (): ISendForgotPasswordSuccessAction => ({
  type: SEND_FORGOT_PASSWORD_SUCCESS
})

export const getSendForgotPasswordError = (): ISendForgotPasswordErrorAction => ({
  type: SEND_FORGOT_PASSWORD_ERROR
})
  //#endregion SEND_FORGOT_PASSWORD

  //#region SEND_RESET_PASSWORD

export const getSendResetPasswordRequest = (): ISendResetPasswordRequestAction => ({
  type: SEND_RESET_PASSWORD_REQUEST
})

export const getSendResetPasswordSuccess = (): ISendResetPasswordSuccessAction => ({
  type: SEND_RESET_PASSWORD_SUCCESS
})

export const getSendResetPasswordError = (): ISendResetPasswordErrorAction => ({
  type: SEND_RESET_PASSWORD_ERROR
})
  //#endregion SEND_RESET_PASSWORD

  //#region SEND_REFRESH_TOKEN

export const getSendRefreshTokenRequest = (): ISendRefreshTokenRequestAction => ({
  type: SEND_REFRESH_TOKEN_REQUEST
})

export const getSendRefreshTokenSuccess = (accessToken: string): ISendRefreshTokenSuccessAction => ({
  type: SEND_REFRESH_TOKEN_SUCCESS,
  accessToken
})

export const getSendRefreshTokendError = (): ISendRefreshTokenErrorAction => ({
  type: SEND_REFRESH_TOKEN_ERROR
})
  //#endregion SEND_REFRESH_TOKEN

  //#region SEND_LOGOUT

export const getSendLogoutRequest = (): ISendLogoutRequestAction => ({
  type: SEND_LOGOUT_REQUEST
})

export const getSendLogoutSuccess = (): ISendLogoutSuccessAction => ({
  type: SEND_LOGOUT_SUCCESS

})

export const getSendLogoutError = (): ISendLogoutErrorAction => ({
  type: SEND_LOGOUT_ERROR
})
  //#endregion SEND_LOGOUT

  //#region SEND_USER_ORDER

export const getSendUserOrderRequest = (): ISendUserOrderRequestAction => ({
  type: SEND_USER_ORDER_REQUEST
})

export const getSendUserOrderSuccess = (userOrderInfo: TUserOrderDescription[]): ISendUserOrderSuccessAction => ({
  type: SEND_USER_ORDER_SUCCESS,
  userOrderInfo
})

export const getSendUserOrderError = (): ISendUserOrderErrorAction => ({
  type: SEND_USER_ORDER_ERROR
})
  //#endregion SEND_USER_ORDER

//#endregion interface functions

//#region All interface actions

export type TAuthActions =
  | ISendRegisterRequestAction
  | ISendRegisterSuccessAction
  | ISendRegisterErrorAction
  | ISendUserRequestAction
  | ISendUserSuccessAction
  | ISendUserErrorAction
  | ISendEditUserRequestAction
  | ISendEditUserSuccessAction
  | ISendEditUserErrorAction
  | ISendLoginRequestAction
  | ISendLoginSuccessAction
  | ISendLoginErrorAction
  | ISendForgotPasswordRequestAction
  | ISendForgotPasswordSuccessAction
  | ISendForgotPasswordErrorAction
  | ISendResetPasswordRequestAction
  | ISendResetPasswordSuccessAction
  | ISendResetPasswordErrorAction
  | ISendRefreshTokenRequestAction
  | ISendRefreshTokenSuccessAction
  | ISendRefreshTokenErrorAction
  | ISendLogoutRequestAction
  | ISendLogoutSuccessAction
  | ISendLogoutErrorAction
  | ISendUserOrderRequestAction
  | ISendUserOrderSuccessAction
  | ISendUserOrderErrorAction
  ;

//#endregion All interface actions

//#region thunk functions

const requestHeaders: any = {
  'Content-Type': 'application/json; charset=UTF-8',
  Authorization: getCookie('accessToken')
};

  //#region SEND_REGISTER
const fetchRegisterRequest = async (name: string, email: string, password: string) =>
  await fetch(`${authUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      "email": email,
      "password": password,
      "name": name
    })
  })

export const getRegisterRequest: AppThunk = (form: { name: string, email: string, password: string }, redirect: () => void) => (dispatch: AppDispatch) => {

  dispatch(getSendRegisterRequest());
  fetchRegisterRequest(form.name, form.email, form.password)
    .then(checkResponse)
    .then(res => {
      if (res && res.success) {
        setCookie('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        dispatch(getSendRegisterSuccess(res.user, res.accessToken, res.refreshToken));
        if (redirect) redirect();
      } else {
        dispatch(getSendRegisterError());
      }
    }).catch(err => {
      dispatch(getSendRegisterError());
    })
};
  //#endregion SEND_REGISTER

  //#region SEND_USER
const fetchUserRequest = async () =>
  await fetch(`${authUrl}/user`, {
    method: 'GET',
    headers: requestHeaders
  })

export const getUserRequest: AppThunk = () => (dispatch: AppDispatch) => {

  dispatch(getSendUserRequest());

  fetchUserRequest()
    .then(checkResponse)
    .then(res => {
      if (res && res.success) {
        dispatch(getSendUserSuccess(res.user));
      } else {
        deleteCookie("accessToken");
        dispatch(getSendUserError());
      }
    }).catch(err => {
      dispatch(getSendUserError());
    })
}
  //#endregion SEND_USER

  //#region SEND_EDIT_USER
  const fetchEditUserRequest = async (name: string, email: string, password: string) =>

  await  fetch(`${authUrl}/user`, {
    method: 'PATCH',
    headers: requestHeaders,
    body: JSON.stringify({
      "email": email,
      "password": password,
      "name": name
    })
  })

export const getEditUserRequest: AppThunk = (form:{ name:string, email:string, password:string }) => (dispatch: AppDispatch) => {

  // return function (dispatch) {
  //   dispatch({
  //     type: SEND_REGISTER_REQUEST
  //   });
    dispatch(getSendEditUserRequest());
    // fetch(`${authUrl}/user`, {
    //   method: 'PATCH',
    //   headers: requestHeaders,
    //   body: JSON.stringify({
    //     "email": email,
    //     "password": password,
    //     "name": name
    //   })
    // })
      fetchEditUserRequest(form.name, form.email, form.password)
      .then(checkResponse)
      .then(res => {
        if (res && res.success) {
          dispatch(getSendEditUserSuccess(res.user, form.password));
          // dispatch({
          //   type: SEND_EDIT_USER_SUCCESS,
          //   user: res.user,
          //   password: password
          // });
        } else {
          deleteCookie("accessToken");
          dispatch(getSendEditUserError());
          // dispatch({
          //   type: SEND_EDIT_USER_ERROR
          // });
        }
      }).catch(err => {
        // dispatch({
        //   type: SEND_EDIT_USER_ERROR
        // });
      })
}
  //#endregion SEND_EDIT_USER

  //#region  SEND_LOGIN
  const fetchLoginRequest = async (email: string, password: string) =>

  await fetch(`${authUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      "email": email,
      "password": password
    })
  })
 
export const getLoginRequest: AppThunk = (form:{ email:string, password:string }, redirect: ()=> void) => (dispatch: AppDispatch) =>  {

    dispatch(getSendLoginRequest());
      fetchLoginRequest(form.email, form.password)
      .then(checkResponse)
      .then(res => {
        if (res && res.success) {
          setCookie('accessToken', res.accessToken);
          localStorage.setItem('refreshToken', res.refreshToken);
          dispatch(getSendLoginSuccess(res.user, form.password, res.accessToken, res.refreshToken))
          if (redirect) redirect();
        } else {
          dispatch(getSendLoginError());
        }
      }).catch(err => {
        dispatch(getSendLoginError());
      })
}
  //#endregion SEND_LOGIN

  //#region  SEND_FORGOT_PASSWORD

  const fetchForgotPasswordRequest = async (email: string) =>

  fetch(`${baseUrl}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      "email": email
    })
  })

export const getForgotPasswordRequest: AppThunk = (form:{ email: string }, redirect: ()=> void) => (dispatch:AppDispatch) => {

  dispatch(getSendForgotPasswordRequest());
 
    fetchForgotPasswordRequest(form.email)
      .then(checkResponse)
      .then(res => {
        if (res && res.success) {
          dispatch(getSendForgotPasswordSuccess());
          if (redirect) redirect();
        } else {
          dispatch(getSendForgotPasswordError());
        }
      }).catch(err => {
        dispatch(getSendForgotPasswordError());

      })
}
  //#endregion SEND_FORGOT_PASSWORD

  //#region  SEND_RESET_PASSWORD

  const fetchResetPasswordRequest = async (password: string, token: string) =>

  fetch(`${baseUrl}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      "password": password,
      "token": token
    })
  })

export const getResetPasswordRequest: AppThunk = (form:{ password: string, token: string }, redirect: () => void) => (dispatch: AppDispatch) => {

  dispatch(getSendResetPasswordRequest());
    fetchResetPasswordRequest(form.password, form.token)
      .then(checkResponse)
      .then(res => {
        if (res && res.success) {
          dispatch(getSendResetPasswordSuccess());
          if (redirect) redirect();
        } else {
          dispatch(getSendResetPasswordError());
        }
      }).catch(err => {
        dispatch(getSendResetPasswordError());
      })
}
  //#endregion  SEND_FORGOT_PASSWORD

  //#region SEND_REFRESH_TOKEN

const fetchRefreshTokenRequest = async (token: string) =>

fetch(`${authUrl}/token`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  },
  body: JSON.stringify({
    "token": token
  })
})

export const getRefreshTokenRequest: AppThunk = (token: string) => (dispatch:AppDispatch) => {

  dispatch(getSendRefreshTokenRequest());

      fetchRefreshTokenRequest(token)
      .then(checkResponse)
      .then(res => {
        if (res && res.success) {
          setCookie('accessToken', res.accessToken);
          dispatch(getSendRefreshTokenSuccess(res.accessToken));
        } else {
          dispatch(getSendRefreshTokendError());
        }
      }).catch(err => {
        dispatch(getSendRefreshTokendError());
      })
}

//#endregion SEND_REFRESH_TOKEN

//#region SEND_LOGOUT

const fetchLogoutRequest = async (token: string) =>

fetch(`${authUrl}/logout`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  },
  body: JSON.stringify({
    "token": token
  })
})

export const getLogoutRequest: AppThunk = (token: string) => (dispatch: AppDispatch) => {

  dispatch(getSendLogoutRequest());
  
      fetchLogoutRequest(token)
      .then(checkResponse)
      .then(res => {
        if (res && res.success) {
          deleteCookie("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch(getSendLogoutSuccess());
        } else {
          dispatch(getSendLogoutError());
        }
      }).catch(err => {
        dispatch(getSendLogoutError());
      })
}

//#endregion SEND_LOGOUT

//#region SEND_USER_ORDER

const fetchUserOrderRequest = async (number: string) =>

fetch(`${userOrderUrl}/${number}`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  }
})


export const  getUserOrder: AppThunk = (number: string) => (dispatch: AppDispatch) =>  {

  dispatch(getSendUserOrderRequest());
  
    fetchUserOrderRequest(number)
      .then(checkResponse)
      .then(res => {
        if (res && res.success) {
          dispatch(getSendUserOrderSuccess(res.orders));
        } else {
          dispatch(getSendUserOrderError());
        }
      }).catch(err => {
        dispatch(getSendUserOrderError());
      })
}
  //#endregion SEND_USER_ORDER

//#endregion thunk functions
