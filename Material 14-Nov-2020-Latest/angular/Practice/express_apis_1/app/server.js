var express        =         require("express");
var bodyParser     =         require("body-parser");
var app            =         express();
let db;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function (req, res) {
  res.send("angular app API's are running.. testing")
});

app.get("/name", (req, res) => {
    res.send("Path is name");
});

//Student Post
app.post("/student", (req, res) => {
   // console.log(req.body);
    //res.send(req.body);

    db.collection('users').save(req.body, (err, result) => {
        if (err) return res.send("FAIL")

        console.log('saved to database')
        res.send("SUCCESS")
    })

});
//Person Post
app.post("/personadd", (req, res) => {
    console.log(req.body);
//res.send(req.body);

db.collection('persondetails').save(req.body, (err, result) => {
    if (err) return res.send("FAIL")

    console.log('saved to database')
res.send("SUCCESS")
})

});


//Student List
app.get("/contactAdd", (req, res) => {
    console.log(req.body);
//res.send(req.body);

  db.collection('users').find().toArray(function (err, results) {
      if (err) return res.send("FAIL")

      console.log('saved to database')
      res.send(JSON.stringify(results));
  })

});

//Student List
app.get("/all", (req, res) => {
    console.log(req.body);
//res.send(req.body);
  let students = [];
  let persons = [];
  let contacts = [];
  let largeCollection = 0;

  db.collection('students').find().toArray(function (err, results) {
      if (err) return res.send("FAIL");

      students = results;
      largeCollection = results.length; //10

      db.collection('persondetails').find().toArray(function (err, results) {
        persons = results;
        largeCollection = (results.length > largeCollection) ? results.length : largeCollection;
      

        db.collection('contactDetails').find().toArray(function (err, results) {
          contacts = results;
          largeCollection = (results.length > largeCollection) ? results.length : largeCollection;

          const responseData = [];

          for(let i=0; i < largeCollection; i++) {
            responseData.push({
              student: students[i] || {},
              person: persons[i] || {},
              contact: contacts[i] || {},
            })
          }
          console.log(responseData);
          res.send(JSON.stringify(responseData));
        })

      })
  })

});



app.post("/mortableAdd", (req, res) => {
  console.log(req.body);
  // res.send(req.body);
  var formOne = req.body.formOne;
  var formTwo = req.body.formTwo;
  var formThree = req.body.formThree;
  var totalSuccess = 0;

  db.collection('users').save(formOne, function (err, results) {
      if (err) return res.send("FAIL")
        console.log('saved to database');
      totalSuccess++;
      if(totalSuccess == 3) {
        res.send(JSON.stringify(results));
      }
      
      
  })

  db.collection('persondetails').save(formTwo, function (err, results) {
      if (err) return res.send("FAIL")

      console.log('saved to database');
       totalSuccess++;
      if(totalSuccess == 3) {
        res.send(JSON.stringify(results));
      }
  })

  db.collection('contactDetails').save(formThree, function (err, results) {
      if (err) return res.send("FAIL")

      console.log('saved to database');
       totalSuccess++;
      if(totalSuccess == 3) {
        res.send(JSON.stringify(results));
      }
  })

});

const MongoClient = require('mongodb').MongoClient 


MongoClient.connect('mongodb://127.0.0.1:27017/college', (err, database) => {
  if(err) {
      console.log(err);
  } else {
    db = database;
    app.listen(3000, function () {
        console.log('Example app listening on port 3000!')
    })
  }
})

