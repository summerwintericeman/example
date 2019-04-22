var express = require('express');
var router = express.Router();
var data = [{
    name : "ligh",
    age : "1",
    city : "北京市"
}, {
    name : "SPTING",
    age : "1",
    ucity : "杭州市"
}]





//用户登录的
router.get('/login', function (req, res, next) {
    console.log(data)
    
    res.send(data);
    next();
});

//用户注册的
router.post('/register', function (req, res, next) {
   console.log(JSON.stringify(req.body))
    
    res.send(JSON.stringify(req.body));
});














module.exports = router;