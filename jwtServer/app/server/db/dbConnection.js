var conf = require('./conf.js'),
ENV = require('../env.js'),
dbConf = conf[ENV];
var pg = require('pg');

var conString = "postgres://"+dbConf.DB_SUPERUSER+":"+dbConf.DB_SUPERPASSWORD+"@"+dbConf.DB_HOST+"/"+dbConf.DB_NAME;

var client = new pg.Client(conString);

module.exports = client;