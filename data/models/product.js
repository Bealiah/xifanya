/**
 * Created by bealiah on 16-10-4.
 */

var mongodb=require('../../mongodb');
var ProductSchema=require('../schemas/product');

var Product = mongodb.mongoose.model("Product", ProductSchema);
var ProductDao=function(obj){
console.log(obj);
};
ProductDao.prototype.save=function(obj,callback){
    var product=new Product(obj);
    product.save(function(err){
        callback(err);
    });
};
module.exports = new ProductDao();