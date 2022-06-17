import { baseUrl, authUrl, userOrderUrl } from "../../utils/constants";
import { checkResponse, deleteCookie } from "../../utils/functions";
import { getCookie, setCookie } from "../../utils/functions";
export const SEND_REGISTER_REQUEST = "SEND_REGISTER_REQUEST";
export const SEND_REGISTER_SUCCESS = "SEND_REGISTER_SUCCESS";
export const SEND_REGISTER_ERROR = "SEND_REGISTER_ERROR";

export const SEND_LOGIN_REQUEST = "SEND_LOGIN_REQUEST";
export const SEND_LOGIN_SUCCESS = "SEND_LOGIN_SUCCESS";
export const SEND_LOGIN_ERROR = "SEND_LOGIN_ERROR";

export const SEND_LOGOUT_REQUEST = "SEND_LOGOUT_REQUEST";
export const SEND_LOGOUT_SUCCESS = "SEND_LOGOUT_SUCCESS";
export const SEND_LOGOUT_ERROR = "SEND_LOGOUT_ERROR";

export const SEND_USER_REQUEST = "SEND_USER_REQUEST";
export const SEND_USER_SUCCESS = "SEND_USER_SUCCESS";
export const SEND_USER_ERROR = "SEND_USER_ERROR";

export const SEND_EDIT_USER_REQUEST = "SEND_EDIT_USER_REQUEST";
export const SEND_EDIT_USER_SUCCESS = "SEND_EDIT_USER_SUCCESS";
export const SEND_EDIT_USER_ERROR = "SEND_EDIT_USER_ERROR";

export const SEND_FORGOT_PASSWORD_REQUEST = "SEND_FORGOT_PASSWORD_REQUEST";
export const SEND_FORGOT_PASSWORD_SUCCESS = "SEND_FORGOT_PASSWORD_SUCCESS";
export const SEND_FORGOT_PASSWORD_ERROR = "SEND_FORGOT_PASSWORD_ERROR";

export const SEND_RESET_PASSWORD_REQUEST = "SEND_RESET_PASSWORD_REQUEST";
export const SEND_RESET_PASSWORD_SUCCESS = "SEND_RESET_PASSWORD_SUCCESS";
export const SEND_RESET_PASSWORD_ERROR = "SEND_RESET_PASSWORD_ERROR"

export const SEND_REFRESH_TOKEN_REQUEST = "SEND_REFRESH_TOKEN_REQUEST";
export const SEND_REFRESH_TOKEN_SUCCESS = "SEND_REFRESH_TOKEN_SUCCESS";
export const SEND_REFRESH_TOKEN_ERROR = "SEND_REFRESH_TOKEN_ERROR"

export const SEND_USER_ORDER_REQUEST = "SEND_USER_ORDER_REQUEST";
export const SEND_USER_ORDER_SUCCESS = "SEND_USER_ORDER_SUCCESS";
export const SEND_USER_ORDER_ERROR = "SEND_USER_ORDER_ERROR";


