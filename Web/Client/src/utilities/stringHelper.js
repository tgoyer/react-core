export const padEnd = (value, targetLength, padString) => {
    const padding = createPad(value, targetLength, padString);
    return String(value) + padding.slice(0, targetLength);
};

export const padStart = (value, targetLength, padString) => {
    const padding = createPad(value, targetLength, padString);
    return padding.slice(0, targetLength) + String(value);
};

export const contains = (value, search) => (value == null || value === '' ? false : String(value).indexOf(search) >= 0);

export const isNullOrEmpty = (value) => value == null || String(value).trim() === '';

const createPad = (value, targetLength, padString) => {
    targetLength = targetLength >> 0;
    padString = String(typeof padString !== 'undefined' ? padString : ' ');

    if (value.length >= targetLength) {
        return String(value);
    } else {
        targetLength = targetLength - value.length;
        if (targetLength > padString.length) {
            padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
        }
        return padString.slice(0, targetLength);
    }
};
