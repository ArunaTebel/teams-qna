import fetch from "isomorphic-unfetch";
import C from "./consts";
import cookieUtils from "./cookies";

export default {

    fetchUser: async (req) => {

        let user = {};
        const accessToken = cookieUtils.extractAccessToken(req);
        if (accessToken) {
            user = await fetch(`${C.API_BASE}/${C.API_BASE_AUTH_PATH}/current-user`, {
                method: 'GET',
                headers: {'Authorization': 'Bearer ' + accessToken}
            }).then(async r => {
                const response = await r.json();
                if (r.status === 403) {
                    return {};
                }
                return response;
            }).catch(error => console.log('error', error));
        }
        return user;

    }

}