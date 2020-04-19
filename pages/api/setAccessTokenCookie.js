import cookieUtils from "./utils/cookies";
import C from "./utils/consts";

const accessTokenHandler = async (req, res) => {
    res.cookie(C.OAUTH.access_token_cookie_name, req.query.access_token, {path: '/'});
    res.status(200).json({});
};

export default cookieUtils.cookies(accessTokenHandler)
