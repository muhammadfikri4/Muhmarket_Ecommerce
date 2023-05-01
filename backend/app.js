const express = require("express");
const app = express();
const router = express.Router();
const port = 5000;

const dotenv = require("dotenv");
dotenv.config();

// DB & Model
require("./utils/db");
const dataClient = require("./model/model");
const product = require("./model/product");

// Package
const fs = require("fs");
const session = require("express-session");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const jwt_decode = require("jwt-decode");
const multer = require("multer");
const path = require("path");

//Router
const register = require("./router/register");
const login = require("./router/login");
const logout = require("./router/logout");
const getUser = require("./router/getUser");
const verify = require("./middleware/verify");
const refreshToken = require("./router/refreshToken");
const addProduct = require("./router/addProduct");
const getProduct = require("./router/getProduct");
const registerToko = require("./router/registerToko");
const detailProduct = require("./router/detailProduct");
const getData = require("./router/getData");
const updateRole = require("./router/updateRole");
const getShop = require("./router/getShop");
const detailProduk = require("./router/detailPrd");
const deleteProduk = require("./router/deleteProduk");
const refreshProduk = require("./router/refreshProduk");

const corsOptions = {
  credentials: true,
  origin: "http://localhost:3000",
};
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().getTime()}_${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: fileStorage, fileFilter });

// Middleware
app.use(cors(corsOptions));
app.use(cookieParser("refreshToken"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    cookie: { maxAge: 60000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use("/images", express.static(path.join(__dirname, "images")));

// xD---------------------------------------------------------------------------------------------------xD //

app.get("/getUser", getUser);

app.get("/produk", getProduct);

app.post("/shop", upload.single("imageProduk"), addProduct);

app.post("/registerToko", registerToko);

app.post("/detailProduk", detailProduct);

app.get("/data", getData);

app.get("/refreshProduk", refreshProduk);

app.delete("/deleteProduct/:id", deleteProduk);

app.post("/dProduk", detailProduk);

app.post("/updateRole", updateRole);

app.get("/getShop/:namaToko", getShop);

app.post("/register", upload.single("image"), register);

app.post("/login", login);

app.get("/token", refreshToken);

app.delete("/logout", logout);

app.get("/cookies", (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  res.json({ refreshToken });
});

app.use((req, res) => {
  res.status(404);
  res.send("404 Not Found");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
