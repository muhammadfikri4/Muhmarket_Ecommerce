const mongoose = require("mongoose");

const product = mongoose.model("product",{
    idUser: {
        type: String,
        required: true
    },
    namaProduk:  {
        type: String,
        required: true
    },
    hargaProduk: {
        type: String,
        require: true
    },
    bioProduk: {
        type: String,
        require: true
    },
    imageProduk: {
        type: String,
        require: true
    },
    urlImage: {
        type: String,
        require: true
    }
});

module.exports = product;