export function getRegisterRequest({name, email, password}, redirect) {

    return function(dispatch) {
      dispatch({
        type: SEND_REGISTER_REQUEST
      });
      
     fetch(`${authUrl}/register`, {
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
     .then(checkResponse)
     .then(res => {
        if (res && res.success) {
          setCookie('accessToken', res.accessToken);
          localStorage.setItem('refreshToken', res.refreshToken);
          dispatch({
            type: SEND_REGISTER_SUCCESS,
            user: res.user,
            accessToken: res.accessToken,
            refreshToken: res.refreshToken,
          });
          if(redirect)redirect();
        } else {
          dispatch({
            type: SEND_REGISTER_ERROR
          });
        }
      }).catch(err =>{
        dispatch({
          type: SEND_REGISTER_ERROR
        });
      })
    };
  }

  export function getUserRequest() {

    return function(dispatch) {
      dispatch({
        type: SEND_USER_REQUEST
      });
      
     fetch(`${authUrl}/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          Authorization:  getCookie('accessToken')
        }
     })
     .then(checkResponse)
     .then(res => {
        if (res && res.success) {
          dispatch({
            type: SEND_USER_SUCCESS,
            user: res.user
          });
        } else {
          deleteCookie("accessToken");
          dispatch({
            type: SEND_USER_ERROR
          });
        }
      }).catch(err =>{
        dispatch({
          type: SEND_USER_ERROR
        });
      })
    };
    
  }

  export function getEditUserRequest({name, email, password}) {

    return function(dispatch) {
      dispatch({
        type: SEND_REGISTER_REQUEST
      });
      
     fetch(`${authUrl}/user`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          Authorization:  getCookie('accessToken')
        },
        body: JSON.stringify({
          "email": email,
          "password": password, 
          "name": name
        })
     })
     .then(checkResponse)
     .then(res => {
        if (res && res.success) {
          dispatch({
            type: SEND_EDIT_USER_SUCCESS,
            user: res.user,
            password: password
          });
          console.log(res.message);
        } else {
          deleteCookie("accessToken");
          dispatch({
            type: SEND_EDIT_USER_ERROR
          });
        }
      }).catch(err =>{
        dispatch({
          type: SEND_EDIT_USER_ERROR
        });
      })
    };
    
  }

  export function getLoginRequest({email, password}, redirect) {
    return function(dispatch) {
      dispatch({
        type: SEND_LOGIN_REQUEST
      });
      
     fetch(`${authUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({
        "email": email,
        "password": password
      })
     })
     .then(checkResponse)
     .then(res => {
        if (res && res.success) {
          setCookie('accessToken', res.accessToken);
          localStorage.setItem('refreshToken', res.refreshToken);
          dispatch({
            type: SEND_LOGIN_SUCCESS,
            user: res.user,
            password: password,
            accessToken: res.accessToken,
            refreshToken: res.refreshToken,
          })
          if(redirect)redirect();
        } else {
          dispatch({
            type: SEND_LOGIN_ERROR
          });
        }
      }).catch(err =>{
        console.log(err);
        dispatch({
          type: SEND_LOGIN_ERROR
        });
      })
    };
    
  }

  export function getForgotPasswordRequest({email}, redirect) {

    return function(dispatch) {
      dispatch({
        type: SEND_FORGOT_PASSWORD_REQUEST
      });
      
     fetch(`${baseUrl}/password-reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
          "email": email
        })
     })
     .then(checkResponse)
     .then(res => {
        if (res && res.success) {
          dispatch({
            type: SEND_FORGOT_PASSWORD_SUCCESS
          });
          console.log(res.message);
          if(redirect)redirect();
        } else {
          dispatch({
            type: SEND_FORGOT_PASSWORD_ERROR
          });
        }
      }).catch(err =>{
        dispatch({
          type: SEND_FORGOT_PASSWORD_ERROR
        });
      })
    };
    
  }

  export function getResetPasswordRequest({password, token}, redirect) {

    return function(dispatch) {
      dispatch({
        type: SEND_RESET_PASSWORD_REQUEST
      });
      
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
     .then(checkResponse)
     .then(res => {
        if (res && res.success) {
          dispatch({
            type: SEND_RESET_PASSWORD_SUCCESS
          });
          console.log(res.message);
          if(redirect)redirect();
        } else {
          dispatch({
            type: SEND_RESET_PASSWORD_ERROR
          });
        }
      }).catch(err =>{
        dispatch({
          type: SEND_RESET_PASSWORD_ERROR
        });
      })
    };
    
  }

  export function getRefreshTokenRequest(token) {

    return function(dispatch) {
      dispatch({
        type: SEND_REFRESH_TOKEN_REQUEST
      });
      
     fetch(`${authUrl}/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
          "token": token
        })
     })
     .then(checkResponse)
     .then(res => {
        if (res && res.success) {
          setCookie('accessToken', res.accessToken);
          dispatch({
            type: SEND_REFRESH_TOKEN_SUCCESS,
            accessToken: res.accessToken
          });
        } else {
          dispatch({
            type: SEND_REFRESH_TOKEN_ERROR
          });
        }
      }).catch(err =>{
        dispatch({
          type: SEND_REFRESH_TOKEN_ERROR
        });
      })
    };
    
  }

  export function getLogoutRequest(token) {

    return function(dispatch) {
      dispatch({
        type: SEND_LOGOUT_REQUEST
      });
     fetch(`${authUrl}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
          "token": token
        })
     })
     .then(checkResponse)
     .then(res => {
        if (res && res.success) {
          deleteCookie("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch({
            type: SEND_LOGOUT_SUCCESS
          });
          console.log(res.message);
        } else {
          dispatch({
            type: SEND_LOGOUT_ERROR
          });
        }
      }).catch(err =>{
        dispatch({
          type: SEND_LOGOUT_ERROR
        });
      })
    };
    
  }

  export function getUserOrder(number) {

    return function(dispatch) {
      dispatch({
        type: SEND_USER_ORDER_REQUEST
      });
     console.log(`${userOrderUrl}/${number}`); 
     fetch(`${userOrderUrl}/${number}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
     })
     .then(checkResponse)
     .then(res => {
        if (res && res.success) {
          dispatch({
            type: SEND_USER_ORDER_SUCCESS,
            userOrderInfo: res.orders
          });
          console.log(res.orders.ingredients);
        } else {
          dispatch({
            type: SEND_USER_ORDER_ERROR
          });
        }
      }).catch(err =>{
        console.log(err);
        dispatch({
          type: SEND_USER_ORDER_ERROR
        });
      })
    };
    
  }

