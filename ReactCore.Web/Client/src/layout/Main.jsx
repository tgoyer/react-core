import React from 'react';
import injectSheet from "react-jss";
import { Route, Switch } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import { ToastContainer } from "react-toastify";
import { useSelector } from 'react-redux';

import DataGrid from '../views/data/Data';
import Home from '../views/home/Home';
import NotFound from '../views/notFound/NotFound';
import Profile from '../views/profile/Profile';
import Todo from '../views/todo/Todo';

import Footer from './Footer';
import Header from './Header';

import 'react-toastify/dist/ReactToastify.min.css';

const styles = theme => ({
    grid: {
        display: 'grid',
        gridTemplateRows: '75px 1fr 75px',
        gridTemplateColumns: '150px 1fr',
        minHeight: '100vh',
        margin: 0
    },
    main: {
        ...theme.fonts.text,
        gridColumnStart: 2,
        
        backgroundColor: theme.colors.primary.color,
        color: theme.colors.primary.text,
        padding: 18,
        maxWidth: 'calc(100vw - 150px)',
    },
    subNavigation: {
        ...theme.fonts.text,
        backgroundColor: theme.colors.secondary.color,
        color: theme.colors.secondary.text,
    },
});

const Main = (props) => {
    const { classes } = props;
    const title = useSelector(state => state.appState.title);

    return (
        <React.Fragment>
            <div id="app_modal" />
            <div className={classes.grid}>
                <Header />
                <nav className={classes.subNavigation}>
                    <div id="app_subheader"></div>
                </nav>
                <main className={classes.main}>
                    <Switch>
                        <Route path="/" exact={true} component={Home} />
                        <Route path="/data" exact={true} component={DataGrid} />
                        <Route path="/profile" exact={true} component={Profile} />
                        <Route path="/todo" exact={true} component={Todo} />
                        <Route component={NotFound} />
                    </Switch>
                    <ToastContainer
                        position="bottom-right"
                        autoClose={4000}
                        hideProgressBar={true}
                        newestOnTop={false}
                        closeOnClick={true}
                        rtl={false}
                        pauseOnVisibilityChange={true}
                        draggable={true}
                        pauseOnHover={true}
                    />
                </main>
                <Footer />
                <Helmet>
                    <title>React Core - { title }</title>
                </Helmet>
            </div>
        </React.Fragment>
    )
}

export default injectSheet(styles)(Main);