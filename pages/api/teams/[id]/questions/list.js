import API from "../../../../../components/util/API";
import commons from "../../../utils/commons";

export default async (req, res) => {
    let responseData = await API.fetchTeamQuestions(req, req.query.id, commons.jsonToUri(req.query));
    res.status(200).json(responseData);
}