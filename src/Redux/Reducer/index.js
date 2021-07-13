import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import SurveyReducer from './SurveyReducer';
import DrawerReducer from './DrawerReducer';
export default combineReducers({
    LoginData: LoginReducer,
    SurveyData: SurveyReducer,
    DrawerData: DrawerReducer
})