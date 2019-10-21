import React from 'react';
import injectSheet from "react-jss";

const styles = theme => ({
    footer: {
        ...theme.fonts.subtitle,
        gridColumnEnd: 'span 2',

        backgroundColor: '#9e5c00',
        color: '#ffffff',

        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
        '& a': {
            ...theme.fonts.subtitle,
            ...theme.fonts.link,
            color: theme.colors.tertiary.text,
            marginLeft: 5,
            '&:hover': {
                color: theme.colors.tertiary.text,
                textDecoration: 'underline',
            },
            '&:active': {
                color: theme.colors.tertiary.text,
            },
            '&:visted': {
                color: theme.colors.tertiary.text,
            },
        }
    },
});

const Footer = (props) => {
    const { classes } = props;
    
    return (
        <footer className={classes.footer}>
            <span>&copy; {new Date().getFullYear()} <a href="https://www.github.com/spiffdog-design/react-core">Spiffdog Design</a></span>
        </footer>
    );
}

export default injectSheet(styles)(Footer);