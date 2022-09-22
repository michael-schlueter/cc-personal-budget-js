const express = require("express");

const {
  getAllTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controller/transactions");

const transactionsRouter = express.Router();

transactionsRouter.get("/", getAllTransactions);
transactionsRouter.get("/:id", getTransaction);
transactionsRouter.put("/:id", updateTransaction);
transactionsRouter.delete("/:id", deleteTransaction);

module.exports = transactionsRouter;
