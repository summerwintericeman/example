const fs = require('fs')

//createReadStream 属于fs模块   表示流的方式读取

var fileReadStream = fs.createReadStream('data.txt');

var str='';   /*放所有的数据*/

var count=0;
//有数据会广播 data

fileReadStream.on('data',function(chunk){

    str+=chunk;
    count++;
})
//读取完成
fileReadStream.on('end',function(){
    console.log(str);
    console.log(count);
})
fileReadStream.on('error',function(){
    console.log('读取失败');
})
