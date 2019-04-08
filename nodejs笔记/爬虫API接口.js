//1.引入http模块

var  http=require('http');


http.get('http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=1',function(response){

    var str='';
    response.on('data',function(chunk){
        str+=chunk;
    });

    response.on('end',function(){
        //console.log(str);

        var strParse=JSON.parse(str);

        //console.log(strParse.result[0].title);


        for(var i=0;i<strParse.result.length;i++){

            console.log(strParse.result[i].title);
        }


    })

}).on('error',function(){
    console.log('错诶');
})


