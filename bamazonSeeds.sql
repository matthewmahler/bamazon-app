DROP DATABASE IF EXISTS bamazon_DB;
CREATE database bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  part_number VARCHAR(12) NOT NULL,
  description VARCHAR(200) NOT NULL,
  upc_number VARCHAR(15) NOT NULL,
  quantity INT NOT NULL,
  department VARCHAR(30) NOT NULL,
  price INT NOT NULL,
  PRIMARY KEY (sku)
);