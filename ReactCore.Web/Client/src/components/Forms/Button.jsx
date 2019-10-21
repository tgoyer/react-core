import React from 'react';
import injectSheet from "react-jss";

import { Button as SuiButton } from 'semantic-ui-react';

import { color } from '../../utils/themeHelper';

const styles = theme => ({
    primary: {
        backgroundColor: `${theme.colors.secondary.color} !important`,
        color: `${theme.colors.secondary.text} !important`,
        '&:hover': {
            backgroundColor: `${color.brightness(theme.colors.secondary.color, -25)} !important`,
        }
    },
    secondary: {
        backgroundColor: `#ccc !important`,
        color: `${theme.colors.primary.text} !important`
    }
});

const Button = ({ classes, type, ...rest }) => {
    switch(type) {
        case 'secondary':
            return <SuiButton secondary className={classes.secondary} { ...rest } />;
        case 'primary':
        default:
            return <SuiButton primary className={classes.primary} { ...rest } />;
    }
}

export default injectSheet(styles)(Button);