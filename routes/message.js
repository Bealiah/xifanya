var fs=require('fs');
var express = require('express');
var router = express.Router();
var path='./data/jsonData/messageList.json';

var messageList=[];
var data;

router.get('/',function(req,res){
    var params=req.query;
    params.id=messageList.length;
   messageList.push({
        "id":messageList.length,
        "userName":params.userName,
        "email":params.email,
        "phone":params.phone,
        "message":params.message
    });
    fs.createWriteStream(path,{flags:messageList});
    res.end('200');
});
router.post('/',function(req,res,next){
    var params=req.body;

    params.id=messageList.length;
    data.list.push({
        "id":messageList.length,
        "userName":params.userName,
        "email":params.email,
        "phone":params.phone,
        "message":params.message
    });

    fs.writeFile(path,JSON.stringify(data,null,4),function(err){
        if(err){
            res.end('404');
        }else{
            res.end('200');
        }
    });


});


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
    getList(messageList,function(content,file){
        data=JSON.parse(content);
        messageList=data.list;
    });

}
function getList(list,callback){
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

