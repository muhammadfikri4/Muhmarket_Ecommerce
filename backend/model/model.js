// const { text } = require("express");
const mongoose = require("mongoose");

const dataClient = mongoose.model("Data-Client",{
    name: {
        type: String,
        required: true
    },
    email:  {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    refresh_token: {
        type: String
    },
    image: {
        type: String,
        require: true
    },
    url: {
        type: String,
        require: true
    },
    namaToko: {
        type: String
    },
    produk: {
        type: Array
    }
    ,
    alamatNamaJalanToko: {
        type: String
    },
    alamatKecamatanToko: {
        type: String
    },
    alamatKabupatenKotaToko: {
        type: String
    },
    alamatProvinsiToko: {
        type: String
    },
    alamatNegaraToko: {
        type: String
    },
    alamatKodeposToko: {
        type: String
    },
    noHpToko: {
        type: String
    }
    
});

module.exports = dataClient;