const jwt_decode = require("jwt-decode");
const dataClient = require("../model/model");

const registerToko = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  try {
    const decode = jwt_decode(refreshToken);
    const match = await dataClient.findOne({ namaToko: req.body.namaToko });
    if (match) {
      res
        .status(400)
        .json({
          msg: "Nama toko telah digunakan, silahkan gunakan nama lain!",
        });
    } else if (!match) {
      await dataClient.updateOne(
        { _id: decode.id },
        {
          $set: {
            namaToko: req.body.namaToko,
            alamatNamaJalanToko: req.body.alamatNamaJalanToko,
            alamatKecamatanToko: req.body.alamatKecamatanToko,
            alamatKabupatenKotaToko: req.body.alamatKabupatenKotaToko,
            alamatProvinsiToko: req.body.alamatProvinsiToko,
            alamatNegaraToko: req.body.alamatNegaraToko,
            alamatKodeposToko: req.body.alamatKodeposToko,
            noHpToko: req.body.noHpToko,
          },
        }
      );
      res.json({ msg: "Toko berhasil di daftarkan!" });
    }
  } catch (error) {
    if (!refreshToken) {
      console.log(error);
      res.sendStatus(401).json({ msg: "Token isn't Available!" });
    }
  }
};

module.exports = registerToko;
