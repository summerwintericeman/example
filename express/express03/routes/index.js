var express = require('express');
var router = express.Router();
var app = express();

//链接数据库
// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
// mongoose.connect('mongodb://localhost/test');


// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//   // we're connected!
//   console.log('已连接');
//   /* GET home page. */

//   // mongoose的基本使用 添加一个表并存入数据
//   var blogSchema = new Schema({
//     title: String,
//     author: String,
//     body: String,
//     comments: [{ body: String, date: Date }],
//     date: { type: Date, default: Date.now },
//     hidden: Boolean,
//     meta: {
//       votes: Number,
//       favs: Number
//     }
//   });

//   // //额外的添加办法 ToySchema.add({ name: 'string', color: 'string', price: 'number' });


//   //定义一个查找表中数据的方法
//   // assign a function to the "methods" object of our animalSchema
//   blogSchema.methods.findSimilarTypes = function(cb) {
//     return this.model('Blog').find({ author: this.author }, cb);
//   };

  

// //定义一个静态方法
// // assign a function to the "statics" object of our animalSchema
// blogSchema.statics.findByName = function(name, cb) {
//   return this.find({ author: new RegExp(name, 'i') }, cb);
// };








// var Blog = mongoose.model('Blog', blogSchema);

  
  // var ceshi = new Blog({
  //   title: '测试标题2',
  //   author: '测试作者2',
  //   body: '内容很多额哈哈哈哈哈',
  //   comments: [{ body: 'heheda'}],
  //   hidden: false,
  //   meta: {
  //     votes: 12,
  //     favs: 13
  //   }
  // });
  // console.log(ceshi.author); 


  //在表中保存一组数据

  // ceshi.save(function (err, ceshi) {
  //   if (err) return console.error(err);
  //   console.log(ceshi.author); 
  // });




  //查找一类表中的数据

  // var ceshi = new Blog({
  //   title: '测试标题6',
  //   author: '测试作者1',
  //   body: '内容很多额哈哈哈哈哈',
  //   comments: [{ body: 'heheda'}],
  //   hidden: false,
  //   meta: {
  //     votes: 12,
  //     favs: 13
  //   }
  // });


  // ceshi.findSimilarTypes(function(err, res) {
  //   console.log(res); // woof
  // });



//静态方法的查找

// Blog.findByName('测试作者1', function(err, res) {
//   if (err) return console.error(err);
//   console.log(res);
// });


  



  router.get('/api', function (req, res, next) {
    // res.render('index', { title: 'Express' });
    var questions=[
      {
      data:213,
      num:444,
      age:12
      },
      {
      data:456,
      num:678,
      age:13
      }];
      res.setHeader('Content-Type', 'application/json;charset=utf-8');  
    res.send(JSON.stringify(questions))
  });
// });



module.exports = router;
