import React from 'react'
import injectSheet from "react-jss";
import { useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';

import { getUrlParameter } from '../../utils/layoutHelper';
import { setAppTitle } from '../../store/appState';

const styles = theme => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        height: '100%',
        width: '100%',
    },
    content: {
        boxShadow: '2px 2px 4px #888888',
        padding: 40,
        background: '#ffffff'
    },
    droids:{
        margin: 40,
    },
    internal: {
        position: 'relative',
    },
    fourOhFour: {
        fontSize: 120,
        fontWeight: theme.fonts.weights.bold,
        lineHeight: '100px',
        textAlign: 'center',
    },
    helpList: {
        paddingBottom: 4
    },
    helpText: {
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        '& p': {
            marginLeft: 30
        },
        '& ul': {
            marginBottom: 25
        }
    },
    kittenContainer: {
        marginTop: 50,
        textAlign: 'center'
    },
    kittenLink: {
        float: 'right'
    },
    kittenPic: {
        marginBottom: 10,
        width: 400
    },
    list: {
        margin: '0 auto 40px auto',
    },
    title: {
        fontSize: 16,
        fontWeight: theme.fonts.weights.bold,
        margin: '40px 0 10px',
        textAlign: 'center',
    },
});

const NotFound = ({ classes }) => {
    const [ kittyMode, setKittyMode ] = React.useState(getUrlParameter('kitten-mode') !== '');

    const dispatch = useDispatch();
    const initOnLoad = React.useCallback(() => { 
        dispatch(setAppTitle('Page Not Found'))
    }, [dispatch]);

    React.useEffect(() => {
        initOnLoad();
    }, [initOnLoad]);

    const handleKittenLink = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setKittyMode(true);
    }

    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <div className={classes.internal}>
                    <div className={classes.fourOhFour}>
                        <span>4</span>
                        <span>0</span>
                        <span>4</span>
                    </div>
                    <div className={classes.title}>This is not the page you are looking for...</div>
                    <div className={classes.droids}>
                        <img src="https://media.giphy.com/media/4Xbr39OD96ZmU/giphy.gif" alt="Obi Wan Kenobi waving hand over storm troopers in the movie Star Wars" />
                    </div>
                    <div className={classes.helpText}>
                        <div className={classes.list}>
                            <span>Perhaps you are here because:</span>
                            <ul>
                                <li>The page has moved.</li>
                                <li>The page no longer exists.</li>
                                <li>You were looking for data and it's stuck in the inter-tubes.</li>
                                <li>Perhaps you just like 404 pages?  Probably not.</li>
                            </ul>
                            <span>You can click the "Go back home" link below to return to the home screen.  Whatever you do, don't click the other one.</span>
                        </div>
                        <div>
                            <strong><Link to='/'>Go back home</Link></strong>
                            { kittyMode === false && <a href="/" onClick={handleKittenLink}className={classes.kittenLink}>(Don't click this link...)</a> }
                        </div>
                    </div>
                </div>
                { kittyMode === true && (
                    <div className={classes.kittenContainer}>
                        <p>I told you not to click that!</p>
                        <p>But all is not lost.  Here's a cute kitten!</p>
                        <img src={process.env.PUBLIC_URL + '/images/kitten.jpg'} alt="A cute kitten!" className={classes.kittenPic} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default injectSheet(styles)(NotFound);
