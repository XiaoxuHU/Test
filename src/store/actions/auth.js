import axios from 'axios';

import * as actionTypes from './actionTypes';


export const authStart = () =>{
    return {
        type:actionTypes.AUTH_START
    }
}

export const authSuccess = (token,userId)=>{
    return {
        type:actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    }
}

export const authFail = (error) =>{
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userId');
    return {
        type:actionTypes.AUTH_LOGOUT,
    }
}

export const checkAuthTimeout = (expirationTime)=>{
    return dispatch =>{
        setTimeout(()=>dispatch(logout()),expirationTime*1000)
    }
}

export const auth = (email,password,isSignUp) =>(
    dispatch=>{
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyA8cF410q8mVQQi9KxGM2qFCnSK1meUU3M';
        if(!isSignUp){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyA8cF410q8mVQQi9KxGM2qFCnSK1meUU3M';
        }
        axios.post(url,authData)
            .then( res =>{
                const expirationTime = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                localStorage.setItem('token',res.data.idToken);
                localStorage.setItem('expirationTime',expirationTime);
                localStorage.setItem('userId',res.data.localId);
                dispatch(authSuccess(res.data.idToken,res.data.localId));
                dispatch(checkAuthTimeout(res.data.expiresIn))
            })
            .catch( error=>{
                dispatch(authFail(error.response.data.error));
            })
    }
)


export const setAuthRedirectPath = (path) =>{
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () =>{
    return dispatch =>{
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        }else {
            const expirationTime = new Date(localStorage.getItem('expirationTime'));
            if(expirationTime <= new Date()){
                dispatch(logout());    
            } else{
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token,userId));
                dispatch(checkAuthTimeout((expirationTime.getTime()-new Date().getTime())/1000));
            }
        }
    }
}