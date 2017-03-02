CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products (
	id int(10) not null auto_increment primary key,
    name varchar(20) not null,
    department_name varchar(20) not null,
    price int(10) not null,
    stock_quantity int(10) not null
); 

INSERT INTO products (name, department_name, price, stock_quantity) VALUES ('Product', 'Department', 5, 10);
INSERT INTO products (name, department_name, price, stock_quantity) VALUES ('Spoon', 'Kitchen', 1, 100);
INSERT INTO products (name, department_name, price, stock_quantity) VALUES ('Fork', 'Kitchen', 1, 100);
INSERT INTO products (name, department_name, price, stock_quantity) VALUES ('TV', 'Electronics', 500, 10);
INSERT INTO products (name, department_name, price, stock_quantity) VALUES ('Toaster', 'Electronics', 50, 10);
INSERT INTO products (name, department_name, price, stock_quantity) VALUES ('Product1', 'Department', 5, 10);
INSERT INTO products (name, department_name, price, stock_quantity) VALUES ('Spoon1', 'Kitchen', 1, 100);
INSERT INTO products (name, department_name, price, stock_quantity) VALUES ('Fork1', 'Kitchen', 1, 100);
INSERT INTO products (name, department_name, price, stock_quantity) VALUES ('TV1', 'Electronics', 500, 10);
INSERT INTO products (name, department_name, price, stock_quantity) VALUES ('Toaster1', 'Electronics', 50, 10);