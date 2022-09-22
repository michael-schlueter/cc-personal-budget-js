const { db } = require("../model/db");

// @desc    Get all transactions
// @route   GET /api/transactions
const getAllTransactions = async (req, res) => {
  const query = "SELECT * FROM transactions";
  try {
    const transactions = await db.query(query);
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

// @desc    Get a specific transaction
// @route   GET /api/transactions/:id
const getTransaction = async (req, res) => {
  const query = "SELECT * FROM transactions WHERE id = $1";
  const { id } = req.params;

  try {
    const transaction = await db.query(query, [id]);

    if (transaction.rowCount < 1) {
      return res.status(404).send({
        message: "Transaction Not Found",
      });
    }

    res.status(200).send(transaction.rows[0]);
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
};

// @desc    Update a specific transaction
// @route   PUT /api/transactions/:id
const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { title, amount } = req.body;
  const selectTransactionQuery = "SELECT * FROM transactions WHERE id = $1";
  const updateTransactionQuery = "UPDATE transactions SET title = $1, amount = $2 WHERE id = $3 RETURNING *"
  const updateEnvelopesQuery = "UPDATE envelopes SET budget = $1 WHERE id = $2";
  const selectEnvelopeQuery = "SELECT * FROM envelopes WHERE id = $1";
  
  const transactionToUpdate = await db.query(selectTransactionQuery, [id]);
 
  if (transactionToUpdate.rowCount < 1) {
    return res.status(404).send({
      message: "Transaction not found",
    })
  }
  
  const sendingEnvelope = await db.query(selectEnvelopeQuery, [transactionToUpdate.rows[0].envelope_id]);
  const receivingEnvelope = await db.query(selectEnvelopeQuery, [transactionToUpdate.rows[0].payment_recipient]);
  const amountDifference = parseInt(amount) - parseInt(transactionToUpdate.rows[0].amount);
  const newSendingEnvelopeBudget = parseInt(sendingEnvelope.rows[0].budget) - amountDifference;
  const newReceivingEnvelopeBudget = parseInt(receivingEnvelope.rows[0].budget) + amountDifference;

  if (newSendingEnvelopeBudget < 0 || newReceivingEnvelopeBudget < 0) {
    return res.status(400).send({
      message: "Insufficient budget to update transaction"
    })
  }

  await db.query(updateEnvelopesQuery, [newSendingEnvelopeBudget, transactionToUpdate.rows[0].envelope_id]);
  await db.query(updateEnvelopesQuery, [newReceivingEnvelopeBudget, transactionToUpdate.rows[0].payment_recipient]);

  const updatedTransaction = await db.query(updateTransactionQuery, [title, amount, id]);
  return res.status(200).send(updatedTransaction.rows[0]);

}

// @desc    Delete a specific transaction
// @route   DELETE /api/transactions/:id
const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  const selectTransactionQuery = "SELECT * FROM transactions WHERE id = $1";
  const deleteTransactionQuery = "DELETE FROM transactions WHERE id = $1";
  const selectReceivingEnvelope = "SELECT * FROM envelopes WHERE id = $1";
  const updateSendingEnvelopeQuery =
    "UPDATE envelopes SET budget = budget + $1 WHERE id = $2 RETURNING *";
  const updateReceivingEnvelopeQuery =
    "UPDATE envelopes SET budget = budget - $1 WHERE id = $2 RETURNING *";

  try {
    const transactionToDelete = await db.query(selectTransactionQuery, [id]);
    const receivingEnvelope = await db.query(selectReceivingEnvelope, [transactionToDelete.rows[0].payment_recipient])

    if (transactionToDelete.rowCount < 1) {
      return res.status(404).send({
        message: "Transaction not found",
      });
    }
    console.log(transactionToDelete.rows[0].amount);
    console.log(receivingEnvelope.rows[0].budget);

    if (parseInt(transactionToDelete.rows[0].amount) > parseInt(receivingEnvelope.rows[0].budget)) {
      return res.status(400).send({
        message: "Insufficient budget on receiving envelope to delete the transaction",
      })
    }

    await db.query(updateSendingEnvelopeQuery, [
      transactionToDelete.rows[0].amount,
      transactionToDelete.rows[0].envelope_id,
    ]);
    await db.query(updateReceivingEnvelopeQuery, [
      transactionToDelete.rows[0].amount,
      transactionToDelete.rows[0].payment_recipient,
    ]);
    await db.query(deleteTransactionQuery, [id]);
    res.sendStatus(204);
  } catch (err) {
    return res.status(500).send({
      error: err.message,
    });
  }
};

module.exports = {
  getAllTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
};
