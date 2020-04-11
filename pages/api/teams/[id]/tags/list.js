import API from "../../../../../components/util/API";

export default async (req, res) => {
    let responseData = await API.fetchTeamTags(req, req.query.id);
    res.status(200).json(responseData);
}