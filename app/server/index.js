var jwt = require('jsonwebtoken'),
    mail = require('nodemailer'),
    express = require('express'),
    bodyParser = require("body-parser"),
    route = require("./router/routes.js"),
    dbClient = require("./db/dbConnection"),
    cookieParser = require('cookie-parser'),
    app_root = __dirname;

//server init

var app = express();

app.use(bodyParser.json());       // to support JSON-encoded bodies

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use(cookieParser());

app.use(function (req, res, next) {
    console.log('----------------------'.debug);
    console.log('\n\nrequest path : ' + req.url.info + '\n');
    next();
});

app.use(route);
//server start listening 

app.listen(8080);