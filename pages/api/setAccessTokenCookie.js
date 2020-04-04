import FormData from "isomorphic-form-data";
import fetch from "isomorphic-unfetch";
import cookieUtils from "./utils/cookies";
import C from "./utils/consts";

const accessTokenHandler = async (req, res) => {

    const data = new FormData();
    data.append("grant_type", C.OAUTH.grant_type);
    data.append("code", req.query.code);
    data.append("client_id", C.OAUTH.client_id);
    data.append("client_secret", C.OAUTH.client_secret);
    data.append("redirect_uri", C.OAUTH.redirect_uri);

    const tokenResponseData = await fetch(`${C.API_BASE}/o/token/`, {
        method: 'POST',
        body: data
    }).then(async r => {
        return await r.json();
    }).catch(error => console.log('error', error));

    res.cookie(C.OAUTH.access_token_cookie_name, tokenResponseData['access_token'], {httpOnly: true, path: '/'});
    res.status(200).json({});
};

export default cookieUtils.cookies(accessTokenHandler)
