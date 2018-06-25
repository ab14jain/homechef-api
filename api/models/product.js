const mongose = require('mongoose');

const productSchema = mongose.Schema({
    "_id": mongose.Schema.Types.ObjectId, 
    "name": String,     
    "price": Number
});

module.exports = mongose.model('Product', productSchema);