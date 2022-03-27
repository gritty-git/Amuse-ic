// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
var cors = require('cors')
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
var session = require('cookie-session');
const flash = require('connect-flash');
const msal = require('@azure/msal-node');
require('dotenv').config();
var debug = require('debug')('graph-tutorial:server');
var http = require('http');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const fileDataRouter = require('./routes/filedata');
// const routesUrls = require('./routes/routes')
const testRouter = require('./routes/testing');

const app = express();
app.use(cors()) 
// <MsalInitSnippet>
// In-memory storage of logged-in users
// For demo purposes only, production apps should store
// this in a reliable storage
app.locals.users = {};

// MSAL config
const msalConfig = {
  auth: {
    clientId: process.env.OAUTH_CLIENT_ID,
    authority: process.env.OAUTH_AUTHORITY,
    clientSecret: process.env.OAUTH_CLIENT_SECRET
  },
  system: {
    loggerOptions: {
      loggerCallback(loglevel, message, containsPii) {
        console.log(message);
      },
      piiLoggingEnabled: false,
      logLevel: msal.LogLevel.Verbose,
    }
  }
};

// Create msal application object
app.locals.msalClient = new msal.ConfidentialClientApplication(msalConfig);
// </MsalInitSnippet>

// <SessionSnippet>
// Session middleware
// NOTE: Uses default in-memory session store, which is not
// suitable for production
app.use(session({
  secret: 'your_secret_value_here',
  resave: false,
  saveUninitialized: false,
  unset: 'destroy'
}));

// Flash middleware
app.use(flash());

// Set up local vars for template layout
app.use(function(req, res, next) {
  // Read any flashed errors and save
  // in the response locals
  res.locals.error = req.flash('error_msg');

  // Check for simple error string and
  // convert to layout's expected format
  var errs = req.flash('error');
  for (var i in errs){
    res.locals.error.push({message: 'An error occurred', debug: errs[i]});
  }

  // Check for an authenticated user and load
  // into response locals
  if (req.session.userId) {
    res.locals.user = app.locals.users[req.session.userId];
  }

  next();
});
// </SessionSnippet>
var port = process.env.PORT || "4000";
// view engine setup



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/index', indexRouter);
app.use('/filedata', fileDataRouter);
app.use('/auth', authRouter);
app.use('/test', testRouter);
app.use('/users', usersRouter);
// app.use('/app', routesUrls)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '../amuse-ic/build')));
  app.get('*',(req,res)=>
      res.sendFile(path.resolve(__dirname,'..', 'amuse-ic', 'build', 'index.html'))
  );
}else{
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'hbs');
  app.use(express.static(path.join(__dirname, 'public')));
  app.get('/index',(req,res)=>{
      res.send('API is Running');
  });
  app.get('/',(req,res)=>{
    res.send('Ajatha pala');
});
}
app.set('port', port);
var server = http.createServer(app);
server.listen(port);

