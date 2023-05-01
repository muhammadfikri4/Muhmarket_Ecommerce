const dataClient = require("../model/model");
const product = require("../model/product");
const { api } = require("../utils/api");

const detailProduk = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  try {
    const produk = await product.findOne({ _id: req.body._id });
    const data = await dataClient.findOne({ _id: produk.idUser });

    api(200, data, produk, "OK", res);
  } catch (error) {
    if (!refreshToken) {
      console.log(error);
    }
  }
};

module.exports = detailProduk;
