var https = require("https"),
    dbClient = require("./db/dbConnection.js"),
    moment = require('moment-timezone'),
    jwt = require('jsonwebtoken'),
    colors = require('colors'),
    jwtKey = require('./db/wtfKeyJwt.js'),
    Q = require('q'),
    myCookie = {},
    handler;

myCookie.name = 'SERVER IDENTIFICATION';
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
    privateApi: {
        getUser: function (email) {
            'use strict';

            const queryFindUser = "SELECT * FROM users where email = '" + email + "';";

            let deferred = Q.defer();

            dbClient(queryFindUser, function () {
                let done = arguments[0],
                    err = arguments[1],
                    result = arguments[2];

                done();
                if (undefined !== result.rows[0]) {
                    deferred.resolve(result.rows[0]);
                    console.log(JSON.stringify(result.rows[0]).data);
                }
                else {
                    deferred.reject(result);
                    console.log(('no data found: ' + email).error);
                }
            });
            return deferred.promise;
        }
    },
    api: {
        createToken: function (req, res) {
            'use strict';

            // refer to this link to know which option correspond to what and the second is the link to the library we are using
            // https://scotch.io/tutorials/the-anatomy-of-a-json-web-token
            // https://github.com/auth0/node-jsonwebtoken/blob/master/index.js.
            let token,
                userData, newData,
                promise1 = handlers.privateApi.getUser(req.body.fsn);

            promise1
                .then(function (userDataParam) {
                    'use strict';
                    let payLoad,
                        options;

                    newData = req.body;
                    userData = userDataParam;

                    newData.iatUnix = moment().tz("Europe/Paris").unix();
                    newData.iat = moment().tz("Europe/Paris").format("YYYY-MM-DD HH:mm:ss.SSSZ").substring(0, 27);
                    newData.issuer = (req.body.iss)?req.body.iss :myCookie.name ;
                    payLoad = {
                        name: userData.firstName,
                        email: userData.email,
                        iat: newData.iatUnix
                    };

                    options = {
                        noTimestamp: false,
                        expiresIn: parseInt(newData.jwt_duration, 10) + " minutes",
                        issuer: newData.issuer,
                        subject: "access right parisJS"
                    };
                    token = jwt.sign(payLoad, jwtKey, options);

                }, function (data) {
                    res.status(403).send(data)
                })
                .then(function () {
                    res.status(200).send(token);
                })
        },
        verifyToken: function (req, res) {
            'use strict';
            let currentCookie = req.get('T'),
                payLoad;
            try {
                payLoad = jwt.verify(currentCookie, jwtKey,{issuer:myCookie.name});
                console.log(payLoad);
                res.status(200).send();
            } catch (err) {
                res.status(403).send(err);
            }
        }
    }
};


module.exports = handlers;