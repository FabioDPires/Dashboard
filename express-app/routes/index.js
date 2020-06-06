var express = require("express");
var router = express.Router();
var saft = require("../controllers/saftFileController");

/* GET home page. */

router.get("/information", saft.companyInfo);

router.get("/clients", saft.clientsInfo);

router.get("/products", saft.productsInfo);

router.get("/sales", saft.revenuePerMonth);

router.get("/purchases", saft.purchaseDetails);

router.get("/suppliers", saft.suppliersInfo);

module.exports = router;
