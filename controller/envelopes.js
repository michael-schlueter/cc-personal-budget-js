const { db } = require("../model/db");
const modelEnvelopes = require("../model/envelopes");
const { createId, findById, getIndex } = require("../utils/helpers");

// @desc    Get all envelopes
// @route   GET /api/envelopes
const getAllEnvelopes = async (req, res) => {
  const query = "SELECT * FROM envelopes";
  try {
    const envelopes = await db.query(query);
    if (envelopes.rowCount < 1) {
      return res.status(404).send({
        message: "No envelopes found",
      });
    }

    return res.status(200).send(envelopes.rows);
  } catch (err) {
    return res.status(500).send({
      error: err.message,
    });
  }
};

// @desc    Get a specific envelope
// @route   GET /api/envelopes/:id
const getEnvelope = async (req, res) => {
  const query = "SELECT * FROM envelopes WHERE id = $1";
  const { id } = req.params;

  try {
    const envelope = await db.query(query, [id]);

    if (envelope.rowCount < 1) {
      return res.status(404).send({
        message: "Envelope Not Found",
      });
    }

    res.status(200).send(envelope.rows[0]);
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
};

// @desc    Create an envelope
// @route   POST /api/envelopes
const createEnvelope = async (req, res) => {
  const { title, budget } = req.body;
  const query =
    "INSERT INTO envelopes(title, budget) VALUES($1, $2) RETURNING *";

  try {
    const newEnvelope = await db.query(query, [title, budget]);
    return res.status(201).send(newEnvelope.rows[0]);
  } catch (err) {
    return res.status(500).send({
      error: err.message,
    });
  }
};

// @desc    Update an envelope
// @route   PUT /api/envelopes/:id
const updateEnvelope = async (req, res) => {
  const { id } = req.params;
  const { title, budget } = req.body;
  const query =
    "UPDATE envelopes SET title = $1, budget = $2 WHERE id = $3 RETURNING *";
  try {
    const updatedEnvelope = await db.query(query, [title, budget, id]);

    if (updatedEnvelope.rowCount < 1) {
      return res.status(404).send({
        message: "Envelope Not Found",
      });
    }

    return res.status(200).send(updatedEnvelope.rows[0]);
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
};

// @desc    Delete an envelope
// @route   DELETE /api/envelopes/:id
const deleteEnvelope = async (req, res) => {
  const { id } = req.params;
  const selectEnvelopeQuery = "SELECT * FROM envelopes WHERE id = $1";
  const deleteEnvelopeQuery = "DELETE FROM envelopes WHERE id = $1";

  try {
    const envelopeToDelete = await db.query(selectEnvelopeQuery, [id]);

    if (envelopeToDelete.rowCount < 1) {
      res.status(404).send({
        message: "Envelope not found",
      });
    }
    await db.query(deleteEnvelopeQuery, [id]);
    return res.status(204);
  } catch (err) {
    return res.status(500).send({
      error: err.message,
    });
  }
};

const transferBudget = async (req, res) => {
  try {
    const envelopes = await modelEnvelopes;
    const { fromId, toId } = req.params;
    const amount = parseInt(req.body.amount);

    const sendingEnvelope = findById(envelopes, fromId);
    const receivingEnvelope = findById(envelopes, toId);

    if (!sendingEnvelope || !receivingEnvelope) {
      res.status(404).send({
        message: "Envelope(s) not found",
      });
    }

    if (amount < 0) {
      res.status(400).send({
        message: "Invalid amount",
      });
    }

    if (amount > sendingEnvelope.budget) {
      res.status(400).send({
        message: "Insufficient budget for transfer",
      });
    }

    sendingEnvelope.budget -= amount;
    receivingEnvelope.budget += amount;

    res.status(201).send(receivingEnvelope);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  getAllEnvelopes,
  createEnvelope,
  getEnvelope,
  updateEnvelope,
  deleteEnvelope,
  transferBudget,
};
