import {
    LoginSuccess, LogoutSuccess, LoginFailed, ServerError,
    UserDetailSuccess,UserDetailFailed,
    Rememberme,RemoveRememberMe,
    SchoolDataSuccess,SchoolDataFailed,
    ClearMessage
} from './ActionTypes';
// import API from '../../Api/API';
import constant from "../config/constant";
import { doPost } from "../config/request";
import axios from 'axios';
export function loginSuccess(responseJson) {
    return dispatch => {
        dispatch({ type: LoginSuccess, payload: { responseJson } });
    };
}

export function loginFailed(responseJson) {
    return dispatch => {
        dispatch({ type: LoginFailed, payload: { responseJson } });
    };
}


export const login = (id, otp) => {
    return (dispatch) => {
        let url = constant.BASE_URL+'otp_verify'
        let data = new URLSearchParams();
        data.append('id',id);
        data.append('otp',otp);
        console.log(data)
        axios.post(url, data, {
            headers: { 'Content-Type': "application/x-www-form-urlencoded" },
        }).then(responseJson => {
            if (responseJson.data.status == 1) {
                console.log('Response login:', responseJson.data)
                dispatch(loginSuccess(responseJson.data))
            }
            else {
                dispatch(loginFailed(responseJson.data))
            }
        }).catch((error) => { dispatch(loginFailed(error)) })
        
    };
};


export function userDetailSuccess(responseJson) {
    return dispatch => {
        dispatch({ type: UserDetailSuccess, payload: { responseJson } });
    };
}

export function userDetailFailed(responseJson) {
    return dispatch => {
        dispatch({ type: UserDetailFailed, payload: { responseJson } });
    };
}


export const userDetail = (AUTH) => {
    return (dispatch) => {
        let url = constant.BASE_URL+'user_detail'
       
        axios.get(url,{
            headers:{ 'Authorization':'Bearer '+AUTH }
        }).then(responseJson=>{
            if(responseJson.data.status == 1)
            {
                dispatch(userDetailSuccess(responseJson.data))
            }
            else
            {
                dispatch(userDetailFailed(responseJson.data))
            }
        })
        .catch(error=>{ dispatch(userDetailFailed(error)) })
        
    };
};

export const logout = () => {
    return (dispatch) => {
        dispatch({ type: LogoutSuccess })
    }
}

export const clearMessage = () => {
    return (dispatch) => {
        dispatch({ type: ClearMessage })
    }
}

export const rememberMe = () => {
    return (dispatch) => {
        dispatch({ type: Rememberme })
    }
}


export const removerememberMe = () => {
    return (dispatch) => {
        dispatch({ type: RemoveRememberMe })
    }
}

