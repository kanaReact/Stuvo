import {
    SurveyListSuccess,SurveyListFailed,
    LogoutSuccess,
    SurveyDetailSuccess,SurveyDetailFailed,
    HadnleAnswer,
    SurveycompletedlistSuccess,SurveycompletedlistFailed
} from '../Action/ActionTypes'

const INITIAL_STATE = {
    surveyData:[],
    surveyDetailData:[],
    answerArray:[],
    surveyCompleteList:[]
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
        case SurveyDetailSuccess:
            return {
                ...state,
                surveyDetailData:action.payload.responseJson.data[0].Question
            }
        case SurveyDetailFailed:
            return {
                ...state,
                surveyDetailData:[]
            }
        case HadnleAnswer:
            console.log('answer array : ',action.payload.array)
            return {
                ...state,
                answerArray:action.payload.array
            }
        case LogoutSuccess:
            return {
                ...state,
                surveyData:[],
                surveyDetailData:[],
                answerArray:[]
            }
        case SurveycompletedlistSuccess:
            return {
                ...state,
                surveyCompleteList:action.payload.responseJson.data[0].Survey
            }
        case SurveycompletedlistFailed:
            return {
                ...state,
                surveyCompleteList:[]
            }
        default:
            return state
    }
}
export default SurveyReducer;