export const contains = (value, search) => {
    return value == null || value === ''
        ? false
        : String(value).indexOf(search) >= 0;
}