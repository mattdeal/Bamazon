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

function mainMenu() {
    // todo: show options
}

function viewProducts() {
    // todo: show id, name, price, qty
    // todo: return to main menu
}

function viewLowInventory() {
    // todo: show id, name, price, qty where qty < 5
    // todo: return to main menu
}

function modifyInventory() {
    // todo: add to current inventory
    // todo: display updated inventory for updated product
    // todo: return to main menu
}

function addProduct() {
    // todo: prompt for values
    // todo: add to db
    // todo: show result
    // todo: return to main menu
}

// start the app
mainMenu();