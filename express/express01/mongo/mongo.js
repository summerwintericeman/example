const mongoose = require('mongoose');

module.exports = {
     test(){
        mongoose.connect('mongodb://localhost:27017/test');
        const con = mongoose.connection;
        con.on('error', console.error.bind(console, '连接数据库失败'));
        con.once('open', () => {
            //成功连接
            console.log("链接成功")
        })
    }
}
