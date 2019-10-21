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
    }
}

const getProjectsAction        = createAction('GET::PROJECTS');
const getProjectsSuccessAction = createAction('GET::PROJECTS::SUCCESS');
const getProjectsErrorAction   = createAction('GET::PROJECTS::ERROR');
export const getProjects = () => (dispatch) => {
    dispatch(getProjectsAction());
    return axios
        .get('/projects')
        .then(response => dispatch(getProjectsSuccessAction(response.data) ))
        .catch(err => dispatch(getProjectsErrorAction(err)));
}

const getProjectsReducer = handleAction(getProjectsAction, (state, action) => ({
    ...state,
    list: {
        data: [],
        status: {
            loading: true,
            error: null,
        }
    }
}), initialState);

const getProjectsSuccessReducer = handleAction(getProjectsSuccessAction, (state, action) => ({
    ...state,
    list: {
        data: action.payload,
        status: {
            loading: false,
            error: null,
        }
    }
}), initialState);

const getProjectsErrorReducer = handleAction(getProjectsErrorAction, (state, action) => ({
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
    getProjectsReducer,
    getProjectsSuccessReducer,
    getProjectsErrorReducer,
)