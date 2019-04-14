var mongoose = require('./connectMongoDB.js');

//定义这个数据库表的映射  Schema
var Schema = mongoose.Schema;
var blogSchema = new Schema({
    title: String,
    author: String,
    body: String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },//传入默认参数的方法 
    hidden: Boolean,
    meta: {
      votes: Number,
      favs: Number
    }
  });

//操作数据表需要 用到 Model  模型 
var Blog = mongoose.model('Blog', blogSchema,'blogs');

//暴露 
module.exports = Blog;

//模块化的办法好处是在需要使用的地方 可直接调用 增删改查的方法 不需要再执行以上这些操作了