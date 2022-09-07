const express = require("express");
const {
  getAllEnvelopes,
  getEnvelope,
  createEnvelope,
  updateEnvelope,
} = require("../controller/envelopes");

const envelopesRouter = express.Router();

envelopesRouter.get("/", getAllEnvelopes);
envelopesRouter.get("/:id", getEnvelope);
envelopesRouter.post("/", createEnvelope);
envelopesRouter.put("/:id", updateEnvelope);

module.exports = envelopesRouter;
