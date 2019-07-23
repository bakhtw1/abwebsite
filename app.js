'use strict'

// C library API
const ffi = require('ffi');

// Express App (Routes)
//HELLO
const http = require('http');
const express = require("express");
const app     = express();
const path    = require("path");
const fileUpload = require('express-fileupload');
const fs = require('fs');
const JavaScriptObfuscator = require('javascript-obfuscator');
const url = require('url');
var bodyParser = require('body-parser');

const portNum = process.argv[2];

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'messagewaqasbakht1@gmail.com',
    pass: 'Omran3akht1'
  }
});

//decode post requests
// app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

http.createServer(function (req, res) {
    console.log(`${req.method} ${req.url}`);
  
    // parse URL
    const parsedUrl = url.parse(req.url);
    // extract URL path
    let pathname = `.${parsedUrl.pathname}`;
    // based on the URL path, extract the file extention. e.g. .js, .doc, ...
    const ext = path.parse(pathname).ext;
    // maps file extention to MIME typere
    const map = {
      '.ico': 'image/x-icon',
      '.html': 'text/html',
      '.js': 'text/javascript',
      '.json': 'application/json',
      '.css': 'text/css',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.wav': 'audio/wav',
      '.mp3': 'audio/mpeg',
      '.svg': 'image/svg+xml',
      '.pdf': 'application/pdf',
      '.doc': 'application/msword'
    };
  
    fs.exists(pathname, function (exist) {
      if(!exist) {
        // if the file is not found, return 404
        res.statusCode = 404;
        res.end(`File ${pathname} not found!`);
        return;
      }
  
      // if is a directory search for index file matching the extention
      if (fs.statSync(pathname).isDirectory()) pathname += '/index' + ext;
  
      // read file from file system
      fs.readFile(pathname, function(err, data){
        if(err){
          res.statusCode = 500;
          res.end(`Error getting the file: ${err}.`);
        } else {
          // if the file is found, set Content-type and send data
          res.setHeader('Content-type', map[ext] || 'text/plain' );
          res.end(data);
        }
      });
    });
  
  
  }).listen(parseInt(3000));

// Send HTML at root
// app.get('/', function(req,res){ 
//     res.sendFile(path.join(__dirname+'/public/index.html'));
// });  
  
// // Send Style
// app.get('/style.css', function(req,res){
//     res.sendFile(path.join(__dirname+'/public/style.css'));
// });
  
// // Send obfuscated JS, do not change
// app.get('/index.js', function(req,res){
//     fs.readFile(path.join(__dirname+'/public/index.js'), 'utf8', function(err, contents) {
//         const minimizedContents = JavaScriptObfuscator.obfuscate(contents, {compact: true, controlFlowFlattening: true});
//         res.contentType('application/javascript'); 
//         res.send(minimizedContents._obfuscatedCode);
//     });
// });
 

// app.listen(3000);
console.log('Running app at localhost: 3000');
