import React from 'react';
import cn from 'classnames';
import injectSheet from "react-jss";

import themeHelper from '../../utils/themeHelper';

const styles = theme => ({
    active: {
        backgroundColor: themeHelper.color.brightness(theme.colors.secondary.color, 25),
    },
    counter: {
        fontSize: 12,
        backgroundColor: theme.colors.accent.color,
        width: 18,
        height: 18,
        textAlign: 'center',
        lineHeight: '18px',
        borderRadius: '50%',
        boxShadow: '1px 1px 3px rgba(0, 0, 0, .25)',
    },
    content: {
        alignItems: 'center',
        display: 'flex',
    },
    subNavigationMenuItem: {
        alignItems: 'center',
        cursor: 'pointer',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        flexGrow: 1,
        fontSize: 16,
        lineHeight: '12px',
        padding: 8,
        textShadow: '1px 1px rgba(65, 92, 139, 1)',
        height: 35,
        '&:focus, &:hover': {
            backgroundColor: themeHelper.color.brightness(theme.colors.secondary.color, -15),
            border: 0,
            outline: 'none',
        },
        '& i': {
            color: 'white',
            display: 'inline-block',
            paddingRight: 8,
        },
        '& span': {
            fontSize: 12,
        }
    }
});

const SubNavigationItem = ({ active, classes, count, depth = 1, label, icon, onClick }) => {
    const style = { paddingLeft: depth * 8 };
    
    return (
        <li style={style} className={cn(classes.subNavigationMenuItem, { [classes.active]: active === true })} onClick={onClick}>
            <div className={classes.content}>
                {icon && <i className={icon}></i>}
                {label && <span>{label}</span>}
            </div>
            { count != null && <div className={classes.counter}>{ count }</div> }
        </li>
    );
}

export default injectSheet(styles)(SubNavigationItem);