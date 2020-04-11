import ArchQnaApiService from "../../pages/api/utils/archQnaApiService";
import http from "./httpUtil";

export default {

    /**
     * Fetches the currently logged in user in the API server
     *
     * @param req
     * @returns {Promise<*|void>}
     */
    fetchUser: async (req) => {
        let response;
        if (req) {
            response = await ArchQnaApiService.fetchUser(req);
        } else {
            response = await (await http.get(`/auth/current_user`)).json();
        }
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
        if (req) {
            response = await ArchQnaApiService.fetchMyTeams(req);
        } else {
            response = await (await http.get(`/api/teams/my_teams`)).json();
        }
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
        if (req) {
            response = await ArchQnaApiService.fetchTeam(req, teamId);
        } else {
            response = await (await http.get(`/api/teams/${teamId}`)).json();
        }
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
        let response;
        if (req) {
            response = await ArchQnaApiService.fetchTeamTags(req, teamId);
        } else {
            response = await (await http.get(`/api/teams/${teamId}/tags/list`)).json();
        }
        return response;
    },

    /**
     * Fetches the questions in the given team
     *
     * @param req
     * @param teamId
     * @returns {Promise<*|void>}
     */
    fetchTeamQuestions: async (req, teamId) => {
        let response;
        if (req) {
            response = await ArchQnaApiService.fetchTeamQuestions(req, teamId);
        } else {
            response = await (await http.get(`/api/teams/${teamId}/questions/list`)).json();
        }
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
        if (req) {
            response = await ArchQnaApiService.fetchQuestion(req, questionId);
        } else {
            response = await (await http.get(`/api/questions/${questionId}`)).json();
        }
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
        if (req) {
            response = await ArchQnaApiService.updateQuestion(req, questionId, questionData);
        } else {
            response = await (await http.patch(`/api/questions/${questionId}/update/`, questionData)).json();
        }
        return response;
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
        if (req) {
            response = await ArchQnaApiService.fetchQuestionAnswers(req, questionId);
        } else {
            response = await (await http.get(`/api/questions/${questionId}/answers/list`)).json();
        }
        return response;
    },

    /**
     * Fetches the comments of the given answer
     *
     * @param req
     * @param answerId
     * @returns {Promise<*|void>}
     */
    fetchAnswerComments: async (req, answerId) => {
        let response;
        if (req) {
            response = await ArchQnaApiService.fetchAnswerComments(req, answerId);
        } else {
            response = await (await http.get(`/api/answers/${answerId}/comments/list`)).json();
        }
        return response;
    },

    /**
     * Fetches the comments of the given question
     *
     * @param req
     * @param questionId
     * @returns {Promise<*|void>}
     */
    fetchQuestionComments: async (req, questionId) => {
        let response;
        if (req) {
            response = await ArchQnaApiService.fetchQuestionComments(req, questionId);
        } else {
            response = await (await http.get(`/api/questions/${questionId}/comments/list`)).json();
        }
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
        if (req) {
            response = await ArchQnaApiService.fetchQuestionComment(req, questionCommentId);
        } else {
            response = await (await http.get(`/api/question_comments/${questionCommentId}/get/`)).json();
        }
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
        if (req) {
            response = await ArchQnaApiService.addQuestionComment(req, questionId, commentData);
        } else {
            response = await (await http.post(`/api/questions/${questionId}/comments/add`, commentData)).json();
        }
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
        if (req) {
            response = await ArchQnaApiService.updateQuestionComment(req, questionCommentId, commentData);
        } else {
            response = await (await http.patch(`/api/question_comments/${questionCommentId}/update/`, commentData)).json();
        }
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
        if (req) {
            response = await ArchQnaApiService.deleteQuestionComment(req, questionCommentId);
        } else {
            response = await http.delete(`/api/question_comments/${questionCommentId}/delete/`);
        }
        if (response.status === 204) {
            return questionCommentId;
        }
    }
}