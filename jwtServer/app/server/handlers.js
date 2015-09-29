var https = require("https"),
    dbClient = require("./db/dbConnection.js"),
    moment = require('moment'),
    jwt = require('jsonwebtoken'),
    colors = require('colors'),
    jwtKey = require('./db/wtfKeyJwt.js'),
    Q = require('q'),
    handler;
// https://www.npmjs.com/package/colors
    colors.setTheme({
        silly: 'rainbow',
        input: 'grey',
        verbose: 'cyan',
        prompt: 'grey',
        info: 'green',
        data: 'magenta',
        help: 'cyan',
        warn: 'yellow',
        debug: 'blue',
        error: 'red'
    });

    handlers = {
    privateApi :{
        getUser:function(email){
            var queryFindUser = "SELECT * FROM companeo_v6.contacts.individual where email = '"+email+"';"
            
            var deferred = Q.defer();

             dbClient(queryFindUser,function(){
                var done = arguments[0],
                    err = arguments[1],
                    result = arguments[2];
                
                done();

                if(undefined!==result.rows[0]){
                    deferred.resolve(result.rows[0]);
                    console.log(JSON.stringify(result.rows[0]).data);
                }
                else{
                    deferred.reject(result.rows[0]);

                    console.log(('no data found: '+req.body.fsn).error);
                }
            });
            return deferred.promise;
        },
        setUserJwt:function(userData,newData){
            for (var i in newData){
            console.log(userData)
                if(undefined==userData[i]){
                    return false;
                }
            }
            var deferred = Q.defer();

            var queryFindUser = "UPDATE contacts.individual SET jwt_creation_date='"+newData.iat+"',jwt_is_active="+newData.jwt_is_active+",jwt_key_word='"+newData.jwt_key_word+"',jwt_validity_duration="+newData.jwt_duration+" WHERE email='"+userData.email+"';"

            dbClient(queryFindUser,function(){
                var done = arguments[0],
                    err = arguments[1],
                    result = arguments[2];
                
                console.log(arguments);
                done();


                if(undefined!==result && undefined!==result.rows.length && undefined!==result.rows[0]){
                    console.log(JSON.stringify(result.rows[0]).data);
                    deferred.resolve(result.rows[0]);
                }
                else{   
                    deferred.reject(result.rows[0]);
                    console.log(('no data found: '+req.body.fsn).error);
                }
            });
            return deferred.promise;
        }
    },
    api:{
        createToken :function(req,res){
            // refer to this link to know which option correspond to what and the second is the link to the library we are using
            // https://scotch.io/tutorials/the-anatomy-of-a-json-web-token
            // https://github.com/auth0/node-jsonwebtoken/blob/master/index.js.
            var token;
            var userData,newData;
            var promise1 = handlers.privateApi.getUser(req.body.fsn)
            var promise2 = 
            
            promise1.then(function(userDataParam){

                    newData = req.body;
                    console.log(req.body);
                    userData = userDataParam;

                    newData.iat = moment().format("YYYY-MM-DD HH:mm:ss:SSSS"); 
                var payLoad = { 
                        name : userData.firstName,
                        email : userData.email,
                        iat : newData.iat
                    };

                var options = {
                        noTimestamp : true,
                        expireInSeconds:60,
                        issuer:"companeo-fr.lan",
                        subject: "access to extra net"
                    };

                token = jwt.sign(payLoad,jwtKey,options);
                    
                    
            })
            .then(function(){handlers.privateApi.setUserJwt(userData,newData)})
            .finally(function(){
                    
                    console.log(JSON.stringify(token).info);

                    res.writeHead({
                        'Set-Cookie': 'companeoExJwt='+JSON.stringify(token),
                        'Content-Type': 'text/plain'
                    });

                    res.status(200).send('hello '+userData.firstName);  
            });          


        }
    }
};


module.exports = handlers;