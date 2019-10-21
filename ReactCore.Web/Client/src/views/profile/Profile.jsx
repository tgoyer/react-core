import React from 'react';
import injectSheet from "react-jss";
import { useSelector, useDispatch } from 'react-redux';

import UserDetail from './UserDetail';
import { setAppTitle } from '../../store/appState';

const styles = theme => ({
    title: {
        ...theme.fonts.title,
        marginBottom: 10,
    },
});

const Profile = ({ classes }) => {
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.users.current.data);

    const initOnLoad = React.useCallback(() => { 
        dispatch(setAppTitle('User Profile'))
    }, [dispatch]);

    React.useEffect(() => {
        initOnLoad();
    }, [initOnLoad]);

    return (
        <React.Fragment>
            <div className={classes.title}>Profile</div>
            <UserDetail userInfo={userInfo} />
        </React.Fragment>
    );
}

export default injectSheet(styles)(Profile);