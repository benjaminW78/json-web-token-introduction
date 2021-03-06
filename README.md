# **json-web-token-introduction**
[![Build Status](https://travis-ci.org/benjaminW78/json-web-token-introduction.svg?branch=master)](https://travis-ci.org/benjaminW78/json-web-token-introduction)
[![Dependency Status](https://david-dm.org/benjaminW78/json-web-token-introduction.svg)](https://david-dm.org/benjaminW78/json-web-token-introduction)
[![devDependency Status](https://david-dm.org/benjaminW78/json-web-token-introduction/dev-status.svg)](https://david-dm.org/benjaminW78/json-web-token-introduction#info=devDependencies)
##### Json web token introduction with slides and working nodeJS server

The MIT License (MIT)

### Table of Contents
**[Introduction](#introduction)**  
**[Practical information](#practical-information)**  
**[Files tree](#files-tree)**  
**[Installation](#installation)**  
**[Nodejs api documentation](#nodejs-api-documentation)**  
**[Acknowledgement](#acknowledgement)**  
**[Other project](#other-project)**  

## **Introduction**
  This repository is intended introduce you to JWT via this presentation, [```JWT you will love it more than your parents```](http://slides.com/ben080989/deck/fullscreen) and with a working nodejs example based on `jsonwebtoken` npm package.
  
## **Practical information** 
 *You must be familiar* with :  
 - [NODEJS](https://nodejs.org/en/)
 - [ES6](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)
 - [Express framework](https://github.com/koajs/joi-router) 
 - [ES promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
 - [JWT](https://jwt.io/)

## **Files tree** 
```
.
├── app                               // folder containing nodejs App example
│   ├── server
│   │   ├── db
│   │   │   ├── conf.js
│   │   │   ├── dbConnection.js
│   │   │   └── wtfKeyJwt.js
│   │   ├── env.js
│   │   ├── handlers.js
│   │   ├── index.js
│   │   ├── npm-debug.log
│   │   └── router
│   │       └── routes.js
│   └── vendors
├── package.json                      // npm install file
└── sql_request                   
    └── testDb                        // Db postgresql export

```

## **Installation** 

```shell
  $ git clone git@github.com:benjaminW78/json-web-token-introduction.git
  // Go inside the new folder
  $ npm i
  // connect to postgres via shell
  $ sudo -u postgres psql

  // create Db for futur import
  postgres=# CREATE DATABASE test;

  // Import postgresql Db stored inside sql_request folder
  postgres=# test < 'path_to_this_repo/json-web-token-introduction/sql_request/testDb';

  // set your user to use this table.
  postgres=# \connect test;
  postgres=# GRANT ALL PRIVILEGES ON TABLE users TO yourUserPostGres;
  postgres=# \q;

  // start nodejs Server with nodemon instance.
  $ npm run start
  
```

## **Nodejs api documentation** 
This section show you which paths of your nodejs server are availble.
#### **Create Token**
```
  // GET METHOD 
  http://localhost:8080/api/createToken
  // request body: JSON OBJECT
  {
    "fsn":"toto@gmail.com", // db valid user email
    
    "jwt_duration":1 , // JWT valid duration in minutes
    
    "iss":"whatYouWant" // remove this key/value if you want your server to create jwt with his
                        // own issuer value, because
                        // when you will verify your previously created jwt, the server will test it with 
                        // its own issuer value not the one you created your jwt 
  }
```

#### **Verify Token**
```
  // GET METHOD 
  http://localhost:8080/api/verifyToken
  // request body 
  T = yourTokenToTest
  // request body: empty {}
```

## Acknowledgement
 Thanks to [@Companeo](https://github.com/Companeo) for making me work on this problem.
 
## Other projects
 You may also like those projects: 
 
 - [git-hooks-versionned](https://github.com/benjaminW78/git-hooks-versionned)
 - [koa-postgresql-pool-connector](https://github.com/benjaminW78/koa-postgresql-pool-connector)
