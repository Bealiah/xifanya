//var Product = require('../data/models/product.js');
var fs=require('fs');
var express = require('express');
var router = express.Router();


router.get('/',function(req,res){
    var params=req.query;

    return handleEvents.getProductList(params);
});

function init(){
    var files=[];
    files.push('./data/jsonData/newsList.json');
    var callback=function(content,file){
        productList=content.productList;console.log(content);
    };
    for(var i=0;i<files.length;i++){
        fs.readFile(files[i],'utf8',function(err,data){
            if(err){
               // writeLog({filename:file},'read file content error');
                console.log(err,'read file content error');
            }else{
                callback(data);
            }
        });
    }
}

var productList=[];

var handleEvents={
    getProductList:function (params){
        var start=params.page*params.size;
        return list=productList.slice(start,start+params.size+1);
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

init();

module.exports=router;

