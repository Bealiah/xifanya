//var Product = require('../data/models/product.js');
var fs=require('fs');
var express = require('express');
var router = express.Router();


router.get('/',function(req,res){
    var params=req.query;

    var list=handleEvents.getProductList(params);
    res.send({list:list,series:series});
});


var productList=[],
    series=[];

var handleEvents={
    getProductList:function (params){

        var page=Number(params.page);
        var size=Number(params.size);
        var start=page*size;
        return productList.slice(start,start+size);
    },
    scanFile:function(path){
        var fileList    = [],
            folderList  = [],
            walk = function(path, fileList, folderList){
                files = fs.readdirSync(path);
                files.forEach(function(item) {
                    var tmpPath = path + '/' + item,
                        stats = fs.statSync(tmpPath);

                    if (stats.isDirectory()) {
                        walk(tmpPath, fileList, folderList);
                        folderList.push(tmpPath);
                    } else if(reg.test(tmpPath)){

                        fileList.push(tmpPath);
                    }
                });
            };

        walk(path, fileList, folderList);

        console.log('scan ' + path +' successfully');

        return fileList;
    },
    where:function(){

    }
};

function init(){
    getList(productList,'./data/jsonData/productList.json',function(content,file){
        productList=JSON.parse(content).list;
    });
    getList(series,'./data/jsonData/series.json',function(content,file){
        series=JSON.parse(content).list;
    });
}
function getList(list,path,callback){
    var files=[];
    files.push(path);

    for(var i=0;i<files.length;i++){
        fs.readFile(files[i],'utf8',function(err,data){
            if(err){
                // writeLog({filename:file},'read file content error');
                console.log(err,'read file content error');
            }else if(typeof callback ==='function'){
                callback(data);
            }
        });
    }
}
init();

module.exports=router;

