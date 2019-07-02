import React from 'react'
import injectSheet from "react-jss";

import { Link } from 'react-router-dom';

import { getUrlParameter } from '../../utils/layoutHelper';

const styles = theme => ({
    container: {
        position: 'relative',
        height: '100%',
        width: '100%',
    },
    content: {
        position: 'absolute',
        top: 'calc(25% - 150px)',
        left: 'calc(50% - 250px)',

        boxShadow: '2px 2px 4px #888888',
        padding: 40,
        height: 350,
        width: 500,

        background: '#ffffff'
    },
    internal: {
        position: 'relative',
    },
    fourOhFour: {
        fontSize: 120,
        fontWeight: 700,
        lineHeight: '100px',
        textAlign: 'center',
    },
    helpList: {
        paddingBottom: 4
    },
    helpText: {
        fontSize: 12,
        '& p': {
            marginLeft: 30
        },
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
    title: {
        fontSize: 16,
        fontWeight: 700,
        margin: '40px 0 10px',
    },
});

const NotFound = (props) => {
    const { classes } = props;
    const [ kittyMode, setKittyMode ] = React.useState(getUrlParameter('kitten-mode') !== '');

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
                    <div className={classes.helpText}>
                        <p className={classes.helpList}>
                            Perhaps you are here because:
                            <ul>
                                <li>The page has moved.</li>
                                <li>The page no longer exists.</li>
                                <li>You were looking for data and it's stuck in the inter-tubes.</li>
                                <li>Perhaps you just like 404 pages?  Probably not.</li>
                            </ul>
                        </p>
                        <strong><Link to='/'>Go back home</Link></strong>
                        { kittyMode === false && <a href="/" onClick={handleKittenLink}className={classes.kittenLink}>(Don't click this link...)</a> }
                    </div>
                </div>
                { kittyMode === true && (
                    <div className={classes.kittenContainer}>
                        <img src={process.env.PUBLIC_URL + '/images/kitten.jpg'} alt="A cute kitten!" className={classes.kittenPic} />
                        <p>All is not lost.  Here's a cute kitten!</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default injectSheet(styles)(NotFound);
