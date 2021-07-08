import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import SurveyReducer from './SurveyReducer';
export default combineReducers({
    LoginData: LoginReducer,
    SurveyData: SurveyReducer
})