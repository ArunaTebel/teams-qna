import cookieUtils from "./utils/cookies";
import ArchQnaApiService from './utils/archQnaApiService'
import C from "./utils/consts";

export default async (req, res) => {

    const accessToken = cookieUtils.extractAccessToken(req);
    let userResponseData = await ArchQnaApiService.fetchUser(req);

    const oAuthConfig = {
        oAuthBaseUrl: `${C.API_BASE}/o/authorize`,
        response_type: 'code',
        state: 'arch-teams-qna-oauth-state',
        client_id: C.OAUTH.client_id,
        isLoggedIn: accessToken && accessToken.length > 0 && userResponseData && userResponseData.username,
        userData: userResponseData
    };

    oAuthConfig['authorizeUrl'] = `${oAuthConfig.oAuthBaseUrl}?response_type=${oAuthConfig.response_type}&state=${oAuthConfig.state}&client_id=${oAuthConfig.client_id}`;

    res.status(200).json(oAuthConfig);
};
