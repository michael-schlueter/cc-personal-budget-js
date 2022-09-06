const modelEnvelopes = require("../model/envelopes");

// @desc    GET all envelopes
// @route   GET /api/envelopes
const getAllEnvelopes = async (req, res, next) => {
    // Simulating DB retrieval
    try {
        const envelopes = await modelEnvelopes;
        res.status(200).send(envelopes);
    } catch (err) {
        res.status(400).send(err);
    }
};

module.exports = {
    getAllEnvelopes,
}