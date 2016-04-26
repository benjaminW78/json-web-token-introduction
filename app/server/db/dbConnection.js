const ENV = require('../env.js'),
    dbConf = require('./conf.js')[ENV],
    pg = require('pg'),
    conString = "postgres://" + dbConf.DB_SUPERUSER + ":" + dbConf.DB_SUPERPASSWORD + "@" + dbConf.DB_HOST + "/" + dbConf.DB_NAME,
    connection = function (query, callback) {

        pg.connect(conString, function (err, client, done) {
            'use strict';
            let handleError = function (err) {
                // no error occurred, continue with the request
                if (!err) return false;

                // An error occurred, remove the client from the connection pool.
                // A truthy value passed to done will remove the connection from the pool
                // instead of simply returning it to be reused.
                // In this case, if we have successfully received a client (truthy)
                // then it will be removed from the pool.
                if (client) {
                    done(client);
                }
                res.writeHead(500, {'content-type': 'text/plain'});
                res.end('An error occurred');
                return true;
            };

            if (handleError(err)) return;

            client.query(query, callback.bind(this, done));
        });
    };

module.exports = connection;