import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { createState, createReducers } from 'store/utilities';

export const slice = createSlice({
    name: 'users',
    initialState: {
        ...createState('current'),
    },
    reducers: {
        ...createReducers('current', (state, action) => {
            state.current.data = action.payload;
        }),
    },
});

const { actions, reducer } = slice;
export default reducer;

export const getCurrentUser = () => (dispatch) => {
    dispatch(actions.current_begin());
    return axios
        .get('users/me')
        .then((r) => dispatch(actions.current(r.data)))
        .catch((err) => dispatch(actions.current_error(err)))
        .finally(dispatch(actions.current_done()));
};
