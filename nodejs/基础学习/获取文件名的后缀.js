//举例

var a = "xxxxxxxxxx.html",
	b = 'xxxxxxxxxxxx.css',
	c = 'xxxxxxxxxxx.js',
	d = "xxxxxxxxxx.min.html",
	e = 'xxxxxxxxxxxx.min.css',
	f = 'xxxxxxxxxxx.min.js';
	
	
	var endPoint = a.lastIndexOf(".");//获取点的最后出现的位置
	var end = a.length;
	console.log(a.substring());
	console.log(a.substr());
	console.log(a.slice());
	
//通过nodejs的已有模块获取后缀名  extname模块
var path = require("path");
path.extname("index.html")
