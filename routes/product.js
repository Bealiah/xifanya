//var Product = require('../data/models/product.js');
var fs=require('fs');
var express = require('express');
var router = express.Router();


var productList=[],
    series=[];

router.get('/',function(req,res){
    var params=req.query;
    var obj=handleEvents.getData(params);

    res.send({
        list:obj.list,
        series:series,
        info:{
            page:obj.page
        }
    });
});



var handleEvents={
    getData:function (params){
        var series=params.type===''?undefined:params.type;
        var page=Number(params.page);
        var size=Number(params.size);
        var start=page*size;
        var pageCount,list;

        if(isNaN(series)){

            pageCount=Math.ceil(productList.length/size);
            return {
                    page:pageCount,
                    list:productList.slice(start,start+size)
            };
        }else{
            series=Number(series);
            list= this.where(productList,{type:series});

            return {
                page:Math.ceil(list.length/size),
                list:list.slice(start,start+size)
            };

        }

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
    where:function(e,t){
        var i, s = e.length, a = 0, o = 0,arr=[];
        if (0 === e.length)
            return arr;
        for (var n = 0; n < s; n++) {
            a = 0,
                o = 0;
            for (var r in t)
                a++,
                    e[n][r] === t[r] && (i = e[n],
                    o++);
            if (a === o)
                arr.push(e[n]);
        }
        return arr;
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

