import { LoginSuccess, LoginFailed, UserDetailSuccess, UserDetailFailed, Rememberme, LogoutSuccess, RemoveRememberMe } from '../Action/ActionTypes'
const INITIAL_STATE = {
    isLoggedIn: false,
    errormsg: '',
    status: '',
    name: '',
    token: '',
    userdetailData: [],
    rememberMe: false,
};

const LoginReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LoginSuccess:
            console.log('Reducers Data', action.payload.responseJson.data[0].id)
            return {
                ...state,
                isLoggedIn: true,
                errormsg: action.payload.responseJson.data.message,
                status: 1,
                name: action.payload.responseJson.data[0].name,
                token: action.payload.responseJson.data[0].access_token,
            }
        case LoginFailed:
            return {
                isLoggedIn: false,
                errormsg: '',
                status: 0,
                name: '',
                token: '',
            }
        case UserDetailSuccess:
            return {
                ...state,
                userdetailData: action.payload.responseJson.data[0]
            }
        case UserDetailFailed:
            return {
                ...state,
                userdetailData: []
            }
        case Rememberme:
            return {
                ...state,
                rememberMe: true
            }
        case RemoveRememberMe:
            return {
                ...state,
                rememberMe:false
            }
        case LogoutSuccess: {
            return {
                ...state,
                isLoggedIn: false,
                errormsg: '',
                status: '',
                name: '',
                token: '',
                userdetailData: [],
                rememberMe:false
            }
        }

        default:
            return state
    }
}
export default LoginReducer;