var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "1391",
  database: "bamazon_db"
});
connection.connect(function (err) {
  if (err) throw err;
  runManager();
});
function runManager() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Products For Sale",
        "View Low Inventory",
        "Add to Stock",
        "Add New Products",
      ]
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View Products For Sale":
          viewProducts();
          break;

        case "View Low Inventory":
          viewLowInv();
          break;

        case "Add to Stock":
          addStock();
          break;

        case "Add New Products":
          addNewProducts();
          break;
      }
    });
}
function viewProducts() {
  var query = "SELECT * FROM products";
  connection.query(query, function (err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log("SKU: " + res[i].part_number + " || Stock: " + res[i].quantity + " || Description: " + res[i].description);
    }
    runManager();
  });
}
function viewLowInv() {
  var query = "SELECT * FROM products WHERE quantity = ?";
  connection.query(query, "0", function (err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log("SKU: " + res[i].part_number + " || Stock: " + res[i].quantity + " || Description: " + res[i].description);
    }
    runManager();
  });
}
function addStock() {
  inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "Enter Product to Update: "
      },
      {
        name: "amount",
        type: "input",
        message: "Enter New Quantity: ",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function (answer) {
      var query = "UPDATE products SET ? WHERE ?";
      connection.query(query, [{ quantity: answer.amount }, { part_number: answer.item }],
        function (err) {
          if (err) throw err;
        });
      console.log("Stock Updated \n")
      runManager();
    })
}
function addNewProducts() {
  inquirer
    .prompt([
      {
        name: "part_number",
        type: "input",
        message: "Enter SKU: "
      },
      {
        name: "description",
        type: "input",
        message: "Enter Description: "
      },
      {
        name: "upc_number",
        type: "input",
        message: "Enter UPC: ",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "quantity",
        type: "input",
        message: "Enter Quantity: ",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "department",
        type: "input",
        message: "Enter Department: "
      },
      {
        name: "price",
        type: "input",
        message: "Enter Price: ",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])  .then(function (answer) {
      connection.query(
        "INSERT INTO products SET ?",
        {
          part_number: answer.part_number,
          description: answer.description,
          upc_number: answer.upc_number,
          quantity: answer.quantity,
          department: answer.department,
          price: answer.price
        },
        function (err) {
          if (err) throw err;
          console.log("Item Added");
          runManager();
        }
      );
    });
}