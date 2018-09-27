/*const crypto=require('crypto');
const mongoose=require('mongoose');
const multer=require('multer');
const GridfsStoage=require('multer-gridfs-storage');
const Grid =require('gridfs-stream');
const methodOverride=require('method-override');

async = require("async");

var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
 
var index = require('./routes/index');
var users = require('./routes/users');
 
var app = express();
//Middleware
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static(__dirname + "/views"));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
 
app.use('/', index);
app.use('/users', users);

//Mongo URI
//const mongoURI='mongodb://Prince99:root123@ds139884.mlab.com:39884/uploads';
const mongoURI='mongodb://localhost/Files';
//create Connection 
const conn=mongoose.createConnection(mongoURI);
//Init gfs
let gfs;

conn.once('open',() =>{
    //Init stream
     gfs= Grid(conn.db,mongoose.mongo);
     gfs.collection('uploads');
});
//create a storage
const storage = new GridfsStoage({
    url:mongoURI,
    file: (req,file)=>{
        return new Promise((resolve,reject) =>{
                 crypto.randomBytes(16 , (err,buf)=>{
                     if(err){
                         return reject(err);
                     }
                     const filename=buf.toString('hex') +path.extname(file.originalname);
                     const fileInfo={
                         filename:filename,
                         bucketname:'uploads'
                     };
                     resolve(fileInfo);
                 });
        });
    }
});
var  upload= multer({storage});

app.get('/',(req,res)=>{
    res.render('index');
});

app.post('/uploads',upload.single('file'),(req,res)=>{
    res.json({file:req.file});
   

});


 
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
 
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
 
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
 
module.exports = app;*/


var cookieParser = require('cookie-parser');

var logger = require('morgan');
const express = require('express');
const app=express();
const path=require('path');
const crypto=require('crypto');
const mongoose=require('mongoose');
const multer=require('multer');
const GridfsStoage=require('multer-gridfs-storage');
const Grid =require('gridfs-stream');
const methodOverride=require('method-override');
const bodyParser = require('body-parser');


var index = require('./routes/index');
var users = require('./routes/users');

//Middleware
app.use(bodyParser.json());
app.use(methodOverride('_method'));

app.set('view engine','ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);


//Mongo URI
//const mongoURI='mongodb://Prince99:root123@ds139884.mlab.com:39884/uploads';
const mongoURI='mongodb://localhost/files'
//create Connection 
const conn=mongoose.createConnection(mongoURI);
//Init gfs
let gfs;

conn.once('open',() =>{
    //Init stream
     gfs= Grid(conn.db,mongoose.mongo);
     gfs.collection('uploads');
});




//create a storage
const storage = new GridfsStoage({
    url:mongoURI,
    file: (req,file)=>{
        return new Promise((resolve,reject) =>{
                 crypto.randomBytes(16 , (err,buf)=>{
                     if(err){
                         return reject(err);
                     }
                     const filename=buf.toString('hex') +path.extname(file.originalname);
                     const fileInfo={
                         filename:filename,
                         bucketname:'uploads'
                     };
                     resolve(fileInfo);
                 });
        });
    }
});
const upload= multer({storage});

app.get('/',(req,res)=>{
    res.render('index');
});

app.post('/uploads',upload.single('file'),(req,res)=>{
    res.json({file:req.file});

});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
   
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
   
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
   
  module.exports = app;

/*const port =4000;
app.listen(port,()=>console.log("Server started on port "+port));*/