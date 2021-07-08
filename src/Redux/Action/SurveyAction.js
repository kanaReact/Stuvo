import {
    SurveyListSuccess,SurveyListFailed,
    LogoutSuccess
} from './ActionTypes';
import constant from '../config/constant';
import axios from 'axios';

export function surveyListSuccess(responseJson) {
    return dispatch => {
        dispatch({ type: SurveyListSuccess, payload: { responseJson } });
    };
}

export function surveyListFailed(responseJson) {
    return dispatch => {
        dispatch({ type: SurveyListFailed, payload: { responseJson } });
    };
}

export const surveyList = (AUTH,type) => {
    return (dispatch) => {
        let url = constant.BASE_URL+'surveylist?type='+type
       
        axios.get(url,{
            headers:{ 'Authorization':'Bearer '+AUTH }
        }).then(responseJson=>{
            if(responseJson.data.status == 1)
            {
                dispatch(surveyListSuccess(responseJson.data))
            }
            else
            {
                dispatch(surveyListFailed(responseJson.data))
            }
        })
        .catch(error=>{ dispatch(surveyListFailed(error)) })
        
    };
};