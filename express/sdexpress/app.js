const express = require('express');

const app = express();


// app.all('*', function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     res.header('Access-Control-Allow-Methods', '*');
//     res.header('Content-Type', 'application/json;charset=utf-8');
//     next();
// });
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.get('/', function (req, res) {
    var questions = [
        {
            data: 213,
            num: 444,
            age: 12
        },
        {
            data: 456,
            num: 678,
            age: 13
        }];
    res.jsonp(questions)
})

app.listen(3000)