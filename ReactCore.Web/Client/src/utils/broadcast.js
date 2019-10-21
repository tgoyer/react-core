import { toast } from "react-toastify";
import { css } from 'glamor';

import theme from '../theme';

export const error = (message) => toast.error(message, {
    className: css({
        background: '#990000 !important',
        boxShadow: '2px 2px 20px 2px rgba(0,0,0,0.5)'
    }),
    bodyClassName: css({
        color: '#fff',
        fontFamily: "'Lato', sans-serif",
        fontSize: 16,
        padding: 20,
    })
});

export const message = (message) => toast(message, {
    className: css({
        background: `${theme.colors.accent.color} !important`,
        boxShadow: '2px 2px 20px 2px rgba(0,0,0,0.5)'
    }),
    bodyClassName: css({
        color: theme.colors.accent.text,
        fontFamily: "'Lato', sans-serif",
        fontSize: 16,
        padding: 20,
    })
});

export const success = (message) => toast.success(message, {
    className: css({
        backgroundColor: '#009900 !important',
        boxShadow: '2px 2px 20px 2px rgba(0,0,0,0.5)'
    }),
    bodyClassName: css({
        fontFamily: "'Lato', sans-serif",
        fontSize: 16,
        padding: 20,
    })
});

export const warning = (message) => toast.warn(message, {
    className: css({
        background: '#ff7700 !important',
        boxShadow: '2px 2px 20px 2px rgba(0,0,0,0.5)'
    }),
    bodyClassName: css({
        color: '#fff',
        fontFamily: "'Lato', sans-serif",
        fontSize: 16,
        padding: 20,
    })
});

export default {
    error,
    message,
    success,
    warning,
}