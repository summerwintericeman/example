//mongoose实现数据的增删改查


//引入模块
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//链接数据库  1
// mongoose.connect('mongodb://localhost/test');
// //如果有密码的数据库 需要拼接账号和密码  
// // mongoose.connect('mongodb://账号:密码@localhost/test');
// //判断是否链接成功或者失败
// var db = mongoose.connection;
// //链接失败
// db.on('error', console.error.bind(console, 'connection error:'));
// //链接成功
// db.once('open', function () {
//     //所有的操作都需要在链接成功的里面调用  测试的时候忽略了 
//     console.log('链接成功')
// })

//链接数据库  2
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true }, function (err) {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log('成功链接数据库')
  }
});




//操作表或者集合的时候 需要先定义一个Schema 里面的字段需要和数据库里面的一一对应
//Schema  不能操作数据库 只是一个模型
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
var blogSchema1 = new Schema({
  title: String,
  author: String,
  body: String,
  age: Number,
  height: Number
});

//操作数据表需要 用到 Model  模型 
var Blog1 = mongoose.model('Blog1', blogSchema1, 'blog1');
var Blog = mongoose.model('Blogs', blogSchema, 'blogs');
//可传入参数 为 两位 或者三位  var Blog = mongoose.model('数据库表名称', Schema名称，需要操作的表的名称);  不传第三位 则默认操作 带s的

//查询表的数据
//Blog.find({ 表中key: 表中value }, 回调函数);  find不传参数表示查询所有  
// Blog.find({}, function(err,res){
//     if(err){
//         console.log(err)
//     }else{
//         console.log(res)
//     }
// });


//增加表的数据 
//实例化一个model  .save来保存 
// var blogModel1 = new Blog1({//需要增加的数据的具体内容
//     title: '孙小红测试',
//     author: '孙小红',
//     age: 21,
//     height: 171
// })
// //增加数据的办法
// blogModel1.save(function(err,res){
//     if(err){
//         console.log(err);
//         return;
//     }else{
//         console.log(res);
//         //或者直接 console.log('成功')
//     }
// })


//修改表的数据或者更新表的数据 _id是数据的标志id
// Blog.updateOne({'_id':'5cb33683ce65d13320cd4772'},{'title':'孙小红是个大傻逼'},function(err,res){
//     if(err){
//         console.log(err);
//         return;
//     }else{
//         console.log(res);
//         console.log('成功')
//     }
// })


//删除数据 
// Blog.deleteOne({'_id':'5cb2e4dbd99fb8084cc76572'},function(err,res){
//     if(err){
//         console.log(res);
//         return;
//     }else{
//         console.log('成功');
//         console.log(res);
//     }
// })



//预定义模式修饰符
//例如 定义 映射 Schema的时候 
//预定义修饰符种类 具体参考文档 
//
// var blogSchema = new Schema({
//     title: {   // -------------- 预定义修饰  表示 增加的数据会处理前后的空格
//         type: String,
//         trim: true
//     },
//     author: String,
//     body: String,
//     comments: [{ body: String, date: Date }],
//     date: { type: Date, default: Date.now },//传入默认参数的方法 
//     hidden: Boolean,
//     meta: {
//       votes: Number,
//       favs: Number
//     }
//   });

//mongoose使用索引


//mongoose中的静态方法
//扩展静态方法需要在 schema上进行扩展    上面定义的schema  blogSchema

// blogSchema.statics.findByAuthor = function(author,cb){
//   this.find({'author': author},function(err,res){
//       if(err){
//         console.log(err)
//         return;
//       }else{
//         console.log(res)
//         cb(res)
//       }
//   })
// }

// var Blog = mongoose.model('Blog', blogSchema,'blogs');//实例化需要在静态方法定义以后 以免无法调用

// //使用的时候需要在实例上使用
// Blog.findByAuthor('孙小红',function(err,res){
//   if(err){
//     console.log(err);
//     return;
//   }else{
//     console.log(res)
//   }
// })
//

//实例方法类似于 实例化一个schema后调用save保存  相对应的save即时实例化的方法



//数据校验  增加数据的时候 进行互数据的合法性校验  
//目的是 保证数据和数据库保存的的一致性 
//http://mongoosejs.net/docs/validation.html




//聚合管道 


// Blog.aggregate([{
//   $lookup: { from: 'blog1', localField: 'author', foreignField: 'author', as: 'blogs' }
// }
// ], function (err, res) {
//   console.log(JSON.stringify(res))
// });

// const aggregateA = Blog.aggregate([
//   { 
//     $lookup: { from: 'blog1', localField: 'author', foreignField: 'author', as: 'blogs' } 
//   }
// ]);
// aggregateA.exec(function(err,res){
//   console.log(res)
// })

// Blog.aggregate([
//   { 
//     $lookup: { from: 'blog1', localField: 'author', foreignField: 'author', as: 'blogs' } 
//   }
// ]).exec(function(err,res){
//   console.log(JSON.stringify(res))
// })


//还有一些其他的参数在聚合管道中 参考mongoDb 参考文档

