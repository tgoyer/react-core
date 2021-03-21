import _get from 'lodash/get';
import _set from 'lodash/set';

export const createState = (name) => _set({}, name, { data: null, loading: false, error: false });

export const createReducers = (name, fn) => ({
    [name]: fn,
    [`${name}_begin`]: (state) => {
        _set(_get(state, name), `loading`, true);
    },
    [`${name}_done`]: (state) => {
        _set(_get(state, name), `loading`, false);
    },
    [`${name}_error`]: (state, action) => {
        _set(_get(state, name), `error`, action.payload);
    },
});
