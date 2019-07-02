import axios from 'axios';
import reduceReducers from 'reduce-reducers';
import { createAction, handleAction } from 'redux-actions';

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

    axios
        .get('/datagrid')
        .then(response => setTimeout(() => dispatch(dataGridSuccessAction(response.data)), 1250) )
        .catch(err => dispatch(dataGridErrorAction(err)));
}

const loadReducer = handleAction(
    dataGridAction,
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
    dataGridSuccessAction,
    (state, action) => ({
        ...state,
        data: action.payload,
        status: {
            ...state.status,
            loading: false,
            error: null,
        }
    }),
    initialState
);

export default reduceReducers(
    loadReducer,
    successReducer,
)