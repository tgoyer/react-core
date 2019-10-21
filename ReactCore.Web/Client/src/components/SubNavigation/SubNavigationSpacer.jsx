import React from 'react';
import injectSheet from "react-jss";

const styles = theme => ({
    subNavigationSpacer: {
        padding: 6,
    }
});

const SubNavigationSpacer = ({ classes }) => {
    return (
        <li className={classes.subNavigationSpacer}></li>
    );
}

export default injectSheet(styles)(SubNavigationSpacer);