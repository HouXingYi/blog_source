var express = require("express");
var app = express();
var port = 8081;
app.use("/",express.static(__dirname + "/blogContent/public"));
app.listen(port);
console.log("app is runing on port"+port);