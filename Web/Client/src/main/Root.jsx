import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './Header';

import { Dashboard, NotFound } from 'views';

import { setServerSettings } from 'store/app.store';
import { getCurrentUser } from 'store/user.store';

const Root = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentUser());
        dispatch(setServerSettings());
    }, [dispatch]);

    return (
        <Router>
            <Header />
            <Switch>
                <Route exact path="/">
                    <Dashboard />
                </Route>
                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </Router>
    );
};

export default Root;
