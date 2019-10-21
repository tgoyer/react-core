const colors = {
    accent: {
        color: '#00429e',
        text: '#ffffff',
    },
    primary: {
        color: '#f0f0f0',
        text: '#000000',
    },
    secondary: {
        color: '#663c00',
        text: '#ffffff',
    },
    tertiary: {
        color: '#333333',
        text: '#ffffff',
    },
    disabled: {
        color: '#cccccc',
        text: '#999999',
    },
    alert: {
        color: '#ffeeee',
        text: '#660000',
    }
}

const fontWeights = {
    bold: 700,
    normal: 500,
}

const fonts = {
    weights: fontWeights,
    text: {
        color: colors.primary.text,
        fontSize: 12,
        fontWeight: fontWeights.normal,
        fontFamily: `'Lato', sans-serif`,
    },
    title: {
        color: colors.primary.text,
        fontSize: 24,
        fontWeight: fontWeights.normal,
        fontFamily: `'Montserrat', sans-serif`,
    },
    subtitle: {
        color: colors.primary.text,
        fontSize: 16,
        fontWeight: fontWeights.normal,
        fontFamily: `'Montserrat', sans-serif`,
    },
    link: {
        color: colors.primary.text,
        fontWeight: fontWeights.normal,
        fontFamily: `'Lato', sans-serif`,
        textDecoration: 'none',
        '&:hover': {
            color: colors.primary.text,
            textDecoration: 'underline',
        },
        '&:active': {
            color: colors.primary.text,
        },
        '&:visted': {
            color: colors.primary.text,
        },
    },
}

export default {
    colors,
    fonts,
};