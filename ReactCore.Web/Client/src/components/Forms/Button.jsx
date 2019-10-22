import React from 'react';
import injectSheet from "react-jss";

import { Button as SuiButton } from 'semantic-ui-react';

import { color } from '../../utils/themeHelper';

const styles = theme => ({
    primary: {
        '& .ui.primary.button': {
            backgroundColor: `${theme.colors.primary.color} !important`,
            color: `${theme.colors.primary.text} !important`,
            '&:hover': {
                backgroundColor: `${color.brightness(theme.colors.primary.color, -25)} !important`,
            }
        }
    },
    secondary: {
        '& .ui.secondary.button': {
            backgroundColor: `${theme.colors.secondary.color} !important`,
            color: `${theme.colors.secondary.text} !important`,
            '&:hover': {
                backgroundColor: `${color.brightness(theme.colors.secondary.color, -25)} !important`,
            }
        }
    }
});

const Button = ({ classes, type, ...rest }) => {
    switch(type) {
        case 'secondary':
            return <div className={classes.secondary}><SuiButton secondary { ...rest } /></div>;
        case 'primary':
        default:
            return <div className={classes.primary}><SuiButton primary { ...rest } /></div>;
    }
}

export default injectSheet(styles)(Button);