//自带模块
var http = require("http");
var fs = require("fs");
var path = require('path');

//引入自定义的模块  用老根据文件后缀加载不同请求头
var filderName = require("./module/filderName.js");


var app = http.createServer(function(req, res) {
 	var  contentName =  filderName.getFilderName(path.extname(req.url));
	res.writeHead(200, {
		//"Content-Type": "text/html;charset='utf-8'"
		"Content-Type": ""+contentName+";charset='utf-8'"
	});
	console.log(req.url);//获取到浏览器中输入的url地址
		if(req.url != '/favicon.ico') {
			var pathName = '';
			if(req.url == '/') {
				pathName = '/index.html'
			} else {
				pathName = req.url;
			}
			console.log(pathName);
			res.end();
			//读取文件 异步操作  根据获取到的地址来读取文件  注意readFile是一个异步操作
			fs.readFile('./static' + pathName, function(err, data) {
				if(err) {
					console.log(err);
					return;
				}
				//res.write(data); 都可以渲染到页面上
				res.end(data);
			})
		}
})

app.listen(3001, '127.0.0.1');