const handlers = require("../handlers.js"),
    fs = require("fs"),
    express = require("express"),
    colors = require('colors'),
    router = express.Router();


router.route("/api/createToken")
    .post(function (req, res) {
        // request to data json to send to api rest
        console.log('you asked for ' + 'CREATE'.error + ' a token');
        console.log('====================================='.info);
        handlers.api.createToken(req, res);
    });

router.route("/api/verifyToken")
    .get(function (req, res) {
        console.log('you asked for ' + 'VERIFY'.error + ' a token');
        console.log('====================================='.info);
        handlers.api.verifyToken(req, res);
    });



module.exports = router;