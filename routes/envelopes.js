const express = require("express");
const { getAllEnvelopes, createEnvelope } = require("../controller/envelopes");
const modelEnvelopes = require("../model/envelopes");

const envelopesRouter = express.Router();

envelopesRouter.get("/", getAllEnvelopes);
envelopesRouter.post("/", createEnvelope);

module.exports = envelopesRouter;
