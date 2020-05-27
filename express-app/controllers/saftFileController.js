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
      const companyInfo = {
        name: name,
        address: address,
        phone: phone,
        fax: fax,
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
      res.json(clients);
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

saftFileController.salesInfo = function (req, res) {
  Saft.find().exec(function (err, fileContent) {
    if (err) {
      console.log(err);
    } else {
      const JSONObject = JSON.parse(JSON.stringify(fileContent));
      const sales = JSONObject[3].Invoice;
      const numberOfSales = sales.length;
      res.json({ sales: sales, numberOfSales: numberOfSales });
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

/*
      var date = object[0].AuditFile.Header;

      const numberOfSales =
        object[0].AuditFile.SourceDocuments.SalesInvoices.NumberOfEntries;

      var totalEntries =
        object[0].AuditFile.GeneralLedgerEntries.NumberOfEntries;

      var documentTotalSales = [];

      var grossTotal = object[0].AuditFile.SourceDocuments.SalesInvoices;
      var month = object[0].AuditFile.SourceDocuments.SalesInvoices;

      var monthArray = [];
      var monthTotalArray = [];
      var monthNetArray = [];

      for (let i = 0; i < numberOfSales; i++) {
        monthArray[i] = 0;
        monthTotalArray[i] = 0;
        monthNetArray[i] = 0;
        documentTotalSales[i] =
          object[0].AuditFile.SourceDocuments.SalesInvoices.Invoice[
            i
          ].DocumentTotals.GrossTotal;
      }

      for (let i = 0; i < numberOfSales; i++) {
        switch (month.Invoice[i].Period) {
          case "01":
            monthTotalArray[month.Invoice[i].Period - 1] += parseFloat(
              grossTotal.Invoice[i].DocumentTotals.GrossTotal
            );
            monthNetArray[month.Invoice[i].Period - 1] += parseFloat(
              grossTotal.Invoice[i].DocumentTotals.NetTotal
            );
            monthArray[month.Invoice[i].Period - 1]++;
            break;
          case "02":
            monthTotalArray[month.Invoice[i].Period - 1] += parseFloat(
              grossTotal.Invoice[i].DocumentTotals.GrossTotal
            );
            monthNetArray[month.Invoice[i].Period - 1] += parseFloat(
              grossTotal.Invoice[i].DocumentTotals.NetTotal
            );
            monthArray[month.Invoice[i].Period - 1]++;
            break;
          case "03":
            monthTotalArray[month.Invoice[i].Period - 1] += parseFloat(
              grossTotal.Invoice[i].DocumentTotals.GrossTotal
            );
            monthNetArray[month.Invoice[i].Period - 1] += parseFloat(
              grossTotal.Invoice[i].DocumentTotals.NetTotal
            );
            monthArray[month.Invoice[i].Period - 1]++;
            break;
          case "04":
            monthTotalArray[month.Invoice[i].Period - 1] += parseFloat(
              grossTotal.Invoice[i].DocumentTotals.GrossTotal
            );
            monthNetArray[month.Invoice[i].Period - 1] += parseFloat(
              grossTotal.Invoice[i].DocumentTotals.NetTotal
            );
            monthArray[month.Invoice[i].Period - 1]++;
            break;
          case "05":
            monthTotalArray[month.Invoice[i].Period - 1] += parseFloat(
              grossTotal.Invoice[i].DocumentTotals.GrossTotal
            );
            monthNetArray[month.Invoice[i].Period - 1] += parseFloat(
              grossTotal.Invoice[i].DocumentTotals.NetTotal
            );
            monthArray[month.Invoice[i].Period - 1]++;
            break;
          case "06":
            monthTotalArray[month.Invoice[i].Period - 1] += parseFloat(
              grossTotal.Invoice[i].DocumentTotals.GrossTotal
            );
            monthNetArray[month.Invoice[i].Period - 1] += parseFloat(
              grossTotal.Invoice[i].DocumentTotals.NetTotal
            );
            monthArray[month.Invoice[i].Period - 1]++;
            break;
          case "07":
            monthTotalArray[month.Invoice[i].Period - 1] += parseFloat(
              grossTotal.Invoice[i].DocumentTotals.GrossTotal
            );
            monthNetArray[month.Invoice[i].Period - 1] += parseFloat(
              grossTotal.Invoice[i].DocumentTotals.NetTotal
            );
            monthArray[month.Invoice[i].Period - 1]++;
            break;
          case "08":
            monthTotalArray[month.Invoice[i].Period - 1] += parseFloat(
              grossTotal.Invoice[i].DocumentTotals.GrossTotal
            );
            monthNetArray[month.Invoice[i].Period - 1] += parseFloat(
              grossTotal.Invoice[i].DocumentTotals.NetTotal
            );
            monthArray[month.Invoice[i].Period - 1]++;
            break;
          case "09":
            monthTotalArray[month.Invoice[i].Period - 1] += parseFloat(
              grossTotal.Invoice[i].DocumentTotals.GrossTotal
            );
            monthNetArray[month.Invoice[i].Period - 1] += parseFloat(
              grossTotal.Invoice[i].DocumentTotals.NetTotal
            );
            monthArray[month.Invoice[i].Period - 1]++;
            break;
          case "10":
            monthTotalArray[month.Invoice[i].Period - 1] += parseFloat(
              grossTotal.Invoice[i].DocumentTotals.GrossTotal
            );
            monthNetArray[month.Invoice[i].Period - 1] += parseFloat(
              grossTotal.Invoice[i].DocumentTotals.NetTotal
            );
            monthArray[month.Invoice[i].Period - 1]++;
            break;
          case "11":
            monthTotalArray[month.Invoice[i].Period - 1] += parseFloat(
              grossTotal.Invoice[i].DocumentTotals.GrossTotal
            );
            monthNetArray[month.Invoice[i].Period - 1] += parseFloat(
              grossTotal.Invoice[i].DocumentTotals.NetTotal
            );
            monthArray[month.Invoice[i].Period - 1]++;
            break;
          case "12":
            monthTotalArray[month.Invoice[i].Period - 1] += parseFloat(
              grossTotal.Invoice[i].DocumentTotals.GrossTotal
            );
            monthNetArray[month.Invoice[i].Period - 1] += parseFloat(
              grossTotal.Invoice[i].DocumentTotals.NetTotal
            );
            monthArray[month.Invoice[i].Period - 1]++;
            break;
        }
      }

      var totalCredit = parseInt(
        object[0].AuditFile.SourceDocuments.SalesInvoices.TotalCredit
      );

      var costumers = [];
      var suppliers = [];

      for (let i = 1; i < numberOfClients + 1; i++) {
        costumers[i] = object[0].AuditFile.MasterFiles.Customer[i];
      }
      for (let i = 0; i < numberOfSuppliers; i++) {
        suppliers[i] = object[0].AuditFile.MasterFiles.Supplier[i];
      }

      var productsTam = object[0].AuditFile.MasterFiles.Product.length;
      var products = [];

      for (let i = 1; i < productsTam; i++) {
        products[i - 1] = object[0].AuditFile.MasterFiles.Product[i];
      }

      var totalEntries =
        object[0].AuditFile.GeneralLedgerEntries.NumberOfEntries;

      const numberOfPurchases = totalEntries - numberOfSales;

      var purchaseQuantity = [];
      var purchaseValue = [];

      for (let i = 0; i < numberOfPurchases; i++) {
        purchaseQuantity[i] =
          object[0].AuditFile.GeneralLedgerEntries.Journal[0].Transaction[
            i
          ].Line.length;
      }

      for (let j = 2; j < numberOfPurchases; j++) {
        purchaseValue[j] = parseInt(
          object[0].AuditFile.GeneralLedgerEntries.Journal[0].Transaction[j]
            .Line[0].CreditAmount
        );
      }

      var totalPurchased = 0;

      for (let i = 2; i < purchaseValue.length; i++) {
        totalPurchased += purchaseValue[i];
      }

      res.render("../views/dashboard", {
        companyName: companyName,
        numberOfClients: numberOfClients,
        numberOfSales: numberOfSales,
        numberOfSuppliers: numberOfSuppliers,
        numberOfPurchases: numberOfPurchases,
        monthTotalArray: monthTotalArray,
        totalCredit: totalCredit,
        costumers: costumers,
        totalPurchased: totalPurchased,
        suppliers: suppliers,
        monthTotalArray: monthTotalArray,
        products: products,
        monthArray: monthArray,
        date: date,
        monthNetArray: monthNetArray,
      });
    }
  });
};*/

module.exports = saftFileController;
