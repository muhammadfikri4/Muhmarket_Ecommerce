const jwt_decode = require("jwt-decode");
const product = require("../model/product");
const dataClient = require("../model/model");
const fs = require("fs");

const deleteProduk = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  try {
    const id = req.params.id;
    const decode = jwt_decode(refreshToken);
    const produk = await product.findOne({ _id: id });
    await product.deleteOne({ _id: id });
    const produks = await product.find({ idUser: decode.id });
    fs.unlinkSync(produk.imageProduk);
    await dataClient.updateOne(
      { _id: decode.id },
      {
        $set: {
          produk: produks,
        },
      }
    );
    res.json({ msg: "Success to Delete" });
  } catch (error) {
    if (!refreshToken) {
      console.log(error);
    }
  }
};

module.exports = deleteProduk;
