import fetch from "isomorphic-unfetch";
import C from "./consts";
import cookieUtils from "./cookies";
import httpUtil from "../../../components/util/httpUtil";

/**
 * Returns the Authorization header populated with the bearer access token
 *
 * @param nextReq
 * @returns {{Authorization: string}}
 */
function getAuthorizationHeader(nextReq) {
    return 'Bearer ' + cookieUtils.extractAccessToken(nextReq)
}

/**
 * Performs a GET request to the given url using the options given
 *
 * @param url
 * @param nextReq
 * @param options
 * @returns {Promise<Response>}
 */
async function doGet(url, nextReq, options = {}) {
    options['method'] = 'GET';
    if (!options.headers) {
        options.headers = {};
    }
    options['headers']['Authorization'] = getAuthorizationHeader(nextReq);
    return await httpUtil.get(url, options);
}

/**
 * Performs a POST request to the given url using the options given
 *
 * @param url
 * @param data
 * @param nextReq
 * @param options
 * @returns {Promise<Response>}
 */
async function doPost(url, data, nextReq, options = {}) {
    options['method'] = 'POST';
    if (!options.headers) {
        options.headers = {'Content-Type': 'application/json'};
    }
    options['headers']['Authorization'] = getAuthorizationHeader(nextReq);
    return await httpUtil.post(url, data, options);
}

/**
 * Performs a PUT request to the given url using the options given
 *
 * @param url
 * @param data
 * @param nextReq
 * @param options
 * @returns {Promise<Response>}
 */
async function doPut(url, data, nextReq, options = {}) {
    options['method'] = 'PUT';
    if (!options.headers) {
        options.headers = {'Content-Type': 'application/json'};
    }
    options['headers']['Authorization'] = getAuthorizationHeader(nextReq);
    return await httpUtil.put(url, data, options);
}

/**
 * Handles and mitigate the errors in the HTTP request
 * TODO: Implement this function to properly log the errors
 *
 * @param error
 */
async function handleApiError(error) {
    console.log('error', error);
    return error;
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
    if (r.status === 401) {
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
        return await doGet(`${C.API_BASE}/${C.API_BASE_AUTH_PATH}/current-user`, req).then(async r => {
            return await respondIfAuthorized(r);
        }).catch(async error => await handleApiError(error));
    },

    /**
     * Fetches the list of teams, the logged in user is a member of
     *
     * @param req
     * @returns {Promise<*|void>}
     */
    fetchMyTeams: async (req) => {
        return await doGet(`${C.API_PATH}/teams/my-teams/`, req).then(async r => {
            return await respondIfAuthorized(r, []);
        }).catch(async error => await handleApiError(error));
    },

    /**
     * Fetches the team by id
     *
     * @param req
     * @param teamId
     * @returns {Promise<*|void>}
     */
    fetchTeam: async (req, teamId) => {
        return await doGet(`${C.API_PATH}/teams/${teamId}`, req).then(async r => {
            return await respondIfAuthorized(r);
        }).catch(async error => await handleApiError(error));
    },

    /**
     * Fetches the questions in the given team
     *
     * @param req
     * @param teamId
     * @returns {Promise<*|void>}
     */
    fetchTeamQuestions: async (req, teamId) => {
        return await doGet(`${C.API_PATH}/teams/${teamId}/questions/`, req).then(async r => {
            return await respondIfAuthorized(r, []);
        }).catch(async error => await handleApiError(error));
    },

    /**
     * Fetches the answers of the given question
     *
     * @param req
     * @param questionId
     * @returns {Promise<*|void>}
     */
    fetchQuestionAnswers: async (req, questionId) => {
        return await doGet(`${C.API_PATH}/questions/${questionId}/answers/`, req).then(async r => {
            return await respondIfAuthorized(r, []);
        }).catch(async error => await handleApiError(error));
    },

    /**
     * Fetch the question by id
     *
     * @param req
     * @param questionId
     * @returns {Promise<*|void>}
     */
    fetchQuestion: async (req, questionId) => {
        return await doGet(`${C.API_PATH}/questions/${questionId}`, req).then(async r => {
            return await respondIfAuthorized(r);
        }).catch(async error => await handleApiError(error));
    },

    /**
     * Fetches the comments of the given question
     *
     * @param req
     * @param questionId
     * @returns {Promise<*|void>}
     */
    fetchQuestionComments: async (req, questionId) => {
        return await doGet(`${C.API_PATH}/questions/${questionId}/comments/`, req).then(async r => {
            return await respondIfAuthorized(r);
        }).catch(async error => await handleApiError(error));
    },

    /**
     * Adds a new comment to the given question
     *
     * @param req
     * @param questionId
     * @param commentData
     * @returns {Promise<*|void>}
     */
    addQuestionComment: async (req, questionId, commentData) => {
        return await doPost(`${C.API_PATH}/question-comments/`, commentData, req).then(async r => {
            return await respondIfAuthorized(r);
        }).catch(async error => await handleApiError(error));
    },

    /**
     * Fetches the question comment having the id
     *
     * @param req
     * @param questionCommentId
     * @returns {Promise<*|void>}
     */
    fetchQuestionComment: async (req, questionCommentId) => {
        return await doGet(`${C.API_PATH}/question-comments/${questionCommentId}/`, req).then(async r => {
            return await respondIfAuthorized(r);
        }).catch(async error => await handleApiError(error));
    },

    /**
     * Updates the question comment having the id
     *
     * @param req
     * @param questionCommentId
     * @param commentData
     * @returns {Promise<any>}
     */
    updateQuestionComment: async (req, questionCommentId, commentData) => {
        return await doPut(`${C.API_PATH}/question-comments/${questionCommentId}/`, commentData, req).then(async r => {
            return await respondIfAuthorized(r);
        }).catch(async error => await handleApiError(error));
    },

    /**
     * Fetches the comments of the given answer
     *
     * @param req
     * @param answerId
     * @returns {Promise<*|void>}
     */
    fetchAnswerComments: async (req, answerId) => {
        return await doGet(`${C.API_PATH}/answers/${answerId}/comments/`, req).then(async r => {
            return await respondIfAuthorized(r);
        }).catch(async error => await handleApiError(error));
    },
}
