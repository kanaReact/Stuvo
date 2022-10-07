import {
  SurveyListSuccess,
  SurveyListFailed,
  SurveyDetailSuccess,
  SurveyDetailFailed,
  HadnleAnswer,
  SurveycompletedlistSuccess,
  SurveycompletedlistFailed,
  NotificationListSuccess,
  NotificationListFailed,
  SubmitSurveyListSuccess,
  SubmitSurveyListFailed,
  AnswerGraphSuccess,
  AnswerGraphFailed,
} from './ActionTypes';
import constant from '../config/constant';
import axios from 'axios';

/** Handle Survey List Response */
var array = [];
export function surveyListSuccess(responseJson) {
  return dispatch => {
    dispatch({type: SurveyListSuccess, payload: {responseJson}});
  };
}

export function surveyListFailed(responseJson) {
  return dispatch => {
    dispatch({type: SurveyListFailed, payload: {responseJson}});
  };
}
/** Call Survey list api */
export const surveyList = (AUTH, type) => {
  return dispatch => {
    let url = constant.BASE_URL + 'surveylist?type=' + type;

    axios
      .get(url, {
        headers: {Authorization: 'Bearer ' + AUTH},
      })
      .then(responseJson => {
        if (responseJson.data.status == 1) {
          dispatch(surveyListSuccess(responseJson.data));
        } else {
          dispatch(surveyListFailed(responseJson.data));
        }
      })
      .catch(error => {
        dispatch(surveyListFailed(error));
        console.log('err:', error);
      });
  };
};
/** Handle survey detail response */
export function surveyDetailSuccess(responseJson) {
  return dispatch => {
    dispatch({type: SurveyDetailSuccess, payload: {responseJson}});
  };
}

export function surveyDetailFailed(responseJson) {
  return dispatch => {
    dispatch({type: SurveyDetailFailed, payload: {responseJson}});
  };
}
/** Call survey detail api */
export const surveyDetail = (AUTH, id) => {
  return dispatch => {
    let url = constant.BASE_URL + 'survey_details?id=' + id;

    axios
      .get(url, {
        headers: {Authorization: 'Bearer ' + AUTH},
      })
      .then(responseJson => {
        if (responseJson.data.status == 1) {
          dispatch(surveyDetailSuccess(responseJson.data));
        } else {
          dispatch(surveyDetailFailed(responseJson.data));
        }
      })
      .catch(error => {
        dispatch(surveyDetailFailed(error));
      });
  };
};

export function surveyCompletedListSuccess(responseJson) {
  return dispatch => {
    dispatch({type: SurveycompletedlistSuccess, payload: {responseJson}});
  };
}

export function surveyCompletedListFailed(responseJson) {
  return dispatch => {
    dispatch({type: SurveycompletedlistFailed, payload: {responseJson}});
  };
}

export const surveyComplete = (AUTH, id) => {
  return dispatch => {
    let url = constant.BASE_URL + 'submit_survey_view?id=' + id;
    axios
      .get(url, {
        headers: {Authorization: 'Bearer ' + AUTH},
      })
      .then(responseJson => {
        console.log('survey ques ans::', responseJson.data);
        if (responseJson.data.status == 1) {
          dispatch(surveyCompletedListSuccess(responseJson.data));
        } else {
          dispatch(surveyCompletedListFailed(responseJson.data));
        }
      })
      .catch(error => {
        dispatch(surveyCompletedListFailed(error));
        console.log('error:', error);
      });
  };
};

export function notificationListSuccess(responseJson) {
  return dispatch => {
    dispatch({type: NotificationListSuccess, payload: {responseJson}});
  };
}

export function notificationListFailed(responseJson) {
  return dispatch => {
    dispatch({type: NotificationListFailed, payload: {responseJson}});
  };
}

export const notificationList = AUTH => {
  return dispatch => {
    let url = constant.BASE_URL + 'notificationlist';

    axios
      .get(url, {
        headers: {Authorization: 'Bearer ' + AUTH},
      })
      .then(responseJson => {
        if (responseJson.data.status == 1) {
          dispatch(notificationListSuccess(responseJson.data));
        } else {
          dispatch(notificationListFailed(responseJson.data));
        }
      })
      .catch(error => {
        dispatch(notificationListFailed(error));
      });
  };
};

export function submitSurveyListSuccess(responseJson) {
  return dispatch => {
    dispatch({type: SubmitSurveyListSuccess, payload: {responseJson}});
  };
}

export function submitSurveyListFailed(responseJson) {
  return dispatch => {
    dispatch({type: SubmitSurveyListFailed, payload: {responseJson}});
  };
}

export const submit_survey_list = AUTH => {
  return dispatch => {
    let url = constant.BASE_URL + 'submit_survey_list';
    axios
      .get(url, {
        headers: {Authorization: 'Bearer ' + AUTH},
      })
      .then(responseJson => {
        if (responseJson.data.status == 1) {
          dispatch(submitSurveyListSuccess(responseJson.data));
        } else {
          dispatch(submitSurveyListFailed(responseJson.data));
        }
      })
      .catch(error => {
        dispatch(submitSurveyListFailed(error));
      });
  };
};

export function answerGraphSuccess(responseJson) {
  return dispatch => {
    dispatch({type: AnswerGraphSuccess, payload: {responseJson}});
  };
}

export function answerGraphFailed(responseJson) {
  return dispatch => {
    dispatch({type: AnswerGraphFailed, payload: {responseJson}});
  };
}

export const answer_graph = (AUTH, id) => {
  return dispatch => {
    let url = constant.BASE_URL + 'ans_graph_view?id=' + id;
    axios
      .get(url, {
        headers: {Authorization: 'Bearer ' + AUTH},
      })
      .then(responseJson => {
        if (responseJson.data.status == 1) {
          dispatch(answerGraphSuccess(responseJson.data));
        } else {
          dispatch(answerGraphFailed(responseJson.data));
        }
      })
      .catch(error => {
        dispatch(answerGraphFailed(error));
      });
  };
};
