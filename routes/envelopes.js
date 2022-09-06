const express = require("express");

const envelopesRouter = express.Router();

envelopesRouter.get("/", (req, res) => {
    res.send('Hello World');
});

module.exports = envelopesRouter;