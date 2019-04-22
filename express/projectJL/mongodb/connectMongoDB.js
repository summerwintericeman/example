
//引入模块
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/test',{ useNewUrlParser: true },function(err){
    if(err){
        console.log(err);
        return;
    }else{
        console.log('成功链接数据库')
    }
});



module.exports = mongoose;