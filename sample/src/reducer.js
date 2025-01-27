
import { POST_DATA, SEARCH_KEY, SELECT_KEY, USER_DATA ,IS_LOADING} from './action'
const initialState = {
    userList: [],
    searchKey: null,
    selectKey: '',
    userNames:[],
    isLoading:false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_DATA:
            return { ...state, userList: action.payload };
        case SEARCH_KEY:
            return { ...state, searchKey: action.payload };
        case SELECT_KEY:
            return { ...state, selectKey: action.payload };
        case USER_DATA:
            return { ...state, userNames: action.payload };
        case IS_LOADING:
            return { ...state, isLoading: action.payload };
        default:
            return state;
    }
};
export default reducer