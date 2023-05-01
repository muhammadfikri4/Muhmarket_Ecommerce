const dataClient = require('../model/model');
const { apiUser } = require('../utils/api');

const getUser = async (req,res) => {
    const result = await dataClient.find();
    apiUser(200, result, "Semua Data Ditampilkan!", res)
}

module.exports = getUser;