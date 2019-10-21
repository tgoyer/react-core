import axios from 'axios';
import reduceReducers from 'reduce-reducers';
import { createAction, handleAction } from 'redux-actions';

const initialState = {
    list: {
        data: [],
        status: {
            loading: false,
            error: null
        }
    },
}

const getTasksAction        = createAction('GET::TASKS');
const getTasksSuccessAction = createAction('GET::TASKS::SUCCESS');
const getTasksErrorAction   = createAction('GET::TASKS::ERROR');
export const getTasks = () => (dispatch) => {
    dispatch(getTasksAction());
    return axios
        .get('/tasks')
        .then(response => dispatch(getTasksSuccessAction(response.data) ))
        .catch(err => dispatch(getTasksErrorAction(err)));
}

const getTasksReducer = handleAction(getTasksAction, (state, action) => ({
    ...state,
    list: {
        data: [],
        status: {
            loading: true,
            error: null,
        }
    }
}), initialState);

const getTasksSuccessReducer = handleAction(getTasksSuccessAction, (state, action) => ({
    ...state,
    list: {
        data: action.payload,
        status: {
            loading: false,
            error: null,
        }
    }
}), initialState);

const getTasksErrorReducer = handleAction(getTasksErrorAction, (state, action) => ({
    ...state,
    list: {
        data: [],
        status: {
            loading: false,
            error: action.payload,
        }
    }
}), initialState);


export default reduceReducers(
    getTasksReducer,
    getTasksSuccessReducer,
    getTasksErrorReducer,
)