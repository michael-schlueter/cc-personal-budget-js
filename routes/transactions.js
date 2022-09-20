const express = require("express");

const {
  getAllTransactions,
//   getTransaction,
//   createTransaction,
//   updateTransaction,
//   deleteTransaction,
} = require("../controller/transactions");

const transactionsRouter = express.Router();

transactionsRouter.get("/", getAllTransactions);
// transactionsRouter.get("/:id", getTransaction);
// transactionsRouter.post("/", createTransaction);
// transactionsRouter.put("/:id", updateTransaction);
// transactionsRouter.delete("/:id", deleteTransaction);

module.exports = transactionsRouter;
