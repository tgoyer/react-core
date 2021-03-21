import { configureStore } from '@reduxjs/toolkit';

import app from 'store/app.store';
import user from 'store/user.store';

export default configureStore({
    reducer: {
        app,
        user,
    },
});
