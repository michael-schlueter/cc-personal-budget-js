const express = require("express");

const {
  getAllTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controller/transactions");

const transactionsRouter = express.Router();

/**
 * @swagger
 * /api/transactions:
 *    get:
 *      summary: Get all transactions
 *      produces:
 *        - application/json
 *      tags:
 *        - Transactions
 *      responses:
 *        "200":
 *          description: Returns a list of all transactions
 *        "404":
 *          description: No transactions found
 */
transactionsRouter.get("/", getAllTransactions);

/**
 * @swagger
 * /api/transactions/{id}:
 *    get:
 *      summary: Get a transaction by ID
 *      produces:
 *        - application/json
 *      tags:
 *        - Transactions
 *      parameters:
 *        - in: path
 *          name: id
 *          description: transaction id
 *          type: uuid
 *          required: true
 *          example: a85684a5-e6eb-4572-bb78-9a9aaf7a1304
 *      responses:
 *        "200":
 *          description: Returns a transaction along with its data
 *        "404":
 *          description: Transaction not found
 *        "500":
 *          description: Internal server error
 */
transactionsRouter.get("/:id", getTransaction);

/**
 * @swagger
 * /api/transactions/{id}:
 *    put:
 *      summary: Updates an existing transaction
 *      produces:
 *        - application/json
 *      tags:
 *        - Transactions
 *      parameters:
 *        - in: path
 *          name: id
 *          description: transaction ID
 *          type: uuid
 *          required: true
 *          example: a85684a5-e6eb-4572-bb78-9a9aaf7a1304
 *      requestBody:
 *        description: Data for updated transaction
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                amount:
 *                  type: integer
 *              example:
 *                title: Netflix
 *                amount: 10
 *        responses:
 *          "200":
 *            descriptions: Returns updated envelope
 *          "400":
 *            description: Insufficient budget to update transaction
 *          "404":
 *            description: Transaction not found
 *          "500":
 *            description: Internal server error
 */
transactionsRouter.put("/:id", updateTransaction);

/**
 * @swagger
 * /api/transactions/{id}:
 *    delete:
 *      summary: Deletes an individual transaction
 *      produces:
 *        - application/json
 *      tags:
 *        - Transactions
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Transaction id to delete
 *          type: uuid
 *          required: true
 *          example: 003391f5-9e5e-4a07-bcf6-cd71aba35f41
 *      responses:
 *        "204":
 *          description: Transaction deleted
 *        "400":
 *          description: Insufficient budget on receiving envelope to delete the transaction
 *        "404":
 *          description: Transaction not found
 *        "500":
 *          description: Internal server error
 */
transactionsRouter.delete("/:id", deleteTransaction);

module.exports = transactionsRouter;
