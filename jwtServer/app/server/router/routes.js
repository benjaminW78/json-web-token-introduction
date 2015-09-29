var handlers = require("../handlers.js"),
	fs = require("fs"),
	express = require("express"),
	colors = require('colors'),
	router = express.Router();


router.route("/api/createToken")
.post(function(req,res){
	// request to data json to send to api rest
	// {"fsn":"laure.pinault@bodet-software.com","jwt_is_active": true,"jwt_key_word":"yolo","jwt_duration" : 2}
    console.log('you asked for '.info+'CREATE'.error+' a token'.info);

    handlers.api.createToken(req,res);
})

router.route("/api/verifyToken")
.get(function(req,res){
    console.log('you asked for '.info+'VerifyToken'.error+' a token'.info);
    console.log(res.cookie)
	handlers.api.verifyToken(req,res);
})

// router.route("/backoffice/connect")
// .post(function(req,res){
//     // handlers.backOffice.connect(req,res);
// });

// // VIEWS ROUTES
// router.route("/")
// .get(function(req,res){
//     // fs.createReadStream(__dirname+VIEWS_PATH+"/index.html").pipe(res);
// });


module.exports = router;