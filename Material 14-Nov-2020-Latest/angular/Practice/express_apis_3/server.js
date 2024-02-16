const express = require("express");
const app = express();

app.use( (req, res, next) => {
    console.log(req.path);

    if(req.path === '/home') {
        next();
    }

    res.send("Not Allowed")
} )

app.get('/', function(req, res) {
     res.json(["<h1>hello world</h1>"]);
});




app.get('/home', (req, res) => {
    res.send('Welcome Home')
});

app.get('/about', (req, res) => {
    res.send('Welcome Home')
});

app.listen(3000, function() {
    console.log("listening port running 3000");
});