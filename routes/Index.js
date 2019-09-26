var express = require('express');
var router = express.Router();
const Product = require('../models/Products');
const Department = require('../models/Department');
const Category = require('../models/Category');
const TypedError = require('../modules/ErrorHandler');

//GET products
router.get('/products', function (req, res, next) {
  Product.getAllProducts(function (e, products) {
    if (e) {
      e.status = 406; return next(e);
    }
    if (products.length < 1) {
      return res.status(404).json({ message: "products not found" })
    }
    res.json({ products: products })
  })
});

//GET product by ID
router.get('/products/:id', function (req, res, next) {
  let productId = req.params.id;
  Product.getProductByID(productId, function (e, item) {
    if (e) {
      e.status = 404; return next(e);
    }
    else {
      res.json({ product: item })
    }
  });
});

//GET all departments
router.get('/departments', function (req, res, next) {
  Department.getAllDepartments(function (err, d) {
    if (err) return next(err);
    if (d.length < 1) {
      return res.status(404).json({ message: "Departments not found" });
    }
    res.status(200).json({ departments: d })
  })
})

//GET all categories
router.get('/categories', function (req, res, next) {
  Category.getAllCategories(function (err, c) {
    if (err) return next(err);
    if (c.length < 1) {
      return res.status(404).json({ message: "categories not found" });
    }
    res.json({ categories: c });
  });
});

//Search product by dept, catagory and ID
router.get('/search', function (req, res, next) {
  const { Category, department, productId } = req.body;
  Product.getProductByDepartment(department, function (err, p) {
    if (err) return next(err);
    if (p.length > 0) {
      return res.json({ products: p });
    } else {
      Product.getProductByCategory(Category, function (err, p) {
        if (err) return next(err);
        if (p.length > 0) {
          return res.json({ products: p });
        } else {
          Product.getProductByID(productId, function (err, p) {
              let error = new TypedError('search', 404, 'not_found', { message: "no product exist" });
              if (err) {
                return next(error);
              }
              if (p) {
                return res.json({ products: p });
              } else {
              return next(error);
            }
          });
        }
      });
    }
  });
});

module.exports = router;