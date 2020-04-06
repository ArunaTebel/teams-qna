import fetch from "isomorphic-unfetch";
import C from "./consts";
import cookieUtils from "./cookies";

/**
 * Returns the Authorization header populated with the bearer access token
 *
 * @param nextReq
 * @returns {{Authorization: string}}
 */
function getAuthorizedHeaders(nextReq) {
    return {'Authorization': 'Bearer ' + cookieUtils.extractAccessToken(nextReq)}
}

/**
 * Performs an HTTP request to the given url using the options given
 *
 * @param url
 * @param nextReq
 * @param method
 * @param options
 * @returns {Promise<Response>}
 */
async function doApiRequest(url, nextReq, method = 'GET', options = {}) {
    options['method'] = method;
    options['headers'] = getAuthorizedHeaders(nextReq);
    return await fetch(url, options);
}

/**
 * Handles and mitigate the errors in the HTTP request
 * TODO: Implement this function to properly log the errors
 *
 * @param error
 */
function handleApiError(error) {
    console.log('error', error);
}

/**
 * This function will returns the data (in the given format) from the http response. If the response status is 403, it will return the provided response
 *
 * @param r
 * @param type
 * @param unAuthorizedResponse
 * @returns {Promise<any>}
 */
async function respondIfAuthorized(r, unAuthorizedResponse = {}, type = 'json') {
    let response = {};
    if (type === 'json') {
        response = await r.json();
    }
    if (r.status === 403) {
        response = unAuthorizedResponse;
    }
    return response;
}

export default {

    /**
     * Fetches the currently logged in user in the API server
     *
     * @param req
     * @returns {Promise<*|void>}
     */
    fetchUser: async (req) => {
        return await doApiRequest(`${C.API_BASE}/${C.API_BASE_AUTH_PATH}/current-user`, req).then(async r => {
            return await respondIfAuthorized(r);
        }).catch(error => handleApiError(error));
    },

    /**
     * Fetches the list of teams, the logged in user is a member of
     *
     * @param req
     * @returns {Promise<*|void>}
     */
    fetchMyTeams: async (req) => {
        return await doApiRequest(`${C.API_PATH}/teams/my-teams/`, req).then(async r => {
            return await respondIfAuthorized(r, []);
        }).catch(error => handleApiError(error));
    },

    /**
     * Fetches the team by id
     *
     * @param req
     * @param teamId
     * @returns {Promise<*|void>}
     */
    fetchTeam: async (req, teamId) => {
        return await doApiRequest(`${C.API_PATH}/teams/${teamId}`, req).then(async r => {
            return await respondIfAuthorized(r);
        }).catch(error => handleApiError(error));
    },

    /**
     * Fetches the questions in the given team
     *
     * @param req
     * @param teamId
     * @returns {Promise<*|void>}
     */
    fetchTeamQuestions: async (req, teamId) => {
        return await doApiRequest(`${C.API_PATH}/teams/${teamId}/questions/`, req).then(async r => {
            return await respondIfAuthorized(r, []);
        }).catch(error => handleApiError(error));
    },

    /**
     * Fetches the answers of the given question
     *
     * @param req
     * @param questionId
     * @returns {Promise<*|void>}
     */
    fetchQuestionAnswers: async (req, questionId) => {
        return await doApiRequest(`${C.API_PATH}/questions/${questionId}/answers/`, req).then(async r => {
            return await respondIfAuthorized(r, []);
        }).catch(error => handleApiError(error));
    },

    /**
     * Fetch the question by id
     *
     * @param req
     * @param questionId
     * @returns {Promise<*|void>}
     */
    fetchQuestion: async (req, questionId) => {
        return await doApiRequest(`${C.API_PATH}/questions/${questionId}`, req).then(async r => {
            return await respondIfAuthorized(r);
        }).catch(error => handleApiError(error));
    },

    /**
     * Fetches the comments of the given question
     *
     * @param req
     * @param questionId
     * @returns {Promise<*|void>}
     */
    fetchQuestionComments: async (req, questionId) => {
        return await doApiRequest(`${C.API_PATH}/questions/${questionId}/comments/`, req).then(async r => {
            return await respondIfAuthorized(r);
        }).catch(error => handleApiError(error));
    },

    /**
     * Fetches the comments of the given answer
     *
     * @param req
     * @param answerId
     * @returns {Promise<*|void>}
     */
    fetchAnswerComments: async (req, answerId) => {
        return await doApiRequest(`${C.API_PATH}/answers/${answerId}/comments/`, req).then(async r => {
            return await respondIfAuthorized(r);
        }).catch(error => handleApiError(error));
    },
}
