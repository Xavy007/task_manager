var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.use(cors({
  origin: "http://localhost:5173", // Permitir solo desde React
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);

const userRoutes=require('./routes/user.routes');
const taskRoutes=require('./routes/task.routes');
const authRoutes= require('./routes/auth.routes');
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api',taskRoutes);
app.use('/auth',authRoutes);



const PORT = process.env.PORT || 3050;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`))
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

module.exports = app;
