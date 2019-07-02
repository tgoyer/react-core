import React from 'react';
import { Link } from "react-router-dom";
import injectSheet from "react-jss";

const styles = theme => ({
    header: {
        ...theme.fonts.title,
        gridColumnEnd: 'span 2',

        backgroundColor: '#9e5c00',
        color: '#ffffff',

        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
    },
    logo: {
        height: 70,
        width: 70,
        marginRight: 30,
        '& img': {
            backgroundColor: '#000000',
            boxShadow: '0 0 0px 3px rgba(255, 255, 255, .5)',
            padding: 5,
            height: '100%',
            width: '100%',
        }
    },
});

const Header = (props) => {
    const { classes } = props;

    return (
        <header className={classes.header}>
            <Link to="/" className={classes.logo}><img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="Spiffdog Design" /></Link>
            <span>ReactCore Demo App</span>
        </header>
    );
}

export default injectSheet(styles)(Header);