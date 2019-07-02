import React from 'react';
import injectSheet from "react-jss";

const styles = theme => ({
    title: {
        ...theme.fonts.title,
    },
    subtitle: {
        ...theme.fonts.subtitle,
    },
    body: {
        '& code': {
            backgroundColor: '#ccc',
            margin: 5,
            padding: 5,
        },
        '& dd': {
            padding: 10,
        }
    }
});

const Home = (props) => {
    const {classes} = props;

    return (
        <React.Fragment>
            <div className={classes.title}>Home</div>
            <div className={classes.body}>
                <p className={classes.subtitle}>This project was bootstrapped with <a href="https://github.com/facebook/create-react-app">Create React App</a>.</p>
                <p><strong>Available Scripts</strong></p>
                <dl>
                    <dt><code>npm run start</code></dt>
                    <dd>
                        Runs the app in the development mode.  Open <a href="http://localhost:3000">http://localhost:3000</a> to view it in the browser.<br/><br/>
                        The page will reload if you make edits.  You will also see any lint errors in the console.<br/><br/>
                    </dd>
                    <dt><code>npm run test</code></dt>
                    <dd>
                        Launches the test runner in the interactive watch mode.<br/><br/>
                        See the section about <a href="https://facebook.github.io/create-react-app/docs/running-tests">running tests</a> for more information.<br/><br/>
                    </dd>
                    <dt><code>npm run build</code></dt>
                    <dd>
                        Builds the app for production to the "build" folder.<br/><br/>
                        It correctly bundles React in production mode and optimizes the build for the best performance.  The build is minified and the filenames include the hashes.  Your app is ready to be deployed!  See the section about <a href="https://facebook.github.io/create-react-app/docs/deployment">deployment</a> for more information.<br/><br/>
                    </dd>
                </dl>
                <p><strong>Learn More</strong></p>
                <p>You can learn more in the <a href="https://facebook.github.io/create-react-app/docs/getting-started">Create React App documentation</a>.</p>
                <p>To learn React, check out the <a href="https://reactjs.org/">React documentation</a>.</p>
            </div>
        </React.Fragment>

    );
}

export default injectSheet(styles)(Home);