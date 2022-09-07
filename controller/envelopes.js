const modelEnvelopes = require("../model/envelopes");
const { createId, findById } = require("../utils/helpers");

// @desc    Get all envelopes
// @route   GET /api/envelopes
const getAllEnvelopes = async (req, res) => {
  try {
    // Simulating DB retrieval
    const envelopes = await modelEnvelopes;
    res.status(200).send(envelopes);
  } catch (err) {
    res.status(400).send(err);
  }
};

// @desc    Get a specific envelope
// @route   GET /api/envelopes/:id
const getEnvelope = async (req, res) => {
  try {
    const envelopes = await modelEnvelopes;
    const { id } = req.params;
    const retrievedEnvelope = findById(envelopes, id);

    if (!retrievedEnvelope) {
      res.status(404).send({
        message: "Envelope Not Found",
      });
    }

    res.status(200).send(retrievedEnvelope);
  } catch (err) {
    res.status(500).send(err);
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
  getEnvelope,
};
