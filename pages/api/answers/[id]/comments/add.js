import API from "../../../../../components/util/API";

export default async (req, res) => {
    res.status(200).json(await API.addAnswerComment(req, req.query.id, req.body));
}