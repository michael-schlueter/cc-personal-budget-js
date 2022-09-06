const createId = (envelopes) => {
  const newId = envelopes.length + 1;

  if (newId === NaN || newId === undefined || newId < 0) {
    console.log("Invalid ID");
    return;
  }

  return newId;
};

module.exports = {
  createId,
};
