const mongoose = require('mongoose');


const TransactionSchema = mongoose.Schema({
    transactionhash:String,
    from:String,
    to:String,
    blockNumber:Number
})

module.exports = mongoose.model('transaction',TransactionSchema)