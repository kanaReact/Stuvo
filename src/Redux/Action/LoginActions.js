import {
    LoginSuccess, LogoutSuccess, LoginFailed, ServerError,
    UserDetailSuccess, UserDetailFailed,
    Rememberme, RemoveRememberMe,
    SendDeviceTokenSuccess, SendDeviceTokenFailed,
    WelcomeSuccess, WelcomeFailed
} from './ActionTypes';
// import API from '../../Api/API';
import constant from "../config/constant";
import { doPost } from "../config/request";
import axios from 'axios';
/** For handle the login response */
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

/** Call login api */
export const login = (id, otp) => {
    return (dispatch) => {
        let url = constant.BASE_URL + 'otp_verify'
        let data = new URLSearchParams();
        data.append('id', id);
        data.append('otp', otp);
        axios.post(url, data, {
            headers: { 'Content-Type': "application/x-www-form-urlencoded" },
        }).then(responseJson => {
            if (responseJson.data.status == 1) {
                dispatch(loginSuccess(responseJson.data))
            }
            else {
                dispatch(loginFailed(responseJson.data))
            }
        }).catch((error) => { dispatch(loginFailed(error)) })

    };
};

/** For handle user detail api response */
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

/** Call user detail api */
export const userDetail = (AUTH) => {
    return (dispatch) => {
        let url = constant.BASE_URL + 'user_detail'

        axios.get(url, {
            headers: { 'Authorization': 'Bearer ' + AUTH }
        }).then(responseJson => {
            console.log('res::', responseJson.data)
            if (responseJson.data.status == 1) {
                dispatch(userDetailSuccess(responseJson.data))
            }
            else {
                dispatch(userDetailFailed(responseJson.data))
            }
        })
            .catch(error => { dispatch(userDetailFailed(error)) })

    };
};
export function sendDeviceTokenSuccess(responseJson) {
    return dispatch => {
        dispatch({ type: SendDeviceTokenSuccess, payload: { responseJson } });
    };
}

export function sendDeviceTokenFailed(responseJson) {
    return dispatch => {
        dispatch({ type: SendDeviceTokenFailed, payload: { responseJson } });
    };
}
export const sendToken = (AUTH, device_id, device_type) => {
    return (dispatch) => {
        let url = constant.BASE_URL + 'login_details_submit'
        let data = new URLSearchParams()
        data.append('device_id', device_id);
        data.append('device_type', device_type);
        axios.post(url, data, {
            headers: {
                'Authorization': 'Bearer ' + AUTH,
                'Content-Type': "application/x-www-form-urlencoded"
            }
        }).then(responseJson => {
            if (responseJson.data.status == 1) {
                dispatch(sendDeviceTokenSuccess(responseJson.data))
            }
            else {
                dispatch(sendDeviceTokenFailed(responseJson.data))
            }
        })
            .catch(error => { dispatch(sendDeviceTokenFailed(error)) })

    };
};

export function welcomeSuccess(responseJson) {
    return dispatch => {
        dispatch({ type: WelcomeSuccess, payload: { responseJson } });
    };
}

export function welcomeFailed(responseJson) {
    return dispatch => {
        dispatch({ type: WelcomeFailed, payload: { responseJson } });
    };
}

export const handle_welcome = (AUTH) => {
    return (dispatch) => {
        let url = constant.BASE_URL + 'welcome'
        axios.get(url, {
            headers: {
                'Authorization': 'Bearer ' + AUTH,
            }
        }).then(responseJson => {
            if (responseJson.data.status == 1) {
                dispatch(welcomeSuccess(responseJson.data))
            }
            else {
                dispatch(welcomeFailed(responseJson.data))
            }
        })
            .catch(error => { dispatch(welcomeFailed(error)) })

    };
}
/** Handle logout */
export const logout = () => {
    return (dispatch) => {
        dispatch({ type: LogoutSuccess })
    }
}
/** Handle Remember me */
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

