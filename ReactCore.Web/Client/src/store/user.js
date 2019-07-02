import axios from 'axios';
import reduceReducers from 'reduce-reducers';
import { createAction, handleAction } from 'redux-actions';

const userInfoAction        = createAction('GET::USER-INFO');
const userInfoSuccessAction = createAction('GET::USER-INFO::SUCCESS');
const userInfoErrorAction   = createAction('GET::USER-INFO::ERROR');

const initialState = {
    UserID: null,
    UserName: null,
    FirstName: null,
    LastName: null,
    FullName: null,
    Permissions: [],
    status: {
        loading: false,
        error: null
    }
}

export const getUserInfo = () => (dispatch) => {
    dispatch(userInfoAction(true));

    axios
        .get('/users/me')
        .then(response => dispatch(userInfoSuccessAction(response.data) ))
        .catch(err => dispatch(userInfoErrorAction(err)));
}

const loadReducer = handleAction(
    userInfoAction,
    (state, action) => ({
        ...initialState,
        status: {
            ...state.status,
            loading: action.payload
        }
    }),
    initialState
);

const successReducer = handleAction(
    userInfoSuccessAction,
    (state, action) => ({
        ...state,
        ...action.payload,
        status: {
            ...state.status,
            loading: false,
            error: null,
        }
    }),
    initialState
);

const errorReducer = handleAction(
    userInfoErrorAction,
    (state, action) => ({
        ...initialState,
        status: {
            loading: false,
            error: action.payload
        }
    }),
    initialState
);

export default reduceReducers(
    loadReducer,
    successReducer,
    errorReducer,
)