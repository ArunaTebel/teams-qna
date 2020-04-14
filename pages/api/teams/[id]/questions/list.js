import API from "../../../../../components/util/API";

export default async (req, res) => {
    const searchQuery = Object.keys(req.query)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(req.query[k]))
        .join('&');
    let responseData = await API.fetchTeamQuestions(req, req.query.id, searchQuery);
    res.status(200).json(responseData);
}