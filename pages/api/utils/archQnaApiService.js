import fetch from "isomorphic-unfetch";
import C from "./consts";
import cookieUtils from "./cookies";

function getAuthorizedHeaders(nextReq) {
    return {'Authorization': 'Bearer ' + cookieUtils.extractAccessToken(nextReq)}
}

async function doApiRequest(url, nextReq, method = 'GET', options = {}) {
    options['method'] = method;
    options['headers'] = getAuthorizedHeaders(nextReq);
    return await fetch(url, options);
}

function handleApiError(error) {
    console.log('error', error); //TODO: Implement this function to properly log the errors
}

export default {

    fetchUser: async (req) => {

        return await doApiRequest(`${C.API_BASE}/${C.API_BASE_AUTH_PATH}/current-user`, req).then(async r => {
            let response = await r.json();
            if (r.status === 403) {
                response = {};
            }
            return response;
        }).catch(error => handleApiError(error));

    },

    listTeams: async (req) => {
        return await doApiRequest(`${C.API_BASE}/${C.API_BASE_API_PATH}/teams/my_teams/`, req).then(async r => {
            let response = await r.json();
            if (r.status === 403) {
                response = [];
            }
            return response;
        }).catch(error => handleApiError(error));
    },

    getTeam: async (req, teamId) => {
        return await doApiRequest(`${C.API_BASE}/${C.API_BASE_API_PATH}/teams/${teamId}`, req).then(async r => {
            return await r.json();
        }).catch(error => handleApiError(error));
    }

}