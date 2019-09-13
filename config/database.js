const mongoose = require('mongoose');
const chalk = require('chalk');
const dbURL = require('./properties').DB;

mongoose.Promise = global.Promise;

const connected = chalk.default.bold.cyan;
const error = chalk.default.bold.yellow;
const disconnected = chalk.default.bold.red;
const termination = chalk.default.bold.magenta;



mongoose.connect(dbURL, {
    useNewUrlParser: true
}).then(() => {
    console.log(connected("Successfully connected to the database"));    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

