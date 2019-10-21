import reduceReducers from 'reduce-reducers';
import { createAction, handleAction } from 'redux-actions';

const appTitleAction        = createAction('SET::APP-TITLE');

const initialState = {
    title: ''
}

export const setAppTitle = (title) => (dispatch) => {
    dispatch(appTitleAction(title));
    return Promise.resolve();
}

const setAppTitleReducer = handleAction(appTitleAction, (state, action) => ({
    ...initialState,
    ...state,
    title: action.payload,
}), initialState);

export default reduceReducers(
    setAppTitleReducer,
)