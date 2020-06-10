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
      let products = [];
      const JSONObject = JSON.parse(JSON.stringify(fileContent));
      const product = JSONObject[1].Product;
      const numberProducts = product.length - 1; //"Linha especial" doesn´t count as a product
      for (let i = 0; i < numberProducts; i++) {
        products[i] = product[i];
      }
      const sales = JSONObject[3].SalesInvoices.Invoice;
      let productSales = [];

      for (let invoice = 0; invoice < sales.length; invoice++) {
        let lines = sales[invoice].Line;
        for (let l = 0; l < lines.length; l++) {
          productSales.push({
            produto: lines[l].ProductCode,
            quantidade: parseFloat(lines[l].Quantity),
            nome: lines[l].ProductDescription,
          });
        }
      }

      var holder = {};

      productSales.forEach(function (d) {
        if (holder.hasOwnProperty(d.produto)) {
          holder[d.produto] = holder[d.produto] + d.quantidade;
        } else {
          holder[d.produto] = d.quantidade;
        }
      });

      var productSales2 = [];

      for (var prop in holder) {
        productSales2.push({ produto: prop, quantidade: holder[prop] });
      }
      productSales2.sort(function (a, b) {
        var keyA = a.quantidade,
          keyB = b.quantidade;
        // Compare the 2 dates
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
      });

      //POR VALOR

      productSales3 = [];
      for (let invoice = 0; invoice < sales.length; invoice++) {
        let lines = sales[invoice].Line;
        for (let l = 0; l < lines.length; l++) {
          productSales3.push({
            produto: lines[l].ProductCode,
            valorVenda: parseFloat(lines[l].CreditAmount),
          });
        }
      }

      var holder2 = {};

      productSales3.forEach(function (d) {
        if (holder2.hasOwnProperty(d.produto)) {
          holder2[d.produto] = holder2[d.produto] + d.valorVenda;
        } else {
          holder2[d.produto] = d.valorVenda;
        }
      });

      var productSales4 = [];

      for (var prop in holder2) {
        productSales4.push({ produto: prop, valorVenda: holder2[prop] });
      }
      productSales4.sort(function (a, b) {
        var keyA = a.valorVenda,
          keyB = b.valorVenda;
        // Compare the 2 dates
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
      });

      console.log("TAMANHO :", productSales2.length);
      res.json({
        products: products,
        quantity: numberProducts,
        productSales: productSales2,
        productsSalesMoney: productSales4,
      });
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
      let taxSales = 0;
      for (let i = 0; i < 12; i++) {
        monthSales[i] = 0;
      }
      const JSONObject = JSON.parse(JSON.stringify(fileContent));
      const liquidSalesValue = parseFloat(
        JSONObject[3].SalesInvoices.TotalCredit
      );
      const sales = JSONObject[3].SalesInvoices.Invoice;
      const numberOfSales = sales.length;

      for (let i = 0; i < sales.length; i++) {
        console.log("Mes:", sales[i].Period);
        console.log("Net Total:", sales[i].DocumentTotals.NetTotal);
        taxSales += parseFloat(sales[i].DocumentTotals.GrossTotal);
        console.log("VALOR BRUTO:", sales[i].DocumentTotals.GrossTotal);

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

      let ClientSales = JSONObject[1].GeneralLedgerAccounts;
      let clientSales = [];

      for (let i = 6; i < 13; i++) {
        clientSales[i - 6] = {
          nome: ClientSales.Account[i].AccountDescription,
          valor: ClientSales.Account[i].ClosingDebitBalance,
        };
      }
      res.json({
        numberOfSales: numberOfSales,
        monthSales: monthSales,
        TotalCredit: liquidSalesValue,
        clientsSales: clientSales,
        taxSales: taxSales,
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
      let totalPurchase = 0;
      let monthPurchases = [];
      for (let i = 0; i < 12; i++) {
        monthPurchases[i] = 0;
      }

      const JSONObject = JSON.parse(JSON.stringify(fileContent));
      const purchases = JSONObject[2].Journal[1].Transaction;

      for (let i = 0; i < purchases.length; i++) {
        monthPurchases[purchases[i].Period - 1] += parseFloat(
          purchases[i].Lines.CreditLine.CreditAmount
        );
        totalPurchase += parseFloat(purchases[i].Lines.CreditLine.CreditAmount);
        console.log(
          " MES:",
          purchases[i].Period,
          " VALOR:",
          purchases[i].Lines.CreditLine.CreditAmount
        );
      }
      for (let i = 0; i < monthPurchases.length; i++) {
        monthPurchases[i] = parseFloat(monthPurchases[i].toFixed(2));
      }

      numberOfPurchases = purchases.length;

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

saftFileController.clientDetails = function (req, res) {
  Saft.find().exec(function (err, fileContent) {
    if (err) {
      console.log(err);
    } else {
      const JSONObject = JSON.parse(JSON.stringify(fileContent));
      const clients = JSONObject[1].Customer;
      var costumers = [];
      let desiredCustomer;
      for (let i = 2; i < clients.length; i++) {
        costumers[i] = clients[i];
        console.log(
          "CLIENTE:",
          costumers[i].CustomerID + " --->NOME: " + costumers[i].CompanyName
        );

        console.log("PROCURA: ", req.params.id);
        console.log("É IGUAL?:", costumers[i].CustomerID == req.params.id);
        if (costumers[i].CustomerID == req.params.id) {
          desiredCustomer = costumers[i];
        }
      }
      res.json({ cliente: desiredCustomer });
    }
  });
};

saftFileController.productDetails = function (req, res) {
  Saft.find().exec(function (err, fileContent) {
    if (err) {
      console.log(err);
    } else {
      const JSONObject = JSON.parse(JSON.stringify(fileContent));
      const product = JSONObject[1].Product;
      var products = [];
      let desiredProduct;
      const numberProducts = product.length - 1; //"Linha especial" doesn´t count as a product
      for (let i = 0; i < numberProducts; i++) {
        products[i] = product[i];
        if (products[i].ProductCode == req.params.id) {
          desiredProduct = products[i];
        }
      }
      const sales = JSONObject[3].SalesInvoices.Invoice;
      let productSales = [];
      let totalVendas = 0;
      let quantidadeVendida = 0;

      for (let invoice = 0; invoice < sales.length; invoice++) {
        let lines = sales[invoice].Line;
        for (let l = 0; l < lines.length; l++) {
          if (lines[l].ProductCode == req.params.id) {
            console.log("IGUAL");
            totalVendas += parseFloat(lines[l].CreditAmount);
            quantidadeVendida += parseFloat(lines[l].Quantity);
            console.log("VENDA:", invoice, " LINHA:", l);
          }
        }
        totalVendas = parseFloat(totalVendas.toFixed(2));
      }
      res.json({
        produto: desiredProduct,
        totalVendas: totalVendas,
        quantidadeVendida: quantidadeVendida,
      });
    }
  });
};

saftFileController.supplierDetails = function (req, res) {
  Saft.find().exec(function (err, fileContent) {
    if (err) {
      console.log(err);
    } else {
      const JSONObject = JSON.parse(JSON.stringify(fileContent));
      const supplier = JSONObject[1].Supplier;
      var suppliers = [];
      let desiredSupplier;

      for (let i = 0; i < supplier.length; i++) {
        suppliers[i] = supplier[i];
        if (suppliers[i].SupplierID == req.params.id) {
          desiredSupplier = suppliers[i];
        }
      }
      res.json({ supplier: desiredSupplier });
    }
  });
};

saftFileController.saleDetail = function (req, res) {
  Saft.find().exec(function (err, fileContent) {
    if (err) {
      console.log(err);
    } else {
      const JSONObject = JSON.parse(JSON.stringify(fileContent));
      const sales = JSONObject[3].SalesInvoices.Invoice;
      let desiredMonth = [];
      console.log("MES:", req.params.id);
      for (let i = 0; i < sales.length; i++) {
        if (sales[i].Period == req.params.id) {
          desiredMonth.push(sales[i]);
        }
      }
      res.json({ vendas: desiredMonth });
    }
  });
};

module.exports = saftFileController;
