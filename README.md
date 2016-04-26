# **json-web-token-introduction**
##### Json web token introduction with slides and working nodeJS server

The MIT License (MIT)

### Table of Contents
**[Introduction](#introduction)**  
**[Practical information](#practical-information)**  
**[Files tree](#files-tree)**  
**[Installation](#installation)**  
**[Nodejs api documentation](#nodejs-api-documentation)**  
**[Example](#example)**  
**[Acknowledgement](#acknowledgement)**  
**[Other project](#other-project)**  

## **Introduction**
  This repository is build for introduce you [JWT by slides](http://slides.com/ben080989/deck/fullscreen) and by a working nodejs implementation via npm `jsonwebtoken` package.
  
## **Practical information** 
 *You must be familiar* with :  
 - [NODEJS](https://nodejs.org/en/)
 - [ES6](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)
 - [Express framework](https://github.com/koajs/joi-router) 
 - [ES promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
 - [JWT](http://slides.com/ben080989/deck/fullscreen)
 
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
  // Import postgresql Db stored inside sql_request folder
  $ npm run start
  
```

## **Nodejs api documentation** 
#### **Verify Token**
```
  // GET METHOD 
  http://localhost:8080/api/verifyToken
  T = yourTokenToTest
```
