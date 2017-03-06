require('console.table');
var inquirer = require('inquirer');
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost', 
	port: 3306,
	user: 'root',
	password: 'root',
	database: 'Bamazon'
});

var QUERY_ALL_PRODUCTS = 'SELECT id, name, price, stock_quantity FROM products';
var QUERY_LOW_PRODUCTS = 'SELECT id, name, price, stock_quantity FROM products WHERE stock_quantity < 5';
var QUERY_MODIFY_STOCK = 'UPDATE products SET stock_quantity = ? WHERE id = ?';
var QUERY_ADD_PRODUCT = 'INSERT INTO products SET ?';

// connect to db
connection.connect(function(err) {
	if (err) throw err;
	// console.log('connected as ' + connection.threadId);
});

// display options to user and take appropriate action based on selection
function mainMenu() {
    inquirer.prompt([  
        {
            type: "list",
            name: "mode",
            message: "What would you like to do?",
            choices: ["View All Products", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
        }
    ]).then(function(selection) {
        switch(selection.mode) {
            case 'View All Products':
                viewProducts(QUERY_ALL_PRODUCTS, mainMenu);
                break;
            case 'View Low Inventory':
                viewProducts(QUERY_LOW_PRODUCTS, mainMenu);
                break;
            case 'Add to Inventory':
                viewProducts(QUERY_ALL_PRODUCTS, modifyInventory);
                break;
            case 'Add New Product':
                viewProducts(QUERY_ALL_PRODUCTS, addProduct);
                break;
            case 'Exit':
                connection.end();
                return;
            default:
                console.log('invalid');
                return;
        }
    });
}

// show inventory levels and run callback function
function viewProducts(query, callback) {
    connection.query(query, function(err, res) {
		if (err) throw err;

        // show inventory
		console.table(res);
        console.log('----------------------------------------');

        if (callback && callback !== null) {
            callback();
        }
    });
}

// prompt user for the product to modify
function modifyInventory() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the ID of the item you wish to update",
            name: "id",
            validate: function(str) {
                return !isNaN(parseInt(str));
            }
        },
        {
            type: "input",
            message: "Enter the new quantity",
            name: "stock_quantity",
            validate: function(str) {
                return !isNaN(parseInt(str));
            }
        }
    ]).then(function(product) {
        modifyProduct(product);
    });
}

// update the product in the database
function modifyProduct(product) {
    console.log(product);

    connection.query(QUERY_MODIFY_STOCK, [product.stock_quantity, product.id], function(err, res) {
		if (err) throw err;

        // show inventory
        console.log('----------------------------------------');     
		console.log('Product Updated!');
        console.log('----------------------------------------');     

        mainMenu();  
    });
}

function addProduct() {
    // prompt for values
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the product name",
            name: "name",
            validate: function(str) {
                return str.length > 0;
            }
        },
        {
            type: "input",
            message: "Enter the product department",
            name: "department_name",
            validate: function(str) {
                return str.length > 0;
            }
        },
        {
            type: "input",
            message: "Enter the price",
            name: "price",
            validate: function(str) {
                return !isNaN(parseInt(str));
            }
        },
        {
            type: "input",
            message: "Enter the quantity",
            name: "stock_quantity",
            validate: function(str) {
                return !isNaN(parseInt(str));
            }
        }
    ]).then(function(product) {
        console.log(product);

        // add to db
        connection.query(QUERY_ADD_PRODUCT, [product], function(err, res) {
            if (err) throw err;

            // show inventory
            console.log('----------------------------------------');     
            console.log('Product Added!');
            console.log('----------------------------------------');     

            mainMenu();  
        });
    });
}

// start the app
mainMenu();