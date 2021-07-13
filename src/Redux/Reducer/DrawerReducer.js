import {
    GuidanceSuccess,GuidanceFailed,
    LogoutSuccess,
    FAQSuccess,FAQFailed
} from '../Action/ActionTypes'

const INITIAL_STATE = {
    guidanceData:[],
    faqData:[]
};

const DrawerReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GuidanceSuccess:
            return {
                ...state,
                guidanceData:action.payload.responseJson.data[0].guidance
            }
        case GuidanceFailed:
            return {
                ...state,
                guidanceData:[]
            }
        case FAQSuccess:
            return {
                ...state,
                faqData:action.payload.responseJson.data[0].FAQ
            }
        case FAQFailed:
            return {
                ...state,
                faqData:[]
            }
        case LogoutSuccess:
            return {
                ...state,
                guidanceData:[]
            }
        default:
            return state
    }
}
export default DrawerReducer;