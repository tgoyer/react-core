import React from 'react';
import injectSheet from "react-jss";
import { useSelector, useDispatch } from 'react-redux';

import UserDetail from './UserDetail';
import { getUserInfo } from '../../store/user';

const styles = theme => ({
    title: {
        ...theme.fonts.title,
        marginBottom: 10,
    },
});

const Profile = ({ classes }) => {
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.user);

    const getUserInfoDispatch = React.useCallback(() => { 
        dispatch(getUserInfo());
    }, [dispatch]);

    React.useEffect(() => {
        getUserInfoDispatch();
    }, [getUserInfoDispatch]);


    return (
        <React.Fragment>
            <div className={classes.title}>Profile</div>
            <UserDetail userInfo={userInfo} />
        </React.Fragment>
    );
}

export default injectSheet(styles)(Profile);