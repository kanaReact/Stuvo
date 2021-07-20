import { GraphDetailSuccess,GraphDetailFailed } from '../Action/ActionTypes'

const INITIAL_STATE = {
    graphData:[]
};
const ResultReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GraphDetailSuccess:
            return {
                ...state,
                graphData:action.payload.responseJson.data[0].Survey
            }
        case GraphDetailFailed:
            return {
                ...state,
                graphData:[]
            }
        default:
            return state
    }
}
export default ResultReducer;