//var Product = require('../data/models/product.js');
var fs=require('fs');
var express = require('express');
var router = express.Router();

var newsList=[];

router.get('/',function(req,res){
    var params=req.query;

    var list=handleEvents.getNewsList(params);
    var titleList=handleEvents.getTitleList(list.slice(0));
    var page=newsList.length/params.size;

    res.send({list:list,titleList:titleList,info:{page:Math.ceil(page)}});
});

router.get('/detail',function(req,res){
    var id=Number(req.query.id);
    var item= handleEvents.findWhere(newsList,{id:id-1});
    fs.readFile('data/article/article_'+id+'.html','utf8',function(err,data){
        if(err){
            // writeLog({filename:file},'read file content error');
            console.log(err,'read file content error');
        }else{
            item.detail=data;
            res.send(item);
        }
    });

});



var handleEvents={
    distance:function(reservedList,list){

        for(var i=0;i<list.length;i++){

            for(var j=0;j<reservedList.length;j++){
                if(reservedList[j].id==list[i].id){
                    reservedList.splice(j,1);
                    return false;

                }
            }

        }
        return reservedList;
    },
    getNewsList:function (params){
        var page=Number(params.page);
        var size=Number(params.size);
        var id=Number(params.id)-1;
        if(id>0){
            var item=this.findWhere(newsList,{id:id});
            var arr=[];
            arr.push(item);
            return arr;
        }else{
            var start=page*size;
            return newsList.slice(start,start+size);
        }


    },
    findWhere:function(e,t){
        var i, s = e.length, a = 0, o = 0;
        if (0 === e.length)
            return i;
        for (var n = 0; n < s; n++) {
            a = 0,
                o = 0;
            for (var r in t)
                a++,
                e[n][r] === t[r] && (i = e[n],
                    o++);
            if (a === o)
                return i
        }
    },
    getTitleList:function(list){
        var val;
        var arr=newsList.slice(0);
        if(arr.length>=0 && list.length>=0){

            do{
                val=this.distance(arr,list);

            }while(!val);

            return val;
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
    where:function(){

    }
};

function init(){
    var files=[];
    files.push('./data/jsonData/newsList.json');
    var callback=function(content,file){
        newsList=JSON.parse(content).list;
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

init();

module.exports=router;