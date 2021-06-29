import {
    LoginSuccess, LogoutSuccess, LoginFailed, ServerError,
} from './ActionTypes';
// import API from '../../Api/API';
import constant from "../config/constant";
import { doPost } from "../config/request";


export function loginSuccess(responseJson) {
    return dispatch => {
        dispatch({ type: LoginSuccess, payload: { responseJson } });
    };
}

export function loginError(error) {
    return { type: LoginFailed, payload: { error } };
}

export function NetworkError(error) {
    return { type: ServerError, payload: { error } };
}

export const logout = () => {
    return (dispatch) => {
        console.log("logout");
        dispatch({ type: LogoutSuccess, payload: {} });
    };
};

export const userLogin = (username, password) => {
    return (dispatch) => {
        console.log("Came here in the action:", username, password);
        let data = new FormData()
        data.append('email',username)
        data.append('password',password)
        doPost(constant.LOGIN_URL, data).then((res) => {
            if (res.status == 1) {
                // dispatch(loginSuccess(responseJson));
                console.log("Response of login is : ", res);
            } else {
                // dispatch(loginError(responseJson.error_msg));
                console.log("Response of login fail: ", res);
            }
        }).catch((e) => console.log('error', e));
    };
};


