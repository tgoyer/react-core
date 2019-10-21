import axios from 'axios';
import reduceReducers from 'reduce-reducers';
import { createAction, handleAction } from 'redux-actions';

import broadcast from '../utils/broadcast';

const clearGridAction       = createAction('CLEAR::DATA-GRID');
const dataGridAction        = createAction('GET::DATA-GRID');
const dataGridErrorAction   = createAction('GET::DATA-GRID::ERROR');
const dataGridSuccessAction = createAction('GET::DATA-GRID::SUCCESS');

const initialState = {
    data: [],
    status: {
        loading: false,
        error: null
    }
}

export const getData = () => (dispatch) => {
    dispatch(dataGridAction(true));

    return axios
        .get('/datagrid')
        .then(response => dispatch(dataGridSuccessAction(response.data)) )
        .catch(err => {
            broadcast.error("Error occured fetching data.");
            return dispatch(dataGridErrorAction(err));
        });
}

export const clearData = () => (dispatch) => {
    dispatch(clearGridAction());
}

const clearReducer = handleAction(clearGridAction, (state, action) => ({
    ...state,
    data: [],
    status: {
        loading: false,
        error: null
    }
}), initialState);

const loadReducer = handleAction(dataGridAction, (state, action) => ({
    ...state,
    data: [],
    status: {
        ...state.status,
        loading: action.payload
    }
}), initialState);

const successReducer = handleAction(dataGridSuccessAction, (state, action) => ({
    ...state,
    data: action.payload,
    status: {
        loading: false,
        error: null,
    }
}), initialState);

const errorReducer = handleAction(dataGridErrorAction, (state, action) => ({
    ...state,
    data: [],
    status: {
        loading: false,
        error: action.payload,
    }
}), initialState);

export default reduceReducers(
    clearReducer,
    errorReducer,
    loadReducer,
    successReducer,
)