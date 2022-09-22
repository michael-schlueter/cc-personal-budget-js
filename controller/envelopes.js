const { db } = require("../model/db");

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
    if (!title || !budget) {
      return res.status(400).send({
        message: "Title and/or budget not provided!",
      });
    }

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
    if (!title || !budget) {
      return res.status(400).send({
        message: "Title and/or budget not provided!",
      });
    }

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

// @desc    Create a transaction
// @route   POST /api/envelopes/:id/transactions
const createTransaction = async (req, res) => {
  const { id } = req.params;
  const { title, amount, payment_recipient } = req.body;
  const date = new Date();

  const envelopeQuery = "SELECT * FROM envelopes WHERE envelopes.id = $1";
  const transactionQuery =
    "INSERT INTO transactions(title, amount, date, envelope_id, payment_recipient) VALUES($1, $2, $3, $4, $5) RETURNING *";
  const updateSendingEnvelopeQuery =
    "UPDATE envelopes SET budget = budget - $1 WHERE id = $2 RETURNING *";
  const updateReceivingEnvelopeQuery =
    "UPDATE envelopes SET budget = budget + $1 WHERE id = $2 RETURNING *";

  try {
    const envelope = await db.query(envelopeQuery, [id]);
    if (envelope.rowCount < 1) {
      return res.status(404).send({
        message: "Envelope not found",
      });
    }

    if (!title || !amount || !payment_recipient) {
      return res.status(400).send({
        message:
          "You need to provvide a title, amount and the ID of the payment recipient to create a transaction",
      });
    }

    if (parseInt(amount) < 0) {
      return res.status(400).send({
        message: "Invalid amount",
      });
    }

    if (parseInt(amount) > parseInt(envelope.rows[0].budget)) {
      return res.status(400).send({
        message: "Insufficient budget for transfer",
      });
    }

    const newTransaction = await db.query(transactionQuery, [
      title,
      amount,
      date,
      id,
      payment_recipient,
    ]);

    await db.query(updateSendingEnvelopeQuery, [amount, id]);
    await db.query(updateReceivingEnvelopeQuery, [amount, payment_recipient]);

    return res.status(201).send(newTransaction.rows[0]);
  } catch (err) {
    return res.status(500).send({
      error: err.message,
    });
  }
};

// @desc    Get all transactions from an envelope
// @route   GET /api/envelopes/:id/transactions
const getEnvelopeTransactions = async (req, res) => {
  const { id } = req.params;
  const query = "SELECT * from transactions WHERE envelope_id = $1";

  try {
    const transactions = await db.query(query, [id]);

    if (transactions.rowCount < 1) {
      return res.status(404).send({
        message: "No transactions found",
      });
    }

    return res.status(200).send(transactions.rows);
  } catch (err) {
    return res.status(500).send({
      error: err.message,
    });
  }
};

module.exports = {
  getAllEnvelopes,
  createEnvelope,
  getEnvelope,
  updateEnvelope,
  deleteEnvelope,
  createTransaction,
  getEnvelopeTransactions,
};
