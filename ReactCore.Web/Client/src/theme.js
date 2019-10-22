const colors = {
    primary: {
        color: '#9e5c00',
        text: '#ffffff',
    },
    secondary: {
        color: '#663c00',
        text: '#ffffff',
    },

    accent: {
        color: '#e67300',
        text: '#ffffff',
    },
    complement: {
        color: '#00429e',
        text: '#ffffff',
    },
    
    content: {
        color: '#eeeeee',
        text: '#000000',
    },
    disabled: {
        color: '#cccccc',
        text: '#999999',
    },
    
    alert: {
        color: '#990000',
        text: '#ffffff',
    },
    success: {
        color: '#006600',
        text: '#ffffff',
    },
    warning: {
        color: '#c99703',
        text: '#000000',
    }
}

const fontWeights = {
    bold: 700,
    normal: 500,
}

const fonts = {
    weights: fontWeights,
    text: {
        color: colors.content.text,
        fontSize: 12,
        fontWeight: fontWeights.normal,
        fontFamily: `'Lato', sans-serif`,
    },
    title: {
        color: colors.content.text,
        fontSize: 24,
        fontWeight: fontWeights.normal,
        fontFamily: `'Montserrat', sans-serif`,
    },
    subtitle: {
        color: colors.content.text,
        fontSize: 16,
        fontWeight: fontWeights.normal,
        fontFamily: `'Montserrat', sans-serif`,
    },
    link: {
        color: colors.content.text,
        fontWeight: fontWeights.normal,
        fontFamily: `'Lato', sans-serif`,
        textDecoration: 'none',
        '&:hover': {
            color: colors.content.text,
            textDecoration: 'underline',
        },
        '&:active': {
            color: colors.content.text,
        },
        '&:visted': {
            color: colors.content.text,
        },
    },
}

export default {
    colors,
    fonts,
};