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

// connect to db
connection.connect(function(err) {
	if (err) throw err;
	// console.log('connected as ' + connection.threadId);
});

// show customer menu
function mainMenu() {
    connection.query('SELECT id, name, price FROM products', function(err, res) {
		if (err) throw err;

        // show inventory
		console.table(res);
        console.log('----------------------------------------');

        // prompt user for an item to purchase and process the order
        inquirer.prompt([
            {
                type: "input",
                message: "Enter the ID of the item you wish to purchase",
                name: "product_id",
                validate: function(str) {
                    return !isNaN(parseInt(str));
                }
            },
            {
                type: "input",
                message: "Enter the quantity of the item you wish to purchase",
                name: "stock_quantity",
                validate: function(str) {
                    return !isNaN(parseInt(str));
                }
            }
        ]).then(function(order) {
            validateOrder(order);
        });
	});
}

// validate an order and process it if applicable
function validateOrder(order) {
    connection.query('SELECT * FROM products WHERE id = ?', order.product_id, function(err, res) {
        if (err) throw err;

        if (res === null || res.length === 0) {
            console.log('----------------------------------------');
            console.log('No Results Found');
            console.log('----------------------------------------');

            mainMenu();
        } else {
            var orderQuantity = parseInt(order.stock_quantity);

            if (res[0].stock_quantity >= orderQuantity) {
                processOrder(order, res[0]);
            } else {
                console.log('----------------------------------------');
                console.log('Insufficient quantity!');
                console.log('----------------------------------------');

                mainMenu();
            }
        }
    });
}

// update database and display receipt
function processOrder(order, inventory) {
    connection.query('UPDATE products SET stock_quantity = ? WHERE id = ?', 
    [parseInt(inventory.stock_quantity) - parseInt(order.stock_quantity), order.product_id], 
    function(err, res) {
        if (err) throw err;

        var orderCost = parseInt(order.stock_quantity) * parseInt(inventory.price);

        console.log('----------------------------------------');
        console.log('You have purchased %s %s(s) for $%s.', order.stock_quantity, inventory.name, orderCost);
        console.log('----------------------------------------');

        connection.end();
    });
}

// start the app
mainMenu();