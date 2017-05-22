var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var register = require('./routes/register');
var logout = require('./routes/logout');

var app = express();

var identityKey = 'iiong';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//设置session
app.use(session({
    name: identityKey,
    store: new FileStore(), //本地存储session（文本文件，也可以选择其他store，比如redis的）
    saveUninitialized: false, //是否自动保存未初始化的会话，建议false
    resave: false, //是否每次都重新保存会话，建议false
    secret: '1234567890', //用来对session id相关的cookie进行签名，建议使用 128 个字符的随机字符串
    cookie: {
        maxAge: 60 * 1000  //有效期，单位是毫秒,实例会话有效期1分钟
    }
}));

app.use('/', index);
app.use('/users', users);
app.use('/login', login);
app.use('/register', register);
app.use('/logout',logout);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
