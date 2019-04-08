var https=require('https');
https.get("https://www.baidu.com/", function(res) {
    var data = '';
    res.on('data', function(chunk){
        data+= chunk;
    });
    res.on('end', function(){
        console.log(data.toString())
    });
}).on('error', function(e) {
    console.log("Got error: " + e.message);
});


