import API from "../../../../../components/util/API";
import commons from "../../../utils/commons";

export default async (req, res) => {
    res.status(200).json(await API.fetchAnswerComments(req, req.query.id, commons.jsonToUri(req.query)));
}