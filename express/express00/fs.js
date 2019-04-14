var fs = require("fs");

fs.readFile('./a.js','utf8', (err, data) => {
    if (err) {
        //throw err
        console.log(err)
    }else{
        // data = data.toString();
        console.log(data)
    }

});