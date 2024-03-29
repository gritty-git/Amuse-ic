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
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');

const authRouter = require('./routes/auth');
const fileDataRouter = require('./routes/filedata');
// const routesUrls = require('./routes/routes')
const uploadRouter = require('./routes/upload');

const app = express();
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cors());
app.use(fileUpload());
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
const port = process.env.PORT || '4000';
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(cookieParser("My secret for Amusic App"));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/index', indexRouter);
app.use('/filedata', fileDataRouter);
app.use('/auth', authRouter);
app.use('/upload', uploadRouter);


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render('error');
});
if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '../amuse-ic/build')));
  app.get('*',(req,res)=>
      res.sendFile(path.resolve(__dirname,'..', 'amuse-ic', 'build', 'index.html'))
  );
}else{
  app.get('/',(req,res)=>{
      res.send('API is Running');
  });
}

app.listen(port, function(){
  console.log("Server running at 4000");
})
