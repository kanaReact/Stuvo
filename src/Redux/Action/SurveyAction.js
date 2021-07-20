import {
    SurveyListSuccess,SurveyListFailed, SurveyDetailSuccess, SurveyDetailFailed,
    HadnleAnswer,
    SurveycompletedlistSuccess,SurveycompletedlistFailed,
} from './ActionTypes';
import constant from '../config/constant';
import axios from 'axios';
/** Handle Survey List Response */
var array = []
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
/** Call Survey list api */
export const surveyList = (AUTH,type) => {
    return (dispatch) => {
        let url = constant.BASE_URL+'surveylist?type='+type
       
        axios.get(url,{
            headers:{ 'Authorization':'Bearer '+AUTH }
        }).then(responseJson=>{
            console.log('res::',responseJson.data)
            if(responseJson.data.status == 1)
            {
                dispatch(surveyListSuccess(responseJson.data))
            }
            else
            {
                dispatch(surveyListFailed(responseJson.data))
            }
        })
        .catch(error=>{ console.log('res::',responseJson.data);dispatch(surveyListFailed(error)) })
        
    };
};
/** Handle survey detail response */
export function surveyDetailSuccess(responseJson) {
    return dispatch => {
        dispatch({ type: SurveyDetailSuccess, payload: { responseJson } });
    };
}

export function surveyDetailFailed(responseJson) {
    return dispatch => {
        dispatch({ type: SurveyDetailFailed, payload: { responseJson } });
    };
}
/** Call survey detail api */
export const surveyDetail = (AUTH,id) => {
    return (dispatch) => {
        let url = constant.BASE_URL+'survey_details?id='+id
       
        axios.get(url,{
            headers:{ 'Authorization':'Bearer '+AUTH }
        }).then(responseJson=>{
            if(responseJson.data.status == 1)
            {
                dispatch(surveyDetailSuccess(responseJson.data))
            }
            else
            {
                dispatch(surveyDetailFailed(responseJson.data))
            }
        })
        .catch(error=>{ dispatch(surveyDetailFailed(error)) })
        
    };
};

export function surveyCompletedListSuccess(responseJson) {
    return dispatch => {
        dispatch({ type: SurveycompletedlistSuccess, payload: { responseJson } });
    };
}

export function surveyCompletedListFailed(responseJson) {
    return dispatch => {
        dispatch({ type: SurveycompletedlistFailed, payload: { responseJson } });
    };
}

export const surveyComplete = (AUTH,id) => {
    return (dispatch) => {
        let url = constant.BASE_URL+'submit_survey_view?id='+id
       
        axios.get(url,{
            headers:{ 'Authorization':'Bearer '+AUTH }
        }).then(responseJson=>{
            if(responseJson.data.status == 1)
            {
                dispatch(surveyCompletedListSuccess(responseJson.data))
            }
            else
            {
                dispatch(surveyCompletedListFailed(responseJson.data))
            }
        })
        .catch(error=>{ dispatch(surveyCompletedListFailed(error)) })
        
    };
};
