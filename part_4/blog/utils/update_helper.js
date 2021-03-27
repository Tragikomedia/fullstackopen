const updateObjFromReq = (req) => {
  const { title, author, url, likes } = req.body;
  const initialObj = { title, author, url, likes };
  const updateObj = {};
  const assignIfDefined = ([key, value]) => {
    if (value) updateObj[key] = value;
  };
  Object.entries(initialObj).forEach(assignIfDefined);
  return updateObj;
};

module.exports = { updateObjFromReq };
