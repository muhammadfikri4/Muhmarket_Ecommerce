const dataClient = require('../model/model');
const Cookie = require('js-cookie');

const logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    try {
    
    const user = await dataClient.findOne({refresh_token: refreshToken});
    if(!user) {
        return res.sendStatus(404);
    }
    await dataClient.updateOne(
    {_id: user._id},
    {
        $set: {
            refresh_token: null
        }
    }
    );
    
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
    } catch (error) {
        res.json({error})
        if(!refreshToken) {
            return res.sendStatus(204);
        }
    }
}

module.exports = logout;