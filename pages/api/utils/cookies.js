import {serialize} from 'cookie'
import C from "./consts";

/**
 * This sets `cookie` on `res` object
 */
const cookie = (res, name, value, options = {}) => {
    const stringValue =
        typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value);

    if ('maxAge' in options) {
        options.expires = new Date(Date.now() + options.maxAge);
        options.maxAge /= 1000
    }

    res.setHeader('Set-Cookie', serialize(name, String(stringValue), options))
};

/**
 * Adds `cookie` function on `res.cookie` to set cookies for response
 */
const cookies = handler => (req, res) => {
    res.cookie = (name, value, options) => cookie(res, name, value, options);

    return handler(req, res)
};

const extractAccessToken = (req) => {
    let accessToken = false;
    const cookieString = req.headers ? req.headers.cookie : false;
    if (cookieString && cookieString.length > 0) {
        const cookieStringParts = cookieString.split(`${C.OAUTH.access_token_cookie_name}=`);
        if (cookieStringParts && cookieStringParts.length > 1) {
            const accessTokenCookieString = cookieStringParts[1];
            const accessTokenCookieStringParts = accessTokenCookieString.split(';');
            accessToken = accessTokenCookieStringParts[0];
        }
    }
    return accessToken;
};

export default {cookies: cookies, extractAccessToken: extractAccessToken}