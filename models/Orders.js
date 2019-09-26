const mongoose = require('mongoose');

OrderSchema = mongoose.Schema({
  orderId: {
    type: String
  },
  totalPrice: {
    type: Number
  },
  address: {
    type: String
  },
  orderDate: {
    type: Date
  }
});

var Order = module.exports = mongoose.model('orders',OrderSchema);

module.exports.placedOrder = function(product,callback){
    product.save(callback);
};

module.exports.getOrdersDetailsById = function(id,callback){
    var query = {orderId : id};
    Order.findOne(query, callback);
};