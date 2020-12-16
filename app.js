var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
app.use(express.json());
app.use(require("./src/route/router"))

app.listen(port, function () {
  console.log("Server listening " + port);
});
