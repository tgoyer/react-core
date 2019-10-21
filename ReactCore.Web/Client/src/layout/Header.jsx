import React from 'react';
import cn from 'classnames';
import { Link } from "react-router-dom";
import injectSheet from "react-jss";

import Tooltip from 'react-tooltip';

const styles = theme => ({
    actions: {
        display: 'flex',
        flexDirection: 'row',
        lineHeight: '12px',
        textShadow: '1px 1px rgba(65, 92, 139, 1)',
        '& a': {
            display: 'block',
            padding: '1em',
            textAlign: 'center',
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
    },
    header: {
        ...theme.fonts.title,
        gridColumnEnd: 'span 2',

        backgroundColor: '#9e5c00',
        color: '#ffffff',

        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    logo: {
        marginRight: 30,
        marginLeft: 8,
        '& img': {
            backgroundColor: '#000000',
            boxShadow: '0 0 0px 3px rgba(255, 255, 255, .5)',
            height: 45,
            width: 45,
        },
    },
    title: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        '& span': {
            marginLeft: 8,
        },
    }
});

const Header = ({ classes, actions }) => {
    return (
        <header className={classes.header}>
            <div className={classes.title}>
            	<Link to="/" className={classes.logo}><img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="Spiffdog Design" /></Link>
                <span>ReactCore Demo App</span>
            </div>

            <div className={classes.actions}>
                <Link data-tip data-for="tt_home" to='/'><i className={cn('fas', `fa-home`)}></i></Link>
                <Link data-tip data-for="tt_data" to='/data'><i className={cn('fas', 'fa-table')}></i></Link>
                <Link data-tip data-for="tt_todo" to='/todo'><i className={cn('far', 'fa-check-square')}></i></Link>
                <Link data-tip data-for="tt_profile" to='/profile'><i className={cn('fas', 'fa-user')}></i></Link>

                <Tooltip place="bottom" type="dark" effect="solid" id="tt_home" aria-haspopup="true" role="example">Home</Tooltip>
                <Tooltip place="bottom" type="dark" effect="solid" id="tt_data" aria-haspopup="true" role="example">Data Grid Demo</Tooltip>
                <Tooltip place="bottom" type="dark" effect="solid" id="tt_todo" aria-haspopup="true" role="example">Todo App Demo</Tooltip>
                <Tooltip place="bottom" type="dark" effect="solid" id="tt_profile" aria-haspopup="true" role="example">Profile Information</Tooltip>
            </div>
        </header>
    );
}

export default injectSheet(styles)(Header);