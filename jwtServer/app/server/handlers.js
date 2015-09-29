var https = require("https"),
    dbClient = require("./db/dbConnection.js"),
    moment = require('moment-timezone'),
    jwt = require('jsonwebtoken'),
    colors = require('colors'),
    jwtKey = require('./db/wtfKeyJwt.js'),
    Q = require('q'),
    myCookie = {},
    handler;

    myCookie.name = "companeoExJwt";
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
            var deferred = Q.defer();
        
            var queryFindUser = "UPDATE contacts.individual SET jwt_creation_date='"+newData.iat+"',jwt_is_active="+newData.jwt_is_active+",jwt_key_word='"+newData.jwt_key_word+"',jwt_validity_duration="+newData.jwt_duration+" WHERE email='"+userData.email+"';"

            dbClient(queryFindUser,function(){
                var done = arguments[0],
                    err = arguments[1],
                    result = arguments[2];
                
                done();

                if(1<=result.rowCount){
                    // console.log(JSON.stringify(result).data);
                    deferred.resolve(result);
                }
                else{   
                    deferred.reject(err);
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
            
            promise1.then(function(userDataParam){
                    newData = req.body;
                    userData = userDataParam;

                    newData.iatUnix = moment().tz("Europe/Paris").unix();
                    newData.iat = moment().tz("Europe/Paris").format("YYYY-MM-DD HH:mm:ss.SSSZ").substring(0,27); 
                var payLoad = { 
                        name : userData.firstName,
                        email : userData.email,
                        iat : newData.iatUnix
                    };

                var options = {
                        noTimestamp : false,
                        expiresInMinutes:parseInt(newData.jwt_duration,10),
                        // expiresInSeconds:newData.jwt_duration,
                        issuer:"companeo-fr.lan",
                        subject: "access to extra net"
                    };

                token = jwt.sign(payLoad,jwtKey,options);
            })
            .then(function(){
                handlers.privateApi.setUserJwt(userData,newData).then(function(def){
                    res.cookie(myCookie.name,token);
                    var name = userData.firstName;
                    res.send('hello '+name);  
                });
            })           
        },
        verifyToken:function(req,res){
            var currentCookie =req.cookies[myCookie.name],
            payLoad;
            try{
                payLoad = jwt.verify(currentCookie,jwtKey);
                console.log(payLoad);
                res.status(200).send();
            }catch(err){
                res.status(403).send(err);
            }
        }
    }
};


module.exports = handlers;