import API from "../../../../components/util/API";

export default async (req, res) => {
    res.status(204).send(await API.deleteAnswer(req, req.query.id));
}