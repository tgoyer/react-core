import { contains } from 'utilities/stringHelper';

const base = 13; // the base root rem value.  Update this if you change the font-size in the app.js and/or view html, body css declaration.
const sslPort = 44396;

export const getEnvironment = () => {
    const host = String(window.location.host).toLowerCase();

    if (contains(host, 'localhost')) return 'LOCAL';
    if (contains(host, 'rw-vdev')) return 'DEVELOPMENT';
    if (contains(host, 'rw-uat') || contains(host, 'rw-qa')) return 'TEST';
    if (contains(host, 'rw.acml.com')) return 'PRODUCTION';

    return '';
};

export const getResourceUrl = (resourcePath, version = 'v1') => {
    const api = getEnvironment() === 'LOCAL' ? `https://localhost:${sslPort}/api/${version}` : `/api/${version}`;
    return resourcePath == null || resourcePath === '' ? api : String(resourcePath).startsWith('/') ? api + resourcePath : api + '/' + resourcePath;
};

/**
 * @description Convert pixel values to relative em value based on the root html/body
 *              font-size.  This allows us to stil use "pixel" values in the styling,
 *              but render to rem for responsiveness.
 * @param {Number} pixels The pixel value to convert to rem
 * @param {bool} useImportant Add the !important clause onto the returned setting
 * @param {Number} basePixels An optional override in case you want to base the calculation on a value
 *              different from the root font-size.
 * @returns {String} The appropriate rem value for a CSS/Style rule.
 */
export const pxToRem = (pixels, useImportant = false, basePixels = base) => {
    // const dpr = window.devicePixelRatio || 1;
    if (pixels == null) pixels = basePixels;

    return `${pixels / basePixels}rem${useImportant ? ' !important' : ''}`;
};
