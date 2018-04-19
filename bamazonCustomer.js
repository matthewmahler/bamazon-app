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
  searchProducts();
});
function searchProducts() {
  inquirer
    .prompt({
      name: "purchase",
      type: "input",
      message: "What item would you like to buy?"
    },

  )
    .then(function (answer) {
      console.log(answer.purchase);
      connection.query("SELECT part_number, description, quantity, price FROM products WHERE ?", { part_number: answer.purchase }, function (err, res) {
        console.log(
          "Product: " +
          res[0].part_number +
          " || Description: " +
          res[0].description +
          " || price: " +
          res[0].price
        );
        setAmount();
      });
      function setAmount() {
        inquirer
          .prompt({
            name: "number",
            type: "input",
            message: "How many would you like to buy?",
            validate: function (value) {
              if (isNaN(value) === false) {
                return true;
              }
              return false;
            }

          }).then(function (answer) {
            console.log(answer.number);
            connection.query("SELECT part_number quantity FROM products WHERE ?", { part_number: answer.purchase }, function (err, res) {
              if (res.quantity < answer.number) {
                console.log("Not enough in stock!");
              } else {

              }

            });
          });
      }
    });
}

