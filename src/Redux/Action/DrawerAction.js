import {
    GuidanceSuccess,GuidanceFailed,
    FAQSuccess,FAQFailed
} from '../Action/ActionTypes'

import axios from 'axios';
import constant from '../config/constant';

export function guidanceSucess(responseJson) {
    return dispatch => {
        dispatch({ type: GuidanceSuccess, payload: { responseJson } });
    };
}

export function guidanceFailed(responseJson) {
    return dispatch => {
        dispatch({ type: GuidanceFailed, payload: { responseJson } });
    };
}

export const guidance=(AUTH)=>{
    return (dispatch) => {
        let url = constant.BASE_URL+'guidancelist'
       
        axios.get(url,{
            headers:{ 'Authorization':'Bearer '+AUTH }
        }).then(responseJson=>{
            console.log('response:',responseJson.data)
            if(responseJson.data.status == 1)
            {
                dispatch(guidanceSucess(responseJson.data))
            }
            else
            {
                dispatch(guidanceFailed(responseJson.data))
            }
        })
        .catch(error=>{ dispatch(guidanceFailed(error)) })
        
    };
}

export function faqSuccess(responseJson) {
    return dispatch => {
        dispatch({ type: FAQSuccess, payload: { responseJson } });
    };
}

export function faqFailed(responseJson) {
    return dispatch => {
        dispatch({ type: FAQFailed, payload: { responseJson } });
    };
}

export const faq=(AUTH)=>{
    return (dispatch) => {
        let url = constant.BASE_URL+'faqlist'
       
        axios.get(url,{
            headers:{ 'Authorization':'Bearer '+AUTH }
        }).then(responseJson=>{
            console.log('response:',responseJson.data)
            if(responseJson.data.status == 1)
            {
                dispatch(faqSuccess(responseJson.data))
            }
            else
            {
                dispatch(faqFailed(responseJson.data))
            }
        })
        .catch(error=>{ dispatch(faqFailed(error)) })
    };
}