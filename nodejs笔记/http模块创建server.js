var  http=require('http');
http.createServer(function(req,res){
  console.log(req.url);  /*获取url传过来的地址*/
    res.writeHead(200,{"Content-Type":"text/html;charset='utf-8'"});
    res.write('你好nodejs'); /*给浏览器输入一句话*/
    res.end(); /*结束相应*/
}).listen('3000','127.0.0.1');  /* 创建的web服务需要在 http://127.0.0.1:3000 */









