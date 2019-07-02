import React from 'react';
import injectSheet from "react-jss";

import { Route, Switch } from "react-router-dom";

import DataGrid from '../views/data/Data';
import Home from '../views/home/Home';
import NotFound from '../views/notFound/NotFound';
import Profile from '../views/profile/Profile';

import Footer from './Footer';
import Header from './Header';
import Navigation from './Navigation';

const styles = theme => ({
    grid: {
        display: 'grid',
        gridTemplateRows: '100px 1fr 50px',
        gridTemplateColumns: '100px 1fr',
        minHeight: '100vh',
        margin: 0
    },

    main: {
        ...theme.fonts.text,
        gridColumnStart: 2,
        
        backgroundColor: theme.colors.primary.background,
        color: theme.colors.primary.text,
        padding: 20,
    },
});

const Main = (props) => {
    const { classes } = props;

    return <div className={classes.grid}>
        <Header />
        <Navigation />
        <main className={classes.main}>
            <Switch>
                <Route path="/" exact={true} component={Home} />
                <Route path="/profile" exact={true} component={Profile} />
                <Route path="/data" exact={true} component={DataGrid} />
                <Route component={NotFound} />
            </Switch>
        </main>
        <Footer />
  </div>
}

export default injectSheet(styles)(Main);