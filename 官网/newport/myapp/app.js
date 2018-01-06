var express = require('express');
//以下都是中间件  不会的可以参考npm 的api
var path = require('path');
//npm 可以安装 用于请求网页logo
var favicon = require('serve-favicon');
//记录日志
var logger = require('morgan');
var cookieParser = require('cookie-parser');
//消息体解析 这个中间件不会解析multipart body 
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); //相对路径
//使用jade引擎模板
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//网页logo的使用方法
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//打印请求信息到指定目录  前提是有这样的目录下的文件
// var acessLog = fs.createWriteStream(path, { flogs: 'a' }) //打印成功请求信息
// var errorLog = fs.createWriteStream(path, { flogs: 'a' })
app.use(logger('dev')); //打印到控制台
app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

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