import { baseUrl, authUrl } from "../../utils/constants";
import { checkResponse, deleteCookie } from "../../utils/functions";
import { getCookie, setCookie } from "../../utils/functions";
export const GET_REGISTER_REQUEST = "GET_REGISTER_REQUEST";
export const GET_REGISTER_SUCCESS = "GET_REGISTER_SUCCESS";
export const GET_REGISTER_ERROR = "GET_REGISTER_ERROR";

export const GET_LOGIN_REQUEST = "GET_LOGIN_REQUEST";
export const GET_LOGIN_SUCCESS = "GET_LOGIN_SUCCESS";
export const GET_LOGIN_ERROR = "GET_LOGIN_ERROR";

export const GET_LOGOUT_REQUEST = "GET_LOGOUT_REQUEST";
export const GET_LOGOUT_SUCCESS = "GET_LOGOUT_SUCCESS";
export const GET_LOGOUT_ERROR = "GET_LOGOUT_ERROR";

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_ERROR = "GET_USER_ERROR";

export const GET_EDIT_USER_REQUEST = "GET_EDIT_USER_REQUEST";
export const GET_EDIT_USER_SUCCESS = "GET_EDIT_USER_SUCCESS";
export const GET_EDIT_USER_ERROR = "GET_EDIT_USER_ERROR";

export const GET_FORGOT_PASSWORD_REQUEST = "GET_FORGOT_PASSWORD_REQUEST";
export const GET_FORGOT_PASSWORD_SUCCESS = "GET_FORGOT_PASSWORD_SUCCESS";
export const GET_FORGOT_PASSWORD_ERROR = "GET_FORGOT_PASSWORD_ERROR";

export const GET_RESET_PASSWORD_REQUEST = "GET_RESET_PASSWORD_REQUEST";
export const GET_RESET_PASSWORD_SUCCESS = "GET_RESET_PASSWORD_SUCCESS";
export const GET_RESET_PASSWORD_ERROR = "GET_RESET_PASSWORD_ERROR"

export const GET_REFRESH_TOKEN_REQUEST = "GET_REFRESH_TOKEN_REQUEST";
export const GET_REFRESH_TOKEN_SUCCESS = "GET_REFRESH_TOKEN_SUCCESS";
export const GET_REFRESH_TOKEN_ERROR = "GET_REFRESH_TOKEN_ERROR"

const registerUrl = authUrl + "/register";
const userUrl = authUrl + "/user";
const loginUrl = authUrl + "/login";
const logoutUrl = authUrl + "/logout";
const forgotPasswordUrl = baseUrl  + "/password-reset";
const resetPasswordUrl = forgotPasswordUrl + "/reset";
const refreshTokenUrl = authUrl + "/token";

export function getRegisterRequest({name, email, password}) {

    return function(dispatch) {
      dispatch({
        type: GET_REGISTER_REQUEST
      });
      
     fetch(registerUrl, {
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
            type: GET_REGISTER_SUCCESS,
            user: res.user,
            accessToken: res.accessToken,
            refreshToken: res.refreshToken,
          });
        } else {
          dispatch({
            type: GET_REGISTER_ERROR
          });
        }
      }).catch(err =>{
        dispatch({
          type: GET_REGISTER_ERROR
        });
      })
    };
  }

  export function getUserRequest() {

    return function(dispatch) {
      dispatch({
        type: GET_USER_REQUEST
      });
      
     fetch(userUrl, {
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
            type: GET_USER_SUCCESS,
            user: res.user
          });
        } else {
          deleteCookie("accessToken");
          dispatch({
            type: GET_USER_ERROR
          });
        }
      }).catch(err =>{
        dispatch({
          type: GET_USER_ERROR
        });
      })
    };
    
  }

  export function getEditUserRequest({name, email, password}) {

    return function(dispatch) {
      dispatch({
        type: GET_REGISTER_REQUEST
      });
      
     fetch(userUrl, {
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
            type: GET_EDIT_USER_SUCCESS,
            user: res.user,
            password: password
          });
          console.log(res.message);
        } else {
          deleteCookie("accessToken");
          dispatch({
            type: GET_EDIT_USER_ERROR
          });
        }
      }).catch(err =>{
        dispatch({
          type: GET_EDIT_USER_ERROR
        });
      })
    };
    
  }

  export function getLoginRequest({email, password}, redirect) {
    return function(dispatch) {
      dispatch({
        type: GET_LOGIN_REQUEST
      });
      
     fetch(loginUrl, {
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
            type: GET_LOGIN_SUCCESS,
            user: res.user,
            password: password,
            accessToken: res.accessToken,
            refreshToken: res.refreshToken,
          })
          if(redirect)redirect();
        } else {
          dispatch({
            type: GET_LOGIN_ERROR
          });
        }
      }).catch(err =>{
        console.log(err);
        dispatch({
          type: GET_LOGIN_ERROR
        });
      })
    };
    
  }

  export function getForgotPasswordRequest({email}, redirect) {

    return function(dispatch) {
      dispatch({
        type: GET_FORGOT_PASSWORD_REQUEST
      });
      
     fetch(forgotPasswordUrl, {
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
            type: GET_FORGOT_PASSWORD_SUCCESS
          });
          console.log(res.message);
          if(redirect)redirect();
        } else {
          dispatch({
            type: GET_FORGOT_PASSWORD_ERROR
          });
        }
      }).catch(err =>{
        dispatch({
          type: GET_FORGOT_PASSWORD_ERROR
        });
      })
    };
    
  }

  export function getResetPasswordRequest({password, token}, redirect) {

    return function(dispatch) {
      dispatch({
        type: GET_RESET_PASSWORD_REQUEST
      });
      
     fetch(resetPasswordUrl, {
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
            type: GET_RESET_PASSWORD_SUCCESS
          });
          console.log(res.message);
          if(redirect)redirect();
        } else {
          dispatch({
            type: GET_RESET_PASSWORD_ERROR
          });
        }
      }).catch(err =>{
        dispatch({
          type: GET_RESET_PASSWORD_ERROR
        });
      })
    };
    
  }

  export function getRefreshTokenRequest(token) {

    return function(dispatch) {
      dispatch({
        type: GET_REFRESH_TOKEN_REQUEST
      });
      
     fetch(refreshTokenUrl, {
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
            type: GET_REFRESH_TOKEN_SUCCESS,
            accessToken: res.accessToken
          });
          console.log(res.accessToken);
        } else {
          dispatch({
            type: GET_REFRESH_TOKEN_ERROR
          });
        }
      }).catch(err =>{
        dispatch({
          type: GET_REFRESH_TOKEN_ERROR
        });
      })
    };
    
  }

  export function getLogoutRequest(token) {

    return function(dispatch) {
      dispatch({
        type: GET_LOGOUT_REQUEST
      });
      console.log(logoutUrl);
     fetch(logoutUrl, {
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
            type: GET_LOGOUT_SUCCESS
          });
          console.log(res.message);
        } else {
          dispatch({
            type: GET_LOGOUT_ERROR
          });
        }
      }).catch(err =>{
        dispatch({
          type: GET_LOGOUT_ERROR
        });
      })
    };
    
  }
