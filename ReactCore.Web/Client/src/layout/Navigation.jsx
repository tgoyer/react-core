import React from 'react';
import cn from 'classnames';
import injectSheet from "react-jss";

import { NavLink } from "react-router-dom";

const styles = theme => ({
    navigation: {
        ...theme.fonts.text,
        backgroundColor: '#333333',
        color: '#ffffff',
        fontSize: 16,
    },
    menu: {
        listStyleType: 'none',
        margin: 0, 
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
    },
    menuItem: {
        flexGrow: 1,
        lineHeight: '12px',
        textShadow: '1px 1px rgba(65, 92, 139, 1)',
        '& a.active': {
            backgroundColor: '#ffffff',
            color: '#333333',
            fontWeight: theme.fonts.weights.bold,
            textShadow: 'none',
            borderRight: '1px solid #333333',
        },
        '& a.active i': {
            backgroundColor: 'none',
            color: '#333333',
        },
        '& a': {
            display: 'block',
            padding: '1em',
            textAlign: 'center',
            marginBottom: '0.2em',
            textDecoration: 'none',
            color: 'white',
        },
        '& i': {
            display: 'block',
            color: 'white',
            marginBottom: 5
        },
        '& span': {
            fontSize: 12,
        }
    }
});

const Main = (props) => {
    const { classes } = props;

    return (
        <nav className={classes.navigation}>
            <ul className={classes.menu}>
                <li className={classes.menuItem}>
                    <NavLink exact={true} to='/'>
                        <i className={cn('fas', `fa-home fa-2x`)}></i>
                        <span>Home</span>
                    </NavLink>
                    <NavLink exact={true} to='/profile'>
                        <i className={cn('fas', `fa-user fa-2x`)}></i>
                        <span>Profile</span>
                    </NavLink>
                    <NavLink exact={true} to='/data'>
                        <i className={cn('fas', `fa-th fa-2x`)}></i>
                        <span>Data Grid Example</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default injectSheet(styles)(Main);