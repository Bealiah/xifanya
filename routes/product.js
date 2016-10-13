var Product = require('../data/models/product.js');
var express = require('express');
var router = express.Router();

router.get('/',function(req, res) {
    var name=req.query.name;
    var obj={};
    if(name){//update
        obj={
            title:name+'|电影|管理|moive.me',
            label:'编辑电影:'+name,
            movie:name
        };
        var callback=function(err){
            return res.render('movie', obj);
            console.log('err',err);
        };
        Product.save(obj,callback);

    } else {
        return res.render('movie',{
            title:'新增加|电影|管理|moive.me',
            label:'新增加电影',
            movie:false
        });
    }
});
module.exports=router;

