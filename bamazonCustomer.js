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

connection.connect(function(err) {
	if (err) throw err;
	// console.log('connected as ' + connection.threadId);
});

// todo: main menu
// - show all products
// - prompt for product id, quantity
// - - if ID AND Quantity, place order else show error and return to main menu

// todo: purchaseItem(id, qty)
// - decrease item.quantity by qty
// - if success, show user receipt

// show customer menu
function mainMenu() {
    connection.query('SELECT * FROM products', function(err, res) {
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
            },{
                type: "input",
                message: "Enter the quantity of the item you wish to purchase",
                name: "quantity",
                validate: function(str) {
                    return !isNaN(parseInt(str));
                }
            }
        ]).then(processOrder(order));
	});
}

// validate and process an order
function processOrder(order) {
    connection.query('SELECT * FROM products WHERE id = ?', order.product_id, function(err, res) {
        if (err) throw err;

        
    });
}

// start the app
mainMenu();