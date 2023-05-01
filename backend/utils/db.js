const mongoose = require("mongoose");

mongoose.set('strictQuery', false);

const uri = "mongodb://localhost:27017/FullStack";
mongoose.connect(uri, (err) => {
    if(!err) {
        console.log("DB Success to Connected!")
    }
})