const jwt_decode = require('jwt-decode');
const dataClient = require('../model/model');
const product = require('../model/product');
const {api} = require('../utils/api');
 
const getData = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    try {
        const decode = jwt_decode(refreshToken);
        const result = await dataClient.findOne({_id: decode.id});
        const resultProduk = await product.find({idUser: decode.id});
        api(200, result, resultProduk, "OK", res);
    } catch (error) {
        if(!refreshToken) {
            console.log(error)
            api(401, null, null, "Invalid Token!", res);
        }
    }
}

module.exports = getData;