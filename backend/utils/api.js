const api = (status, data, produk, message, res) => {
    res.status(status).json([{
        payload: {
            data,
            produk,
            message
        },
        metadata: {
            next: "",
            prev: "",
            current: ""
        }

    }])

}
const apiUser = (status, data, message, res) => {
    res.status(status).json({
        payload: {
            data,
            message
        },
        metadata: {
            next: "",
            prev: "",
            current: ""
        }

    })

}


const productApi = (status, dataProduk, message, res) => {
    res.status(status).json({
        payload: {
            dataProduk,
            message
        },
        metadata: {
            next: "",
            prev: "",
            current: ""
        }

    })

}

module.exports = {api, productApi, apiUser};