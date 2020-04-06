import fetch from "isomorphic-unfetch";
import ArchQnaApiService from "../../pages/api/utils/archQnaApiService";

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
            response = await fetch(`/auth/current_user`).then(async r => {
                return await r.json();
            });
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
            response = await fetch(`/api/teams/my_teams`).then(async r => {
                return await r.json();
            });
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
            response = await fetch(`/api/teams/${teamId}`).then(async r => {
                return await r.json();
            });
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
            response = await fetch(`/api/teams/${teamId}/questions/list`).then(async r => {
                return await r.json();
            });
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
            response = await fetch(`/api/questions/${questionId}`).then(async r => {
                return await r.json();
            });
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
            response = await fetch(`/api/questions/${questionId}/answers/list`).then(async r => {
                return await r.json();
            });
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
            response = await fetch(`/api/questions/${questionId}/comments/list`).then(async r => {
                return await r.json();
            });
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
            response = await fetch(`/api/answers/${answerId}/comments/list`).then(async r => {
                return await r.json();
            });
        }
        return response;
    },
}