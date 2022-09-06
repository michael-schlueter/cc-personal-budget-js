const modelEnvelopes = require("../model/envelopes");
const { createId } = require("../utils/helpers");

// @desc    Get all envelopes
// @route   GET /api/envelopes
const getAllEnvelopes = async (req, res, next) => {
  try {
    // Simulating DB retrieval
    const envelopes = await modelEnvelopes;
    res.status(200).send(envelopes);
  } catch (err) {
    res.status(400).send(err);
  }
};

// @desc    Create an envelope
// @route   POST /api/envelopes
const createEnvelope = async (req, res) => {
  try {
    const envelopes = await modelEnvelopes;
    const { title, budget } = req.body;
    const newId = createId(envelopes);

    const newEnvelope = {
      id: newId,
      title,
      budget,
    };

    envelopes.push(newEnvelope);
    return res.status(201).send(newEnvelope);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  getAllEnvelopes,
  createEnvelope,
};
