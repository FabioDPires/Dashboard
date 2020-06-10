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

router.get("/client/:id", saft.clientDetails);

router.get("/product/:id", saft.productDetails);

router.get("/supplier/:id", saft.supplierDetails);

router.get("/sales/:id", saft.saleDetail);
module.exports = router;
