module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/**/*.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'Helvetica', 'Arial', 'Lucida Grande', 'sans-serif'],
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
