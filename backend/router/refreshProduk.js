const dataClient = require("../model/model");
const product = require("../model/product");
const jwt_decode = require("jwt-decode");
const { api } = require("../utils/api");

const refreshProduk = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  try {
    const decode = jwt_decode(refreshToken);
    const produk = await product.find({ idUser: decode.id });
    const user = await dataClient.findOne({ _id: decode.id });
    await dataClient.updateOne({ _id: decode.id }, { $set: { produk } });
    api(200, user, produk, "OK", res);
  } catch (error) {
    res.json({ error });
  }
};

module.exports = refreshProduk;
