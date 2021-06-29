
const INITIAL_STATE = {
    id: '',
    password: '',
    isLoggedIn: false,
    passChanged: false,
    errormsg: '',
    action: '',
    ProfileData: [],
    update: false
};

const LoginReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LoginSuccess':
            console.log('Reducers Data', action.payload.responseJson.data[0].id)
            return {
                isLoggedIn: true,
                wrongID: false,
                passChanged: false,
                ProfileData: action.payload.responseJson.data[0],
                action: 'success'
            }
        case 'LoginFailed':
            return {
                ...state, isLoggedIn: false, error_message: action.payload.error, wrongID: true
            }
        case 'LogoutSuccess':
            console.log('LogOut API Call', action)
            return {
                ...state, isLoggedIn: false, email: '', pass: '',
                wrongID: false, ProfileData: []
            }
        case 'ServerError':
            return {
                ...state, isLoggedIn: false, error_message: action.payload.error, ServerError: true, wrongID: false
            }

        default:
            return state
    }
}
export default LoginReducer;