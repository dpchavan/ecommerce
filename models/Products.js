var mongoose = require('mongoose');
var productSchema = mongoose.Schema({
  imagePath: {
    type: String
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  department: {
    type: String
  },
  category: {
    type: String
  },
  price: {
    type: Number
  },
  color: {
    type: String
  },
  size: {
    type: String
  },
  quantity: {
    type: Number
  }
});

var Product = module.exports = mongoose.model('Product', productSchema);

module.exports.getAllProducts = function (callback) {
  Product.find(callback);
};
module.exports.addProduct = function (product, callback) {
  product.save(callback);
};
module.exports.getProductByDepartment = function (department,callback) {
  Product.find({department : department}, callback);
};

module.exports.getProductByCategory = function (category, callback) {
  Product.find({category : category}, callback);
};

module.exports.updateProductByProductId = function (productId, newProduct, callback) {
  let query = { _id: productId };
  Product.find(query, function (err, p) {
    if (err) throw err
    //exist product in databse
    if (p.length > 0) {
      Product.findOneAndUpdate(
        { _id: productId },
            {
            $set: {
                price: newProduct.price,
                color: newProduct.color,
                size: newProduct.size,
                qty: newProduct.qty
            }
        },
        { new: true },
        callback
      )
    } else {
      //no product in database
      newProduct.save(callback)
    }
  })
};
module.exports.deleteProductByProductId = function (id, callback) {
  Product.findByIdAndDelete(id, callback);
};
module.exports.getProductByID = function (id, callback) {
  Product.findById(id, callback);
};