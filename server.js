var express = require('express')
var app = express()
app.use(express.static('./Public', {}));

// var path = require('path');

// app.get("*", function (req, res) {
//     res.statusCode = 404;
//     res.setHeader("Content-Type", "application/json; charset=utf-8");
//     res.end(JSON.stringify({error: "No such endpoint"}));
// });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
