const jwt = require('jsonwebtoken');
const dataClient = require('../model/model');
const express = require('express');

// const refreshToken = (req, res) => {
//     try {
//         const refreshToken = req.cookies.refreshToken;
//         if(!refreshToken) {
//             return res.sendStatus(401);
//         }
//         const user = dataClient.find({refresh_token: refreshToken}, (err, docs) => {
//             if(err) {
//                 return res.sendStatus(403);
//             }
//         });
//         // if(!user) {
//         //     return res.sendStatus(403);
//         // }
//         jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, result) => {
//             if(err) {
//                 res.sendStatus(403);
//             }
//             const id = user._id;
//             const username = user.username;
//             const email = user.email
//             const accessToken = jwt.sign({_id: id,email, username}, process.env.ACCESS_TOKEN_SECRET, {
//                 expiresIn: '20s'
//             })
//             res.json({accessToken, refreshToken, user});
//         })
//     } catch (error) {
//         console.log(error)
//     }
// }




const refreshToken = async(req, res) => {
    // const refreshToken = req.body.refreshToken;
    const refreshToken = req.cookies.refreshToken;
    try {

    const user = await dataClient.findOne({refresh_token: refreshToken});
    if(!user) {
        return res.sendStatus(403);
    }
    // console.log(user);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if(err) return res.sendStatus(403);
        const id = user._id;
        const name = user.name;
        const email = user.email;
        const role = user.__v;
        const urlImage = user.url;
        const accessToken = jwt.sign({id, name, email, role, urlImage}, process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: '20s'
        });
        
        res.json({ accessToken });
        
        
    });
    } catch (error) {
    res.json({error})
    if(!refreshToken) {
    return res.sendStatus(401);
    }
    }
}

module.exports = refreshToken