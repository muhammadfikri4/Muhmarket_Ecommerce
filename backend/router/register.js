const bcrypt = require('bcrypt');
const dataClient = require('../model/model')

const register = async (req, res) => {
    const {name, email, username, password} = req.body
    const image = req.file.path;
    const url = `${req.protocol}://${req.get("host")}/${image}`
    const salt = await bcrypt.genSalt();
    const hashPw = await bcrypt.hash(password, salt)
    try {
        const result = await dataClient.insertMany({
            name,
            email,
            username,
            password: hashPw,
            image,
            url
        });
        res.json({msg: "Register Success!", result});
        // console.log(req.body)
    } catch (error) {
        console.log(error);
        res.json({msg: "Register Failed!"});
    }

}

module.exports = register;