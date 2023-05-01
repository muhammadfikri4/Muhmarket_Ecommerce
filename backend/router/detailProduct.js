const product = require('../model/product');
const dataClient = require('../model/model');
const {api} = require('../utils/api');

const detailProduct = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    try {
        if(refreshToken) {
        const result = await product.findOne({_id: req.body._id});
        const user = await dataClient.findOne({_id: result.idUser})
        api(200, user, result, "OK", res);
        if(!result) {
            res.status(404).json({msg: "Produk Tidak Ditemukan!"})
        }
        }
    } catch (error) {
        if(!refreshToken) {
            console.log(error)
            api(401, null, null, "Invalid Token!", res)
        }
    }
}

module.exports = detailProduct;