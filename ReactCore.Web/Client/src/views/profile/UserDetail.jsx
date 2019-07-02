import React from 'react';
import injectSheet from "react-jss";

const styles = theme => ({
    title: {
        ...theme.fonts.title,
    },
    label: {
        ...theme.fonts.subtitle,
        display: 'inline-block',
        fontWeight: theme.fonts.weights.bold,
        width: 75,
    },
    value: {
        ...theme.fonts.subtitle,
    },
});

const UserDetail = (props) => {
    const {classes, userInfo} = props;

    return userInfo != null && (
        <React.Fragment>
            <div>
                <span className={classes.label}>Name</span>
                <span className={classes.value}>{userInfo.FullName}</span>
            </div>
            <div>
                <span className={classes.label}>User</span>
                <span className={classes.value}>{userInfo.UserName}</span>
            </div>
            <div>
                <span className={classes.label}>Email</span>
                <span className={classes.value}>{userInfo.EmailAddress}</span>
            </div>
            <div>
                <span className={classes.label}>Claims</span>
                <span className={classes.value}>{userInfo.Permissions.map(p => p.Value).join('; ')}</span>
            </div>
        </React.Fragment>
    );
}

export default injectSheet(styles)(UserDetail);