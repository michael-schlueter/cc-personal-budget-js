const express = require("express");
const {
  getAllEnvelopes,
  getEnvelope,
  createEnvelope,
} = require("../controller/envelopes");
const modelEnvelopes = require("../model/envelopes");

const envelopesRouter = express.Router();

envelopesRouter.get("/", getAllEnvelopes);
envelopesRouter.get("/:id", getEnvelope);
envelopesRouter.post("/", createEnvelope);

module.exports = envelopesRouter;
