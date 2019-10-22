import { toast } from "react-toastify";
import { css } from 'glamor';

import theme from '../theme';

const getClassName = (themeColor) => ({
    background: `${themeColor.color} !important`,
    boxShadow: '2px 2px 20px 2px rgba(0,0,0,0.5)',
    color: themeColor.text,
});

const bodyClassName = {
    fontFamily: "'Lato', sans-serif",
    fontSize: 16,
    padding: 20,
}

export const error = (message) => toast.error(message, {
    className: css({ ...getClassName(theme.colors.alert) }),
    bodyClassName: css({ ...bodyClassName })
});

export const message = (message) => toast(message, {
    className: css({ ...getClassName(theme.colors.complement) }),
    bodyClassName: css({ ...bodyClassName })
});

export const success = (message) => toast.success(message, {
    className: css({ ...getClassName(theme.colors.success) }),
    bodyClassName: css({ ...bodyClassName })
});

export const warning = (message) => toast.warn(message, {
    className: css({ ...getClassName(theme.colors.warning) }),
    bodyClassName: css({ ...bodyClassName })
});

export default {
    error,
    message,
    success,
    warning,
}