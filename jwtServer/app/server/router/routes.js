var handlers = require("../handlers.js");
var fs = require("fs");
var express = require("express");
var router = express.Router();


router.route("/api/createToken")
.get(function(req,res){
    // handlers.user.get(req,res);
    console.log('you asked for a token');

    handlers.api.createToken(req,res);
})
.put(function(req,res){
    // handlers.user.update(req,res);
})
.post(function(req,res){
    // handlers.user.create(req,res);
    console.log('you asked for a token');

    handlers.api.createToken(req,res);
})
.delete(function(req,res){
    // handlers.user.del(req,res);
});
router.route("/backoffice/connect")
.post(function(req,res){
    // handlers.backOffice.connect(req,res);
});

// // VIEWS ROUTES
// router.route("/")
// .get(function(req,res){
//     // fs.createReadStream(__dirname+VIEWS_PATH+"/index.html").pipe(res);
// });


module.exports = router;