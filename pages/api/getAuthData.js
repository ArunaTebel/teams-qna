import cookieUtils from "./utils/cookies";
import C from "./utils/consts";
import API from "../../components/util/API";

export default async (req, res) => {

    const accessToken = cookieUtils.extractAccessToken(req);
    let userResponseData = await API.fetchUser(req);

    const oAuthConfig = {
        oAuthBaseUrl: `${C.API_BASE}/o/authorize`,
        response_type: C.OAUTH.response_type,
        state: 'arch-teams-qna-oauth-state',
        client_id: C.OAUTH.client_id,
        isLoggedIn: accessToken && accessToken.length > 0 && userResponseData && userResponseData.username,
        userData: userResponseData
    };
    // http://127.0.0.1:8000/o/authorize?response_type=token&state=arch-teams-qna-oauth-state&client_id=UJ90Zr4AQlRbW5d7DZMWrx2LDqAOzrlVPsz8Rx2N
    // http://localhost:3000/auth/login-callback#access_token=H8GH01pZfSsvtS94ldf1FmG976P3ic&expires_in=36000&token_type=Bearer&scope=read+write&state=arch-teams-qna-oauth-state
    oAuthConfig['authorizeUrl'] = `${oAuthConfig.oAuthBaseUrl}?response_type=${oAuthConfig.response_type}&state=${oAuthConfig.state}&client_id=${oAuthConfig.client_id}`;

    res.status(200).json(oAuthConfig);
};
