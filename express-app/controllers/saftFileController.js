var mongoose = require("mongoose");
var Saft = require("../models/saftFile");
var saftFileController = {};

saftFileController.companyInfo = function (req, res) {
  Saft.find().exec(function (err, fileContent) {
    if (err) {
      console.log("Error: ", error);
      res.json({ Error: err });
    } else {
      const JSONObject = JSON.parse(JSON.stringify(fileContent));
      const name = JSONObject[0].CompanyName;
      const address =
        JSONObject[0].CompanyAddress.AddressDetail +
        ", " +
        JSONObject[0].CompanyAddress.City +
        ", " +
        JSONObject[0].CompanyAddress.PostalCode;
      const phone = JSONObject[0].Telephone;
      const fax = JSONObject[0].Fax;
      const fiscalYear = JSONObject[0].FiscalYear;
      const companyInfo = {
        name: name,
        address: address,
        phone: phone,
        fax: fax,
        fiscalYear: fiscalYear,
      };
      res.json(companyInfo);
    }
  });
};

saftFileController.clientsInfo = function (req, res) {
  Saft.find().exec(function (err, fileContent) {
    if (err) {
      console.log("Error: ", error);
      res.json({ Error: err });
    } else {
      const JSONObject = JSON.parse(JSON.stringify(fileContent));
      const clients = JSONObject[1].Customer;
      const numberOfClients = clients.length - 2; //Consumidor final não entra nas contas
      let clientsFinal = [];
      for (let i = 2; i < clients.length; i++) {
        clientsFinal.push(JSONObject[1].Customer[i]);
      }
      res.json({ numberOfClients: numberOfClients, clients: clientsFinal });
    }
  });
};

saftFileController.productsInfo = function (req, res) {
  Saft.find().exec(function (err, fileContent) {
    if (err) {
      console.log("Error: ", error);
      res.json({ Error: err });
    } else {
      const JSONObject = JSON.parse(JSON.stringify(fileContent));
      const products = JSONObject[1].Product;
      const numberProducts = products.length - 1; //"Linha especial" doesn´t count as a product
      res.json({ products: products, quantity: numberProducts });
    }
  });
};

saftFileController.suppliersInfo = function (req, res) {
  Saft.find().exec(function (err, fileContent) {
    if (err) {
      console.log(err);
    } else {
      const JSONObject = JSON.parse(JSON.stringify(fileContent));
      const suppliers = JSONObject[1].Supplier;
      const numberOfSuppliers = suppliers.length;
      res.json({ suppliers: suppliers, numberOfSuppliers: numberOfSuppliers });
    }
  });
};

saftFileController.revenuePerMonth = function (req, res) {
  Saft.find().exec(function (err, fileContent) {
    if (err) {
      console.log(err);
    } else {
      months = [];
      months[0] = "Janeiro";
      months[1] = "Fevereiro";
      months[2] = "Março";
      months[3] = "Abril";
      months[4] = "Maio";
      months[5] = "Junho";
      months[6] = "Julho";
      months[7] = "Agosto";
      months[8] = "Setembro";
      months[9] = "Outubro";
      months[10] = "Novembro";
      months[11] = "Dezembro";
      let monthSales = [];
      for (let i = 0; i < 12; i++) {
        monthSales[i] = 0;
      }
      const JSONObject = JSON.parse(JSON.stringify(fileContent));
      const liquidSalesValue = JSONObject[3].SalesInvoices.TotalCredit;
      const sales = JSONObject[3].SalesInvoices.Invoice;
      const numberOfSales = sales.length;
      for (let i = 0; i < sales.length; i++) {
        console.log("Mes:", sales[i].Period);
        console.log("Net Total:", sales[i].DocumentTotals.NetTotal);
        monthSales[sales[i].Period - 1] =
          monthSales[sales[i].Period - 1] +
          parseFloat(sales[i].DocumentTotals.NetTotal);
      }
      for (let i = 0; i < monthSales.length; i++) {
        monthSales[i] = parseFloat(monthSales[i].toFixed(2));
      }

      for (let i = 0; i < 12; i++) {
        monthSales[i] = {
          mes: months[i],
          vendas: monthSales[i],
        };
      }
      res.json({
        numberOfSales: numberOfSales,
        monthSales: monthSales,
        TotalCredit: liquidSalesValue,
      });
    }
  });
};

saftFileController.purchaseDetails = function (req, res) {
  Saft.find().exec(function (err, fileContent) {
    if (err) {
      console.log(err);
    } else {
      months = [];
      months[0] = "Janeiro";
      months[1] = "Fevereiro";
      months[2] = "Março";
      months[3] = "Abril";
      months[4] = "Maio";
      months[5] = "Junho";
      months[6] = "Julho";
      months[7] = "Agosto";
      months[8] = "Setembro";
      months[9] = "Outubro";
      months[10] = "Novembro";
      months[11] = "Dezembro";
      let numberOfSuppliersPurchases = 0;
      let totalPurchase = 0;
      let monthPurchases = [];
      for (let i = 0; i < 12; i++) {
        monthPurchases[i] = 0;
      }

      const JSONObject = JSON.parse(JSON.stringify(fileContent));
      const purchases = JSONObject[2].Journal[1].Transaction;

      for (let i = 0; i < purchases.length; i++) {
        if (i == 0 || i % 7 == 0 || i == 17 || i === 41) {
          numberOfSuppliersPurchases++;
          console.log(
            "TRANSFORMADO!!!! MES:",
            purchases[i].Period,
            " VALOR:",
            purchases[i].Lines.CreditLine.CreditAmount
          );
        } else {
          monthPurchases[purchases[i].Period - 1] += parseFloat(
            purchases[i].Lines.CreditLine.CreditAmount
          );
          totalPurchase += parseFloat(
            purchases[i].Lines.CreditLine.CreditAmount
          );
          console.log(
            "NORMAL!!!! MES:",
            purchases[i].Period,
            " VALOR:",
            purchases[i].Lines.CreditLine.CreditAmount
          );
        }
      }
      for (let i = 0; i < monthPurchases.length; i++) {
        monthPurchases[i] = parseFloat(monthPurchases[i].toFixed(2));
      }

      numberOfPurchases = purchases.length - numberOfSuppliersPurchases;

      for (let i = 0; i < 12; i++) {
        monthPurchases[i] = {
          mes: months[i],
          compras: monthPurchases[i],
        };
      }

      let supplierPurchases = JSONObject[1].GeneralLedgerAccounts;
      let supplierBuy = [];

      for (let i = 16; i < 23; i++) {
        supplierBuy[i - 16] = {
          nome: supplierPurchases.Account[i].AccountDescription,
          valor: supplierPurchases.Account[i].ClosingCreditBalance,
        };
      }

      res.json({
        numberOfPurchases: numberOfPurchases,
        purchasesPerMonth: monthPurchases,
        purchases: totalPurchase,
        suppliersPurchases: supplierBuy,
      });
    }
  });
};

module.exports = saftFileController;
