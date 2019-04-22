var  mongoose = require('../connectMongoDB.js')

//定义这个数据库表的映射  Schema

var  Schema = mongoose.Schema;
var userSchema = new Schema({
    name: String,
    passWord: String,
    phone: Number,
    reg_time: { type: Date, default: Date.now },
    last_login_time: { type: Date, default: Date.now },
    status: {type: Number, default: 1}
})





var User = mongoose.model('User',userSchema,'users');

//暴露
module.exports = User;