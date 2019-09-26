const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var adminSchema = mongoose.Schema({
    email : {
        type : String
    },
    password : {
        type : String
    },
    fullName : {
        type : String
    }
});
var Admin = module.exports = mongoose.model('Admin', adminSchema);
module.exports.createAdmin = function (newAdmin, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newAdmin.password, salt, function (err, hash) {
            newAdmin.password = hash;
            newAdmin.save(callback);
        });
    });
};
module.exports.getAdminByEmail = function(email,callback){
    var query = {email : email};
    Admin.findOne(query, callback);
};
//get admin by ID
module.exports.getAdminById = function(id,callback){
    Admin.findById(id, callback);
};
module.exports.comparePassword = function (givenPassword, hash, callback) {
    bcrypt.compare(givenPassword, hash, function (err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
};
//for more than one admin
module.exports.getAllAdmin = function (callback) {
    Admin.find(callback);
};