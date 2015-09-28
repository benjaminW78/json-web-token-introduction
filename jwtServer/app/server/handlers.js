var fs = require("fs");
var https = require("https");
var dbClient = require("./db/dbConnection.js");

var handlers = {

    api:{
        createToken :function(req,res){

            dbClient.on('drain', dbClient.end.bind(dbClient));
            
            dbClient.connect();

            var queryFindUser = "SELECT * FROM companeo_v6.contacts.individual where email = '"+req.body.fsn+"';"
console.log("")
console.log(queryFindUser)
console.log("")

            dbClient.query(queryFindUser,function(err,result){
                if(undefined!==result.rows[0]){
                    var userInd = result.rows[0];
                    console.log(userInd);
                }
            });
          
        }
    }
};

module.exports = handlers;