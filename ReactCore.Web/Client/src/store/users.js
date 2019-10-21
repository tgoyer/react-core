import axios from 'axios';
import reduceReducers from 'reduce-reducers';
import { createAction, handleAction } from 'redux-actions';

const initialState = {
    current: {
        data: null,
        status: {
            loading: false,
            error: null
        }
    },
    list: {
        data: [],
        status: {
            loading: false,
            error: null
        }
    }
}

const getCurrentUserAction        = createAction('GET::CURRENT-USER');
const getCurrentUserSuccessAction = createAction('GET::CURRENT-USER::SUCCESS');
const getCurrentUserErrorAction   = createAction('GET::CURRENT-USER::ERROR');
export const getCurrentUser = () => (dispatch, getStore) => {
    const store = getStore();

    if (store.users.current.data != null) {
        dispatch(getCurrentUserAction(store.user));
        return Promise.resolve();
    }

    dispatch(getCurrentUserAction(true));
    return axios
        .get('/users/me')
        .then(response => dispatch(getCurrentUserSuccessAction(response.data) ))
        .catch(err => dispatch(getCurrentUserErrorAction(err)));
}

const loadCurrentUserReducer = handleAction(getCurrentUserAction, (state, action) => ({
    ...state,
    current: {
        data: null,
        status: {
            loading: true,
            error: null
        }
    }
}), initialState);

const loadCurrentUserSuccessReducer = handleAction(getCurrentUserSuccessAction, (state, action) => ({
    ...state,
    current: {
        data: action.payload,
        status: {
            loading: false,
            error: null,
        }
    }
}), initialState);

const loadCurrentUserErrorReducer = handleAction(getCurrentUserErrorAction, (state, action) => ({
    ...state,
    current: {
        data: null,
        status: {
            loading: false,
            error: action.payload
        }
    }
}), initialState);

const getUsersAction        = createAction('GET::USERS');
const getUsersSuccessAction = createAction('GET::USERS::SUCCESS');
const getUsersErrorAction   = createAction('GET::USERS::ERROR');
export const getUsers = () => (dispatch, getStore) => {
    const store = getStore();

    if (store.users.list.data.length > 0) {
        dispatch(getUsersAction(store.users.list.data));
        return Promise.resolve();
    }

    dispatch(getUsersAction(true));
    return axios
        .get('/users')
        .then(response => dispatch(getUsersSuccessAction(response.data) ))
        .catch(err => dispatch(getUsersErrorAction(err)));
}

const getUsersReducer = handleAction(getUsersAction, (state, action) => ({
    ...state,
    list: {
        data: [],
        status: {
            loading: true,
            error: null
        }
    }
}), initialState);

const getUsersSuccessReducer = handleAction(getUsersSuccessAction, (state, action) => ({
    ...state,
    list: {
        data: action.payload,
        status: {
            loading: false,
            error: null,
        }
    }
}), initialState);

const getUsersErrorReducer = handleAction(getUsersErrorAction, (state, action) => ({
    ...state,
    list: {
        data: [],
        status: {
            loading: false,
            error: action.payload
        }
    }
}), initialState);


export default reduceReducers(
    getUsersReducer,
    getUsersSuccessReducer,
    getUsersErrorReducer,
    
    loadCurrentUserReducer,
    loadCurrentUserSuccessReducer,
    loadCurrentUserErrorReducer,
)