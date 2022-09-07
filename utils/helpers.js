const createId = (envelopes) => {
  const newId = envelopes.length + 1;

  if (newId === NaN || newId === undefined || newId < 0) {
    console.log("Invalid ID");
    return;
  }

  return newId;
};

const findById = (envelopes, id) => {
  const envelopeId = parseInt(id);

  if (envelopeId === NaN || envelopeId === undefined || envelopeId < 0) {
    console.log("Invalid ID");
    return;
  }

  const retrievedEnvelope = envelopes.find(
    (envelope) => envelope.id === envelopeId
  );
  if (!retrievedEnvelope) {
    console.log("ID not found");
    return;
  }

  return retrievedEnvelope;
};

module.exports = {
  createId,
  findById,
};
