import React from 'react';
import { createPortal } from 'react-dom';
import injectSheet from "react-jss";

import usePortal from '../../hooks/usePortal';

const styles = theme => ({
    subNavigationMenu: {
        listStyleType: 'none',
        margin: 0, 
        padding: '20px 0 0 0',
        display: 'flex',
        flexDirection: 'column',
    },
});

const SubNavigation = ({ classes, children }) => {
    const mountPoint = usePortal('app_subheader');
    return createPortal((
        <ul className={classes.subNavigationMenu}>
            { children }
        </ul>
    ), mountPoint);
}

export default injectSheet(styles)(SubNavigation);