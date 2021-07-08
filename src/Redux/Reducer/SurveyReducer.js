import {
    SurveyListSuccess,SurveyListFailed
} from '../Action/ActionTypes'

const INITIAL_STATE = {
    surveyData:[]
};

const SurveyReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SurveyListSuccess:
            return {
                ...state,
                surveyData:action.payload.responseJson.data[0].Survey
            }
        case SurveyListFailed:
            return {
                ...state,
                surveyData:[]
            }
        default:
            return state
    }
}
export default SurveyReducer;