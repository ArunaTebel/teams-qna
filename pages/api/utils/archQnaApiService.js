import C from "./consts";
import cookieUtils from "./cookies";
import http from "../../../components/util/httpUtil";

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
    return await http.get(url, options);
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
    return await http.post(url, data, options);
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
    return await http.put(url, data, options);
}

/**
 * Performs a PATCH request to the given url using the options given
 *
 * @param url
 * @param data
 * @param nextReq
 * @param options
 * @returns {Promise<Response>}
 */
async function doPatch(url, data, nextReq, options = {}) {
    options['method'] = 'PATCH';
    if (!options.headers) {
        options.headers = {'Content-Type': 'application/json'};
    }
    options['headers']['Authorization'] = getAuthorizationHeader(nextReq);
    return await http.patch(url, data, options);
}

/**
 * Performs a DELETE request to the given url using the options given
 *
 * @param url
 * @param nextReq
 * @param options
 * @returns {Promise<Response>}
 */
async function doDelete(url, nextReq, options = {}) {
    options['method'] = 'DELETE';
    if (!options.headers) {
        options.headers = {'Content-Type': 'application/json'};
    }
    options['headers']['Authorization'] = getAuthorizationHeader(nextReq);
    return await http.delete(url, options);
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
    const status = r.status;

    if (type === 'json') {
        if (status === 204) {
            response = r;
        } else {
            response = await r.json();
        }
    }

    if (status === 401) {
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
        return await doGet(`${C.API_BASE}/${C.API_BASE_AUTH_PATH}/current-user/`, req).then(async r => {
            return await respondIfAuthorized(r);
        }).catch(async error => await handleApiError(error));
    },

    /**
     * Updates the the given user
     *
     * @param req
     * @param userId
     * @param userData
     * @returns {Promise<*|void>}
     */
    updateUser: async (req, userId, userData) => {
        return await doPatch(`${C.API_PATH}/users/${userId}/`, userData, req).then(async r => {
            return await respondIfAuthorized(r);
        }).catch(async error => await handleApiError(error));
    },

    /**
     * Fetches the activity logs in the given user
     *
     * @param userId
     * @param query
     * @param req
     * @returns {Promise<*|void>}
     */
    fetchUserActivityLogs: async (req, userId, query = '') => {
        return await doGet(`${C.API_PATH}/users/${userId}/activity-logs/?${query}`, req).then(async r => {
            return await respondIfAuthorized(r);
        }).catch(async error => await handleApiError(error));
    },

    /**
     * Fetches the stats of the logged in user
     *
     * @param req
     * @param userId
     * @returns {Promise<*|void>}
     */
    fetchUserStats: async (req, userId) => {
        return await doGet(`${C.API_PATH}/users/${userId}/stats/`, req).then(async r => {
            return await respondIfAuthorized(r, []);
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
     * Fetches the list of questions, the logged in user has asked
     *
     * @param req
     * @param query
     * @returns {Promise<*|void>}
     */
    fetchMyQuestions: async (req, query = '') => {
        return await doGet(`${C.API_PATH}/questions/my-questions/?${query}`, req).then(async r => {
            return await respondIfAuthorized(r, []);
        }).catch(async error => await handleApiError(error));
    },

    /**
     * Fetches the list of answers, the logged in user has given
     *
     * @param req
     * @param query
     * @returns {Promise<*|void>}
     */
    fetchMyAnswers: async (req, query = '') => {
        return await doGet(`${C.API_PATH}/answers/my-answers/?${query}`, req).then(async r => {
            return await respondIfAuthorized(r, []);
        }).catch(async error => await handleApiError(error));
    },

    /**
     * Fetches the list of comments, the logged in user has given to questions
     *
     * @param req
     * @param query
     * @returns {Promise<*|void>}
     */
    fetchMyQuestionComments: async (req, query = '') => {
        return await doGet(`${C.API_PATH}/question-comments/my-comments/?${query}`, req).then(async r => {
            return await respondIfAuthorized(r, []);
        }).catch(async error => await handleApiError(error));
    },

    /**
     * Fetches the list of comments, the logged in user has given to answers
     *
     * @param req
     * @param query
     * @returns {Promise<*|void>}
     */
    fetchMyAnswerComments: async (req, query = '') => {
        return await doGet(`${C.API_PATH}/answer-comments/my-comments/?${query}`, req).then(async r => {
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
        return await doGet(`${C.API_PATH}/teams/${teamId}/`, req).then(async r => {
            return await respondIfAuthorized(r);
        }).catch(async error => await handleApiError(error));
    },

    /**
     * Fetches the questions in the given team
     *
     * @param req
     * @param teamId
     * @param query
     * @returns {Promise<*|void>}
     */
    fetchTeamQuestions: async (req, teamId, query = '') => {
        return await doGet(`${C.API_PATH}/teams/${teamId}/questions/?${query}`, req).then(async r => {
            return await respondIfAuthorized(r, []);
        }).catch(async error => await handleApiError(error));
    },

    /**
     * Fetches the activities in the given team
     *
     * @param req
     * @param teamId
     * @param query
     * @returns {Promise<*|void>}
     */
    fetchTeamActivityLogs: async (req, teamId, query = '') => {
        return await doGet(`${C.API_PATH}/teams/${teamId}/activity-logs/?${query}`, req).then(async r => {
            return await respondIfAuthorized(r, []);
        }).catch(async error => await handleApiError(error));
    },

    /**
     * Fetches the activities in the given question
     *
     * @param req
     * @param questionId
     * @param query
     * @returns {Promise<*|void>}
     */
    fetchQuestionActivityLogs: async (req, questionId, query = '') => {
        return await doGet(`${C.API_PATH}/questions/${questionId}/activity-logs/?${query}`, req).then(async r => {
            return await respondIfAuthorized(r, []);
        }).catch(async error => await handleApiError(error));
    },

    /**
     * Fetches the tags in the given team
     *
     * @param req
     * @param teamId
     * @returns {Promise<*|void>}
     */
    fetchTeamTags: async (req, teamId) => {
        return await doGet(`${C.API_PATH}/teams/${teamId}/tags/`, req).then(async r => {
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
     * Fetch the answer by id
     *
     * @param req
     * @param answerData
     * @returns {Promise<*|void>}
     */
    addAnswer: async (req, answerData) => {
        return await doPost(`${C.API_PATH}/answers/`, answerData, req).then(async r => {
            return await respondIfAuthorized(r);
        }).catch(async error => await handleApiError(error));
    },

    /**
     * Updates the answer having the id
     *
     * @param req
     * @param answerId
     * @param answerData
     * @returns {Promise<any>}
     */
    updateAnswer: async (req, answerId, answerData) => {
        return await doPatch(`${C.API_PATH}/answers/${answerId}/`, answerData, req).then(async r => {
            return await respondIfAuthorized(r);
        }).catch(async error => await handleApiError(error));
    },

    /**
     * Deletes the answer by the given id
     *
     * @param req
     * @param answerId
     * @returns {Promise<*|void>}
     */
    deleteAnswer: async (req, answerId) => {
        return await doDelete(`${C.API_PATH}/answers/${answerId}/`, req).then(async r => {
            return await respondIfAuthorized(r);
        }).catch(async error => await handleApiError(error));
    },

    /**
     * Performs an Up Vote on the Answer having the id
     *
     * @param req
     * @param answerId
     * @returns {Promise<any>}
     */
    upVoteAnswer: async (req, answerId) => {
        return await doPost(`${C.API_PATH}/answers/${answerId}/upvote/`, {}, req).then(async r => {
            return await respondIfAuthorized(r);
        }).catch(async error => await handleApiError(error));
    },

    /**
     * Performs an Down Vote on the Answer having the id
     *
     * @param req
     * @param answerId
     * @returns {Promise<any>}
     */
    downVoteAnswer: async (req, answerId) => {
        return await doPost(`${C.API_PATH}/answers/${answerId}/downvote/`, {}, req).then(async r => {
            return await respondIfAuthorized(r);
        }).catch(async error => await handleApiError(error));
    },

    /**
     * Accepts Answer having the id
     *
     * @param req
     * @param answerId
     * @returns {Promise<any>}
     */
    acceptAnswer: async (req, answerId) => {
        return await doPost(`${C.API_PATH}/answers/${answerId}/accept/`, {}, req).then(async r => {
            return await respondIfAuthorized(r);
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
        return await doGet(`${C.API_PATH}/questions/${questionId}/`, req).then(async r => {
            return await respondIfAuthorized(r);
        }).catch(async error => await handleApiError(error));
    },

    /**
     * Fetch the question by id
     *
     * @param req
     * @param questionData
     * @returns {Promise<*|void>}
     */
    addQuestion: async (req, questionData) => {
        return await doPost(`${C.API_PATH}/questions/`, questionData, req).then(async r => {
            return await respondIfAuthorized(r);
        }).catch(async error => await handleApiError(error));
    },

    /**
     * Updates the question having the id
     *
     * @param req
     * @param questionId
     * @param questionData
     * @returns {Promise<any>}
     */
    updateQuestion: async (req, questionId, questionData) => {
        return await doPatch(`${C.API_PATH}/questions/${questionId}/`, questionData, req).then(async r => {
            return await respondIfAuthorized(r);
        }).catch(async error => await handleApiError(error));
    },

    /**
     * Increment the views on the question having the id
     *
     * @param req
     * @param questionId
     * @returns {Promise<any>}
     */
    upViewQuestion: async (req, questionId) => {
        return await doPost(`${C.API_PATH}/questions/${questionId}/upview/`, {}, req).then(async r => {
            return await respondIfAuthorized(r);
        }).catch(async error => await handleApiError(error));
    },

    /**
     * Performs an Up Vote on the question having the id
     *
     * @param req
     * @param questionId
     * @returns {Promise<any>}
     */
    upVoteQuestion: async (req, questionId) => {
        return await doPost(`${C.API_PATH}/questions/${questionId}/upvote/`, {}, req).then(async r => {
            return await respondIfAuthorized(r);
        }).catch(async error => await handleApiError(error));
    },

    /**
     * Performs an Down Vote on the question having the id
     *
     * @param req
     * @param questionId
     * @returns {Promise<any>}
     */
    downVoteQuestion: async (req, questionId) => {
        return await doPost(`${C.API_PATH}/questions/${questionId}/downvote/`, {}, req).then(async r => {
            return await respondIfAuthorized(r);
        }).catch(async error => await handleApiError(error));
    },

    /**
     * Deletes the question by the given id
     *
     * @param req
     * @param questionId
     * @returns {Promise<*|void>}
     */
    deleteQuestion: async (req, questionId) => {
        return await doDelete(`${C.API_PATH}/questions/${questionId}/`, req).then(async r => {
            return await respondIfAuthorized(r);
        }).catch(async error => await handleApiError(error));
    },

    /**
     * Fetches the comments of the given question
     *
     * @param req
     * @param questionId
     * @param query
     * @returns {Promise<*|void>}
     */
    fetchQuestionComments: async (req, questionId, query = '') => {
        return await doGet(`${C.API_PATH}/questions/${questionId}/comments/?${query}`, req).then(async r => {
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
     * Adds a new comment to the given answer
     *
     * @param req
     * @param answerId
     * @param commentData
     * @returns {Promise<*|void>}
     */
    addAnswerComment: async (req, answerId, commentData) => {
        return await doPost(`${C.API_PATH}/answer-comments/`, commentData, req).then(async r => {
            return await respondIfAuthorized(r);
        }).catch(async error => await handleApiError(error));
    },

    /**
     * Fetches the answer comment having the id
     *
     * @param req
     * @param answerCommentId
     * @returns {Promise<*|void>}
     */
    fetchAnswerComment: async (req, answerCommentId) => {
        return await doGet(`${C.API_PATH}/answer-comments/${answerCommentId}/`, req).then(async r => {
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
        return await doPatch(`${C.API_PATH}/question-comments/${questionCommentId}/`, commentData, req).then(async r => {
            return await respondIfAuthorized(r);
        }).catch(async error => await handleApiError(error));
    },

    /**
     * Updates the answer comment having the id
     *
     * @param req
     * @param answerCommentId
     * @param commentData
     * @returns {Promise<any>}
     */
    updateAnswerComment: async (req, answerCommentId, commentData) => {
        return await doPatch(`${C.API_PATH}/answer-comments/${answerCommentId}/`, commentData, req).then(async r => {
            return await respondIfAuthorized(r);
        }).catch(async error => await handleApiError(error));
    },

    /**
     * Deletes the question comment by the given id
     *
     * @param req
     * @param questionCommentId
     * @returns {Promise<*|void>}
     */
    deleteQuestionComment: async (req, questionCommentId) => {
        return await doDelete(`${C.API_PATH}/question-comments/${questionCommentId}/`, req).then(async r => {
            return await respondIfAuthorized(r);
        }).catch(async error => await handleApiError(error));
    },

    /**
     * Deletes the answer comment by the given id
     *
     * @param req
     * @param answerCommentId
     * @returns {Promise<*|void>}
     */
    deleteAnswerComment: async (req, answerCommentId) => {
        return await doDelete(`${C.API_PATH}/answer-comments/${answerCommentId}/`, req).then(async r => {
            return await respondIfAuthorized(r);
        }).catch(async error => await handleApiError(error));
    },

    /**
     * Fetches the comments of the given answer
     *
     * @param req
     * @param answerId
     * @param query
     * @returns {Promise<*|void>}
     */
    fetchAnswerComments: async (req, answerId, query = '') => {
        return await doGet(`${C.API_PATH}/answers/${answerId}/comments/?${query}`, req).then(async r => {
            return await respondIfAuthorized(r);
        }).catch(async error => await handleApiError(error));
    },
}
