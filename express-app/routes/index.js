var express = require("express");
var router = express.Router();
var saft = require("../controllers/saftFileController");

/* GET home page. */

router.get("/information", saft.companyInfo);

router.get("/clients", saft.clientsInfo);

router.get("/products", saft.productsInfo);

module.exports = router;
