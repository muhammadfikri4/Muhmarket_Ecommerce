const jwt_decode = require('jwt-decode');
const product = require('../model/product');
const dataClient = require('../model/model');
const {productApi} = require('../utils/api');

const addProduct = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    try {
        
            const decodeId = jwt_decode(refreshToken);
            const harga = req.body.hargaProduk;
            const rpFormat = new Intl.NumberFormat("id-ID", {
                currency: "IDR",
                style: "currency"
            }).format(harga);
            const img = req.file.path;
            const urlImage = `${req.protocol}://${req.get("host")}/${img}`;

            await product.insertMany({
                idUser: decodeId.id,
                namaProduk: req.body.namaProduk,
                hargaProduk: rpFormat,
                bioProduk: req.body.bioProduk,
                imageProduk: img,
                urlImage
            });
            const produk = await product.find({idUser: decodeId.id})
            await dataClient.updateOne({_id: decodeId.id},
                {$set: {
                    produk
                }})
            
            productApi(200, produk, "OK", res);
        
        
    } catch (error) {
        console.log(error)
        
    }
}

module.exports = addProduct;