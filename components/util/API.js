import ArchQnaApiService from "../../pages/api/utils/archQnaApiService";
import apiUtils from "./apiUtils";

export default {

    /**
     * Fetches the currently logged in user in the API server
     *
     * @param req
     * @returns {Promise<*|void>}
     */
    fetchUser: async (req = false) => {
        return await ArchQnaApiService.fetchUser(req ? req : apiUtils.getProxyRequestWithTokenHeaders());
    },

    /**
     * Fetches the list of teams, the logged in user is a member of
     *
     * @param req
     * @returns {Promise<*|void>}
     */
    fetchMyTeams: async (req = false) => {
        return await ArchQnaApiService.fetchMyTeams(req ? req : apiUtils.getProxyRequestWithTokenHeaders());
    },

    /**
     * Fetches the team by id
     *
     * @param req
     * @param teamId
     * @returns {Promise<*|void>}
     */
    fetchTeam: async (teamId, req = false) => {
        return await ArchQnaApiService.fetchTeam(req ? req : apiUtils.getProxyRequestWithTokenHeaders(), teamId);
    },

    /**
     * Fetches the list of tags, of the given team
     *
     * @param req
     * @param teamId
     * @returns {Promise<*|void>}
     */
    fetchTeamTags: async (teamId, req = false) => {
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
    fetchTeamQuestions: async (teamId, query = '', req = false) => {
        return await ArchQnaApiService.fetchTeamQuestions(req ? req : apiUtils.getProxyRequestWithTokenHeaders(), teamId, query);
    },

    /**
     * Fetch the question by id
     *
     * @param req
     * @param questionId
     * @returns {Promise<*|void>}
     */
    fetchQuestion: async (questionId, req = false) => {
        return await ArchQnaApiService.fetchQuestion(req ? req : apiUtils.getProxyRequestWithTokenHeaders(), questionId);
    },

    /**
     * Updates the the given question
     *
     * @param req
     * @param questionId
     * @param questionData
     * @returns {Promise<*|void>}
     */
    updateQuestion: async (questionId, questionData, req = false) => {
        return await ArchQnaApiService.updateQuestion(req ? req : apiUtils.getProxyRequestWithTokenHeaders(), questionId, questionData);
    },

    /**
     * Increment the views on the question having the id
     *
     * @param req
     * @param questionId
     * @returns {Promise<*|void>}
     */
    upViewQuestion: async (questionId, req = false) => {
        return await ArchQnaApiService.upViewQuestion(req ? req : apiUtils.getProxyRequestWithTokenHeaders(), questionId);
    },

    /**
     * Performs an Up Vote on the question having the id
     *
     * @param req
     * @param questionId
     * @returns {Promise<*|void>}
     */
    upVoteQuestion: async (questionId, req = false) => {
        return await ArchQnaApiService.upVoteQuestion(req ? req : apiUtils.getProxyRequestWithTokenHeaders(), questionId);
    },

    /**
     * Performs an Down Vote on the question having the id
     *
     * @param req
     * @param questionId
     * @returns {Promise<*|void>}
     */
    downVoteQuestion: async (questionId, req = false) => {
        return await ArchQnaApiService.downVoteQuestion(req ? req : apiUtils.getProxyRequestWithTokenHeaders(), questionId);
    },

    /**
     * Adds a new question
     *
     * @param req
     * @param questionData
     * @returns {Promise<*|void>}
     */
    addQuestion: async (questionData, req = false) => {
        return await ArchQnaApiService.addQuestion(req ? req : apiUtils.getProxyRequestWithTokenHeaders(), questionData);
    },

    /**
     * Deletes the question by the given id
     *
     * @param req
     * @param questionId
     * @returns {Promise<*|void>}
     */
    deleteQuestion: async (questionId, req = false) => {
        let response = await ArchQnaApiService.deleteQuestion(req ? req : apiUtils.getProxyRequestWithTokenHeaders(), questionId);
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
    fetchQuestionAnswers: async (questionId, req = false) => {
        return await ArchQnaApiService.fetchQuestionAnswers(req ? req : apiUtils.getProxyRequestWithTokenHeaders(), questionId);
    },

    /**
     * Adds a new question
     *
     * @param req
     * @param answerData
     * @returns {Promise<*|void>}
     */
    addAnswer: async (answerData, req = false) => {
        return await ArchQnaApiService.addAnswer(req ? req : apiUtils.getProxyRequestWithTokenHeaders(), answerData);
    },

    /**
     * Updates the the given answer
     *
     * @param req
     * @param answerId
     * @param answerData
     * @returns {Promise<*|void>}
     */
    updateAnswer: async (answerId, answerData, req = false) => {
        return await ArchQnaApiService.updateAnswer(req ? req : apiUtils.getProxyRequestWithTokenHeaders(), answerId, answerData);
    },

    /**
     * Deletes the answer by the given id
     *
     * @param req
     * @param answerId
     * @returns {Promise<*|void>}
     */
    deleteAnswer: async (answerId, req = false) => {
        let response = await ArchQnaApiService.deleteAnswer(req ? req : apiUtils.getProxyRequestWithTokenHeaders(), answerId);
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
    fetchAnswerComments: async (answerId, query = '', req = false) => {
        return await ArchQnaApiService.fetchAnswerComments(req ? req : apiUtils.getProxyRequestWithTokenHeaders(), answerId, query);
    },

    /**
     * Fetches the comments of the given question
     *
     * @param req
     * @param questionId
     * @param query
     * @returns {Promise<*|void>}
     */
    fetchQuestionComments: async (questionId, query = '', req = false) => {
        return await ArchQnaApiService.fetchQuestionComments(req ? req : apiUtils.getProxyRequestWithTokenHeaders(), questionId, query);
    },

    /**
     * Fetches the question comment having the id
     *
     * @param req
     * @param questionCommentId
     * @returns {Promise<*|void>}
     */
    fetchQuestionComment: async (questionCommentId, req = false) => {
        return await ArchQnaApiService.fetchQuestionComment(req ? req : apiUtils.getProxyRequestWithTokenHeaders(), questionCommentId);
    },

    /**
     * Fetches the answer comment having the id
     *
     * @param req
     * @param answerCommentId
     * @returns {Promise<*|void>}
     */
    fetchAnswerComment: async (answerCommentId, req = false) => {
        return await ArchQnaApiService.fetchAnswerComment(req ? req : apiUtils.getProxyRequestWithTokenHeaders(), answerCommentId);
    },

    /**
     * Adds a new comment to the given question
     *
     * @param req
     * @param questionId
     * @param commentData
     * @returns {Promise<*|void>}
     */
    addQuestionComment: async (questionId, commentData, req = false) => {
        return await ArchQnaApiService.addQuestionComment(req ? req : apiUtils.getProxyRequestWithTokenHeaders(), questionId, commentData);
    },

    /**
     * Adds a new comment to the given answer
     *
     * @param req
     * @param answerId
     * @param commentData
     * @returns {Promise<*|void>}
     */
    addAnswerComment: async (answerId, commentData, req = false) => {
        return await ArchQnaApiService.addAnswerComment(req ? req : apiUtils.getProxyRequestWithTokenHeaders(), answerId, commentData);
    },

    /**
     * Updates the comment of the given question
     *
     * @param req
     * @param questionCommentId
     * @param commentData
     * @returns {Promise<*|void>}
     */
    updateQuestionComment: async (questionCommentId, commentData, req = false) => {
        return await ArchQnaApiService.updateQuestionComment(req ? req : apiUtils.getProxyRequestWithTokenHeaders(), questionCommentId, commentData);
    },

    /**
     * Updates the answer comment
     *
     * @param req
     * @param answerCommentId
     * @param commentData
     * @returns {Promise<*|void>}
     */
    updateAnswerComment: async (answerCommentId, commentData, req = false) => {
        return await ArchQnaApiService.updateAnswerComment(req ? req : apiUtils.getProxyRequestWithTokenHeaders(), answerCommentId, commentData);
    },

    /**
     * Deletes the question comment by the given id
     *
     * @param req
     * @param questionCommentId
     * @returns {Promise<*|void>}
     */
    deleteQuestionComment: async (questionCommentId, req = false) => {
        let response = await ArchQnaApiService.deleteQuestionComment(req ? req : apiUtils.getProxyRequestWithTokenHeaders(), questionCommentId);
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
    deleteAnswerComment: async (answerCommentId, req = false) => {
        let response = await ArchQnaApiService.deleteAnswerComment(req ? req : apiUtils.getProxyRequestWithTokenHeaders(), answerCommentId);
        if (response.status === 204) {
            return answerCommentId;
        }
    }
}