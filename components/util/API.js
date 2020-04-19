import ArchQnaApiService from "../../pages/api/utils/archQnaApiService";
import http from "./httpUtil";
import apiUtils from "./apiUtils";

export default {

    /**
     * Fetches the currently logged in user in the API server
     *
     * @param req
     * @returns {Promise<*|void>}
     */
    fetchUser: async (req) => {
        let response;
        response = await ArchQnaApiService.fetchUser(req ? req : apiUtils.getProxyRequestWithTokenHeaders());
        return response;
    },

    /**
     * Fetches the list of teams, the logged in user is a member of
     *
     * @param req
     * @returns {Promise<*|void>}
     */
    fetchMyTeams: async (req) => {
        let response;
        response = await ArchQnaApiService.fetchMyTeams(req ? req : apiUtils.getProxyRequestWithTokenHeaders());
        return response;
    },

    /**
     * Fetches the team by id
     *
     * @param req
     * @param teamId
     * @returns {Promise<*|void>}
     */
    fetchTeam: async (req, teamId) => {
        let response;
        response = await ArchQnaApiService.fetchTeam(req ? req : apiUtils.getProxyRequestWithTokenHeaders(), teamId);
        return response;
    },

    /**
     * Fetches the list of tags, of the given team
     *
     * @param req
     * @param teamId
     * @returns {Promise<*|void>}
     */
    fetchTeamTags: async (req, teamId) => {
        return await ArchQnaApiService.fetchTeamTags(req ? req : apiUtils.getProxyRequestWithTokenHeaders(), teamId);
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
        let response;
        response = await ArchQnaApiService.fetchTeamQuestions(req ? req : apiUtils.getProxyRequestWithTokenHeaders(), teamId, query);
        return response;
    },

    /**
     * Fetch the question by id
     *
     * @param req
     * @param questionId
     * @returns {Promise<*|void>}
     */
    fetchQuestion: async (req, questionId) => {
        let response;
        response = await ArchQnaApiService.fetchQuestion(req ? req : apiUtils.getProxyRequestWithTokenHeaders(), questionId);
        return response;
    },

    /**
     * Updates the the given question
     *
     * @param req
     * @param questionId
     * @param questionData
     * @returns {Promise<*|void>}
     */
    updateQuestion: async (req, questionId, questionData) => {
        let response;
        response = await ArchQnaApiService.updateQuestion(req ? req : apiUtils.getProxyRequestWithTokenHeaders(), questionId, questionData);
        return response;
    },

    /**
     * Adds a new question
     *
     * @param req
     * @param questionData
     * @returns {Promise<*|void>}
     */
    addQuestion: async (req, questionData) => {
        let response;
        response = await ArchQnaApiService.addQuestion(req ? req : apiUtils.getProxyRequestWithTokenHeaders(), questionData);
        return response;
    },

    /**
     * Deletes the question by the given id
     *
     * @param req
     * @param questionId
     * @returns {Promise<*|void>}
     */
    deleteQuestion: async (req, questionId) => {
        let response;
        response = await ArchQnaApiService.deleteQuestion(req ? req : apiUtils.getProxyRequestWithTokenHeaders(), questionId);
        if (response.status === 204) {
            return questionId;
        }
    },

    /**
     * Fetches the answers of the given question
     *
     * @param req
     * @param questionId
     * @returns {Promise<*|void>}
     */
    fetchQuestionAnswers: async (req, questionId) => {
        let response;
        response = await ArchQnaApiService.fetchQuestionAnswers(req ? req : apiUtils.getProxyRequestWithTokenHeaders(), questionId);
        return response;
    },

    /**
     * Adds a new question
     *
     * @param req
     * @param answerData
     * @returns {Promise<*|void>}
     */
    addAnswer: async (req, answerData) => {
        let response;
        response = await ArchQnaApiService.addAnswer(req ? req : apiUtils.getProxyRequestWithTokenHeaders(), answerData);
        return response;
    },

    /**
     * Updates the the given answer
     *
     * @param req
     * @param answerId
     * @param answerData
     * @returns {Promise<*|void>}
     */
    updateAnswer: async (req, answerId, answerData) => {
        let response;
        response = await ArchQnaApiService.updateAnswer(req ? req : apiUtils.getProxyRequestWithTokenHeaders(), answerId, answerData);
        return response;
    },

    /**
     * Deletes the answer by the given id
     *
     * @param req
     * @param answerId
     * @returns {Promise<*|void>}
     */
    deleteAnswer: async (req, answerId) => {
        let response;
        response = await ArchQnaApiService.deleteAnswer(req ? req : apiUtils.getProxyRequestWithTokenHeaders(), answerId);
        if (response.status === 204) {
            return answerId;
        }
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
        let response;
        response = await ArchQnaApiService.fetchAnswerComments(req ? req : apiUtils.getProxyRequestWithTokenHeaders(), answerId, query);
        return response;
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
        let response;
        response = await ArchQnaApiService.fetchQuestionComments(req ? req : apiUtils.getProxyRequestWithTokenHeaders(), questionId, query);
        return response;
    },

    /**
     * Fetches the question comment having the id
     *
     * @param req
     * @param questionCommentId
     * @returns {Promise<*|void>}
     */
    fetchQuestionComment: async (req, questionCommentId) => {
        let response;
        response = await ArchQnaApiService.fetchQuestionComment(req ? req : apiUtils.getProxyRequestWithTokenHeaders(), questionCommentId);
        return response;
    },

    /**
     * Fetches the answer comment having the id
     *
     * @param req
     * @param answerCommentId
     * @returns {Promise<*|void>}
     */
    fetchAnswerComment: async (req, answerCommentId) => {
        let response;
        response = await ArchQnaApiService.fetchAnswerComment(req ? req : apiUtils.getProxyRequestWithTokenHeaders(), answerCommentId);
        return response;
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
        let response;
        response = await ArchQnaApiService.addQuestionComment(req ? req : apiUtils.getProxyRequestWithTokenHeaders(), questionId, commentData);
        return response;
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
        let response;
        response = await ArchQnaApiService.addAnswerComment(req ? req : apiUtils.getProxyRequestWithTokenHeaders(), answerId, commentData);
        return response;
    },

    /**
     * Updates the comment of the given question
     *
     * @param req
     * @param questionCommentId
     * @param commentData
     * @returns {Promise<*|void>}
     */
    updateQuestionComment: async (req, questionCommentId, commentData) => {
        let response;
        response = await ArchQnaApiService.updateQuestionComment(req ? req : apiUtils.getProxyRequestWithTokenHeaders(), questionCommentId, commentData);
        return response;
    },

    /**
     * Updates the answer comment
     *
     * @param req
     * @param answerCommentId
     * @param commentData
     * @returns {Promise<*|void>}
     */
    updateAnswerComment: async (req, answerCommentId, commentData) => {
        let response;
        response = await ArchQnaApiService.updateAnswerComment(req ? req : apiUtils.getProxyRequestWithTokenHeaders(), answerCommentId, commentData);
        return response;
    },

    /**
     * Deletes the question comment by the given id
     *
     * @param req
     * @param questionCommentId
     * @returns {Promise<*|void>}
     */
    deleteQuestionComment: async (req, questionCommentId) => {
        let response;
        response = await ArchQnaApiService.deleteQuestionComment(req ? req : apiUtils.getProxyRequestWithTokenHeaders(), questionCommentId);
        if (response.status === 204) {
            return questionCommentId;
        }
    },

    /**
     * Deletes the answer comment by the given id
     *
     * @param req
     * @param answerCommentId
     * @returns {Promise<*|void>}
     */
    deleteAnswerComment: async (req, answerCommentId) => {
        let response;
        response = await ArchQnaApiService.deleteAnswerComment(req ? req : apiUtils.getProxyRequestWithTokenHeaders(), answerCommentId);
        if (response.status === 204) {
            return answerCommentId;
        }
    }
}