import axios from "axios";
import constant from "../config/constant";

import { 
    GraphDetailSuccess,GraphDetailFailed
 } from '../Action/ActionTypes'

export function grpahdetailSuccess(responseJson) {
    return dispatch => {
        dispatch({ type: GraphDetailSuccess, payload: { responseJson } });
    };
}

export function graphdetailFailed(responseJson) {
    return dispatch => {
        dispatch({ type: GraphDetailFailed, payload: { responseJson } });
    };
}

export const graphDetail=(AUTH,id)=>{
    return (dispatch) => {
        let url = constant.BASE_URL+'survey_graph_view?id='+id
       
        axios.get(url,{
            headers:{ 'Authorization':'Bearer '+AUTH }
        }).then(responseJson=>{
            if(responseJson.data.status == 1)
            {
                dispatch(grpahdetailSuccess(responseJson.data))
            }
            else
            {
                dispatch(graphdetailFailed(responseJson.data))
            }
        })
        .catch(error=>{ dispatch(graphdetailFailed(error)) })
        
    };
}