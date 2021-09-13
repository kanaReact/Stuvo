import {
    SurveyListSuccess, SurveyListFailed,
    LogoutSuccess,
    SurveyDetailSuccess, SurveyDetailFailed,
    HadnleAnswer,
    SurveycompletedlistSuccess, SurveycompletedlistFailed,
    NotificationListSuccess, NotificationListFailed,
    SubmitSurveyListSuccess, SubmitSurveyListFailed,
    AnswerGraphSuccess, AnswerGraphFailed
} from '../Action/ActionTypes'

const INITIAL_STATE = {
    surveyData: [],
    surveyDetailData: [],
    answerArray: [],
    surveyCompleteList: [],
    notificationData: [],
    submitSurveyData: [],
    answerGraphData: []
};

const SurveyReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SurveyListSuccess:
            return {
                ...state,
                surveyData: action.payload.responseJson.data[0].Survey
            }
        case SurveyListFailed:
            return {
                ...state,
                surveyData: []
            }
        case SurveyDetailSuccess:
            return {
                ...state,
                surveyDetailData: action.payload.responseJson.data[0].Question
            }
        case SurveyDetailFailed:
            return {
                ...state,
                surveyDetailData: []
            }
        case HadnleAnswer:
            return {
                ...state,
                answerArray: action.payload.array
            }
        case LogoutSuccess:
            return {
                ...state,
                surveyData: [],
                surveyDetailData: [],
                answerArray: []
            }
        case SurveycompletedlistSuccess:
            return {
                ...state,
                surveyCompleteList: action.payload.responseJson.data
            }
        case SurveycompletedlistFailed:
            return {
                ...state,
                surveyCompleteList: []
            }
        case NotificationListSuccess:
            return {
                ...state,
                notificationData: action.payload.responseJson.data[0].Notification
            }
        case NotificationListFailed:
            return {
                ...state,
                notificationData: []
            }
        case SubmitSurveyListSuccess:
            return {
                ...state,
                submitSurveyData: action.payload.responseJson.data
            }
        case SubmitSurveyListFailed:
            return {
                ...state,
                submitSurveyData: []
            }
        case AnswerGraphSuccess:
            return {
                ...state,
                answerGraphData: action.payload.responseJson.data[0].answer
            }
        case AnswerGraphFailed:
            return {
                ...state,
                answerGraphData: []
            }
        default:
            return state
    }
}
export default SurveyReducer;