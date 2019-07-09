function isUndefined(value)
{
    return typeof value === 'undefined';
}

function isNumber(value)
{
    return typeof value === 'number' && isFinite(value) || value instanceof Number;
}

function isBoolean(value)
{
    return typeof value === 'boolean'|| value instanceof Boolean;
}

function isString(value)
{
    return typeof value === 'string' || value instanceof String;
}

function isObject(value)
{
    return (typeof value === "object" || typeof value === 'function') && (value !== null);
}

function isNull(value) {
    return value === null;
}

function isFunction(value) {
    return value && {}.toString.call(value) === '[object Function]';
}

function isNan(value) {
    return value !== value;
}



