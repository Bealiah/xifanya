/**
 * Created by bealiah on 16-10-4.
 */
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var db=mongoose.connect('mongodb://user:pass@localhost:port//xifanya');
db.connection.on("error", function (error) {  console.log("数据库连接失败：" + error); });
db.connection.on("open", function () {  console.log("------数据库连接成功！------"); });
exports.mongoose = mongoose;