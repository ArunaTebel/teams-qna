import cookieUtils from "./utils/cookies";
import C from "./utils/consts";

const handler = async (req, res) => {
    res.cookie(C.OAUTH.access_token_cookie_name, '', {httpOnly: true, path: '/', expires: new Date('1970-01-01')});
    res.status(200).json({});
};

export default cookieUtils.cookies(handler)
