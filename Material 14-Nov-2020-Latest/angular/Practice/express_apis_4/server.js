var express        =         require("express");
var bodyParser     =         require("body-parser");
var app            =         express();
let db;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const MongoClient = require('mongodb').MongoClient 
MongoClient.connect('mongodb://127.0.0.1:27017/account', (err, database) => {
  if(err) {
      console.log(err);
  } else {
    db = database;
    app.listen(3000, function () {
        console.log('Example app listening on port 3000!')
        console.log('DB', db)
    })
  }
})