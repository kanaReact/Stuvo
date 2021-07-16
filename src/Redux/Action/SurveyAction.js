import {
    SurveyListSuccess,SurveyListFailed, SurveyDetailSuccess, SurveyDetailFailed,
    HadnleAnswer
} from './ActionTypes';
import constant from '../config/constant';
import axios from 'axios';
/** Handle Survey List Response */
var array = []
console.log('satyam array::',array)
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

export const answers = (survey_id,question_id,answer_id,question,answeroption,type,answer) => {
    return (dispatch) => {
        array.push({ survey_id:survey_id,question_id:question_id,anstitle_id:answer_id,question:question,answeroption:answeroption,type:type,answer:answer })
        console.log('array action::',array)
        dispatch({ type: HadnleAnswer,payload:{ array } })
    }
}
