//instantiate standard libraries
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//set up router for each set of routes --importing from routes/ folder
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//we added:
var blogsRouter = require('./routes/blogs');

//instantiate the actual express app
// Don't need this because port set to 3000 in bin > www folder:
// const port = 3001;
var app = express();

// view engine setup
//sets application settings --things we can access across the app
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//associating the libraries with the app
//adding middleware --libraries we can use throughout our appliction.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); //for hosting static files: css, html, images, etc.

//we bind (associate) the routers to routes in our application
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/blogs', blogsRouter);

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

// Don't need this because port set to 3000 in bin > www folder:
// app.listen(port, () => {
//   console.log(`ExpressBlogger app listening on port ${port}`)
// })

module.exports = app;
