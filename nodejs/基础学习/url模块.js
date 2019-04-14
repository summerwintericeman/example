var http=require('http');
var url=require('url');
var app=http.createServer(function(req,res){
    res.writeHead(200,{"Content-Type":"text/html;charset='utf-8'"});
    if(req.url!='/favicon.ico'){
        var queryName=url.parse(req.url,true).query;    //第二个参数表示 把get传值转换成对象
        console.log(queryName);
        console.log("name:"+queryName.name);
    }
    res.write('write1');
    res.write('write2');
    res.end('你好 nodejs');
})
//注意端口  建议用3000以上。
app.listen(3000,"127.0.0.1");
