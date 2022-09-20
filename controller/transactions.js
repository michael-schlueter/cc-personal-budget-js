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

module.exports = {
  getAllTransactions,
  getTransaction,
};
