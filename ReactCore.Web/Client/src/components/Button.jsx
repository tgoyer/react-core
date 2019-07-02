import React from 'react';
import injectSheet from "react-jss";
import cn from 'classnames';

import themeHelper from '../utils/themeHelper';

const styles = theme => ({
    default: {
        border: 0,
        boxShadow: 'inset 0px 0px 0px 2px rgba(0, 0, 0, 0.1)',
        fontSize: 16,
        padding: 10,
        '&:active': {
            boxShadow: 'inset 0px 0px 8px 0px rgba(0, 0, 0, 0.2)',
            textShadow: 'none',
            transform: 'translateY(1px)'
        },
        '&:focus, &:hover': {
            border: 0,
            boxShadow: 'inset 0px 0px 0px 2px rgba(0, 0, 0, 0.5)',
            outline: 'none',
        },
        '&:disabled, &[disabled]': {
            backgroundColor: theme.colors.disabled.background,
            color: theme.colors.disabled.text,

            border: 0,
            boxShadow: 'none',
            outline: 'none',
            textShadow: 'none',
        }
    },
    primary: {
        backgroundColor: theme.colors.secondary.background,
        color: theme.colors.secondary.text,
        '&:active': {
            backgroundColor: themeHelper.color.brightness(theme.colors.secondary.background, -20),
        }
    },
    secondary: {
        backgroundColor: '#ffffff',
        boxShadow: `inset 0px 0px 0px 2px ${theme.colors.secondary.background}`,
        color: theme.colors.secondary.background,
        '&:active': {
            backgroundColor: themeHelper.color.brightness(theme.colors.secondary.background, -20),
        },
        '&:focus, &:hover': {
            color: 'rgba(0, 0, 0, 0.5)',
        }
    }
});

const Button = ({ classes, type, ...rest }) => {
    return <button className={cn(
        classes.default, {
            [classes.primary]: type == null || type === 'primary',
            [classes.secondary]: type === 'secondary',
        } 
    )} {...rest} />
}

export default injectSheet(styles)(Button);