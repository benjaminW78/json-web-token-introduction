var jwt = require('jsonwebtoken'),    
    mail = require('nodemailer'),    
    express = require('express'),
    bodyParser = require("body-parser"),
    route = require("./router/routes.js"),
    dbClient = require("./db/dbConnection"),
    app_root = __dirname;

//server init

var app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(function(req,res,next){
    console.log("request path : "+req.url);
    console.log();
    next();
});

app.use(route);
//server start listening 

app.listen(8080);