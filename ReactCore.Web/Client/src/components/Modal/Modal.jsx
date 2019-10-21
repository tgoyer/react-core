import React from 'react';
import { createPortal } from 'react-dom';
import injectSheet from "react-jss";

import { Button } from '../Forms';


import usePortal from '../../hooks/usePortal';

const styles = theme => ({
    actions: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    background: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        backgroundColor: '#000000',
        opacity: 0.5,
    },
    card: {
        position: 'relative',
        minWidth: 400,
        zIndex: 10,
        marginBottom: 100,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        padding: 15,
        boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.3)',
        width: '50%',
    },
    wrapper: {
        position: 'fixed',  
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',  
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const Modal = ({ classes, onClose, onCancel, children, show }) => {
    const mountPoint = usePortal('app_modal');
    const [childState, setChildState] = React.useState(null);

    const handleCloseClick = () => {
        if (onClose != null) {
            onClose(childState);
        }
    }

    const handleCancelClick = () => {
        if (onCancel != null) {
            onCancel();
        }
    }

    const handleChildChange = (state) => {
        setChildState(state);
    }

    return createPortal((
        show && (
            <div className={classes.wrapper}>
                <div className={classes.card}>
                    { children({ onChange: handleChildChange  }) }
                    <div className={classes.actions}>
                        <Button type="primary" className={classes.close} onClick={handleCloseClick}>Ok</Button>
                        <Button type="secondary" className={classes.close} onClick={handleCancelClick}>Cancel</Button>
                    </div>
                </div>
                <div className={classes.background} onClick={handleCloseClick}></div>
            </div>
        )
    ), mountPoint);
}

export default injectSheet(styles)(Modal);