const jwt = require('jsonwebtoken');
const dataClient = require('../model/model');
const bcrypt = require('bcrypt');

const login = async(req, res) => {
    

    try {
        
        const findAcc = await dataClient.findOne({username: req.body.username});
        const match = await bcrypt.compare(req.body.password, findAcc.password);
        if(!match) {
            return res.status(400).json({msg: "Your Password Is Wrong"})
        }
        const id = findAcc._id;
        const role = findAcc.__v;
        const name = findAcc.name;
        const username = findAcc.username;
        const email = findAcc.email;
        const urlImage = findAcc.url;
        const accessToken = jwt.sign({id, name, email, role, urlImage}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s'
        })
        const refreshToken = jwt.sign({id, name, email, role, urlImage}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        })
        await dataClient.updateOne(
            {username}, 
            {$set: {
                refresh_token: refreshToken
            }});
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
        // res.session.refreshToken = refreshToken;
        res.json({
            msg: "Login Success!",
            result: { 
                username: findAcc.username,
                role: findAcc.__v 
            }, 
            accessToken
        });
    } catch(err) {

        if(err) {
            res.status(404).json({msg: "Username or Password is Wrong!"});
            console.log(err);
        } 
        
    }
}

module.exports = login;