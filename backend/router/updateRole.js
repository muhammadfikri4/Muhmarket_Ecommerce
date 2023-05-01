const dataClient = require("../model/model");

const updateRole = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  try {
    await dataClient.updateOne(
      { _id: req.body._id },
      {
        $set: {
          __v: req.body.__v,
        },
      }
    );
    const data = await dataClient.findOne({ _id: req.body._id });
    res.json({ data });
  } catch (error) {
    if (!refreshToken) {
      console.log(error);
      res.json({ error });
    }
  }
};

module.exports = updateRole;
