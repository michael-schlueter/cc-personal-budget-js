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

module.exports = {
  getAllTransactions,
};
