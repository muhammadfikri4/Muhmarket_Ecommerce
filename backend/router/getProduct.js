const product = require('../model/product');
const {productApi} = require('../utils/api');

const getProduct = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    try {
        
        const find = await product.find();
        
        productApi(200, find, "OK", res );
    } catch (error) {
        if(!refreshToken) {
            console.log(refreshToken)
            return res.sendStatus(401);
        }
    }
}

module.exports = getProduct;