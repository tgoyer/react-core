import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { createState, createReducers } from 'store/utilities';

export const slice = createSlice({
    name: 'app',
    initialState: {
        ...createState('settings'),
    },
    reducers: {
        ...createReducers('settings', (state, action) => {
            state.settings.data = action.payload;
        }),
    },
});

const { actions, reducer } = slice;
export default reducer;

export const setServerSettings = () => (dispatch) => {
    dispatch(actions.settings_begin());
    return axios
        .get('/health/status')
        .then((r) => dispatch(actions.settings(r.data)))
        .catch((err) => dispatch(actions.settings_error(err)))
        .finally(dispatch(actions.settings_done()));
};
