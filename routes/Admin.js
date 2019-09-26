const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const Orders = require('../models/Orders');
const Department = require('../models/Department');
const Category = require('../models/Category');
const Product = require('../models/Products');
const TypedError  = require('../modules/ErrorHandler');
//Create account
router.post('/signup', function (req, res, next) {
    const { fullName, email, password, verifyPassword } = req.body;
    req.checkBody('fullName', 'fullname is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('verifyPassword', 'verifyPassword is required').notEmpty();
    let missingFieldErrors = req.validationErrors();
    if (missingFieldErrors) {
      let err = new TypedError('signin error', 400, 'missing_field', {
        errors: missingFieldErrors,
      });
      return next(err);
    }
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'Passwords have to match').equals(verifyPassword);
    let invalidFieldErrors = req.validationErrors();
    if (invalidFieldErrors) {
      let err = new TypedError('signin error', 400, 'invalid_field', {
        errors: invalidFieldErrors,
      });
      return next(err);
    }
    var newAdmin = new Admin({
      email: email,
      password: password,
      fullName: fullName,
    });
    Admin.getAdminByEmail(email, function (error, admin) {
      if (error) return next(err)
      if (admin) {
        let err = new TypedError('signin error', 409, 'invalid_field', {
          message: "Admin already exist"
        });
        return next(err);
      }
      Admin.createAdmin(newAdmin, function (err, admin) {
        if (err) return next(err);
        res.json({ message: 'Admin created' })
      });
    })
});
//Login
router.get('/signin', function (req, res, next) {
  const { email, password } = req.body;
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  let missingFieldErrors = req.validationErrors();
  if (missingFieldErrors) {
    let err = new TypedError('signin error', 400, 'missing_field', {
      errors: missingFieldErrors,
    });
    return next(err);
  }
  req.checkBody('email', 'Email is not valid').isEmail();
  let invalidFieldErrors = req.validationErrors();
  if (invalidFieldErrors) {
    let err = new TypedError('signin error', 400, 'invalid_field', {
      errors: invalidFieldErrors,
    });
    return next(err);
  }
  Admin.getAdminByEmail(email, function (error, admin) {
    if (error) return next(err)
    if (!admin) {
       let err = new TypedError('login error', 403, 'invalid_field', { message: "Incorrect email or password" });
       return next(err);
    }
    Admin.comparePassword(password, admin.password, function (err, isMatch) {
      if (err) return next(err);
      if (isMatch) {
        return res.json("Logged in successfully");
      } else {
        let err = new TypedError('login error', 403, 'invalid_field', { message: "Incorrect email or password" })
        return next(err);
      }
    });
  });
});
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
//Add catagory
router.post('/categories', function (req, res, next) {
  let { categoryName } = req.body;
  var newCategory = new Category({
    categoryName: categoryName
  });
  Category.addCategory(newCategory, function(e, result){
       if(e) return next(e);
       res.send("New Category added successfully");
  });
});
//GET all departments
router.get('/departments', function (req, res, next) {
    Department.getAllDepartments(function (err, d) {
      if (err) return next(err);
      if (d.length < 1) {
        return res.status(404).json({ message: "Departments not found" });
      }
      res.status(200).json({ departments: d });
    });
});
//Add department
router.post('/departments', function (req, res, next) {
  let {departmentName, categories} = req.body;
  var newDept = new Department({
    departmentName: departmentName,
    categories : categories
  });
  Department.addDepartment( newDept, function(e, result){
    if(e) return next(e);
    res.send("New Department added successfully");
  });
});
//GET all products
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

//GET products by ID
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
//Add new product
router.post('/product', function (req, res, next) {
  let { imagePath, title, description, department, category, price, color, size, quantity } = req.body;
  var newProduct = new Product({
    imagePath : imagePath,
    title : title,
    description : description,
    department : department,
    category : category,
    price : price,
    color : color,
    size : size,
    quantity : quantity
  });
  Product.addProduct( newProduct, function(e, result){
    if(e) return next(e);
    res.send(`Product added successfully in ${department} department`);
  });
});
//update product
router.put('/product/:productId', function (req, res, next) {
  let productId = req.params.productId;
  let { price, color, size, qty } = req.body;
    Product.getProductByID(productId, function (err, p) {
      if (err) return next(err);
      Product.updateProductByProductId(
        productId,
        {
          price: price,
          color: color,
          size: size,
          qty: qty
        },
        function (err, result) {
          if (err) return next(err)
          res.json(result)
        }
      ); 
    });
});
//Delete product by productID
router.delete('/product/:productId', function(req, res, next){
    const productId = req.params.productId;
    Product.deleteProductByProductId(productId, function(err,result){
      if(err) return next(err);
      res.send("Product deleted");
    });
});

//GET order details
router.get('/:orderId/order', function (req, res, next) {
  let orderId = req.params.orderId;
  Orders.getOrdersDetailsById(orderId, function (err, order) {
    if (err) return next(err);
    if (!order) {
      let err = new TypedError('order error', 404, 'not_found', { message: "placed order first" });
      return next(err);
    }
    return res.json({ order: order });
  });
});

module.exports = router;