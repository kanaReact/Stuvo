import {
    LoginSuccess, LoginFailed,
    UserDetailSuccess, UserDetailFailed,
    Rememberme, LogoutSuccess,
    RemoveRememberMe,
    SchoolDataSuccess, SchoolDataFailed,
    ClearMessage
} from '../Action/ActionTypes'
const INITIAL_STATE = {
    isLoggedIn: false,
    errormsg: '',
    status: '',
    name: '',
    token: '',
    userdetailData: [],
    rememberMe: false,
    schoolList: [],
    school: ''
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
                school: action.payload.responseJson.data[0].school_name,
            }
        case LoginFailed:
            return {
                isLoggedIn: false,
                errormsg: action.payload.responseJson.message,
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
                rememberMe: false
            }
        case ClearMessage:
            return {
                ...state,
                errormsg: '',
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
                rememberMe: false,
                schoolList: [],
                school: ''
            }
        }

        default:
            return state
    }
}
export default LoginReducer;