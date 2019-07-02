import { contains } from './stringHelper';

const sslPort = 8001;
const servers = {
    'localhost': 'LOCAL',
    '.com': 'PRODUCTION'
}

/**
 * @description Generate a 10 character unique string value.
 */
export const generateId = () => [...Array(10)].map(() => Math.random().toString(36)[3]).join('');

export const getEnvironment = () => {
    const host = String(window.location.host).toLowerCase();
    const serverKeys = Object.keys(servers);

    for (let x = 0; x < serverKeys.length; x++) {
        if (contains(host, serverKeys[x])) return servers[serverKeys[x]];
    }

    return '';
}

export const getResourceUrl = (resourcePath, version = 'v1') => {
    const api = getEnvironment() === 'LOCAL'
        ? `http://localhost:${sslPort}/api/${version}`
        : `/api/${version}`;

    return resourcePath == null || resourcePath === ''
        ? api
        : String(resourcePath).startsWith('/')
            ? api + resourcePath
            : api + '/' + resourcePath;
}

/**
 * @description Retrieve values from the URL Query string
 * @param {String} key The query string parameter key used to retieve the value.
 * @returns The value corresponding with the supplied key.
 */
export const getUrlParameter = (key) => {
    key = key.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + key + '=([^&#]*)');
    const results = regex.exec(window.location.search);
    return results === null 
        ? '' 
        : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
