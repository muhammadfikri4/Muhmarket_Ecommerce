const dataClient = require("../model/model");

const getShop = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  try {
    const namaToko = req.params.namaToko;
    const result = await dataClient.findOne({ namaToko });
    res.json({ result });
  } catch (error) {
    if (!refreshToken) {
      res.json({ msg: "Token is Exisn't!" });
    }
  }
};

module.exports = getShop;
