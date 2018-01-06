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

//引入路由文件
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
// 静态资源访问 如果静态资源存放在多个目录下 可以多次调用中间件
app.use(express.static(path.join(__dirname, 'public')));

//使用引入的两个路由文件
app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler定义错误处理器
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// 路由设定 不在这里在route下
// app.get('/', function(res, req) {
//     res.send('hellowsss')
// })
// app.get('/a', function(res, req) {
//     res.send('koko')
// })
// / 各种路由匹配规则
//匹配 acd abcd  b是选项可有可不有 ?表示选择可有可不用
// app.get('/ab?cd', function() {
//         res.render('index', { title: 'Express' });
//     })
//匹配abcd abbcd abbbcd b是可选项 前后都可使用
// app.get('/ab+cd', function() {
//不能使用send命令************
//        
//     })
//     //ab和cd之间可以夹杂其他任意内容 ab11233cd
// app.get('/ab*cd', function() {
//         
//     })
//     //正则表达式的匹配
// app.get(/abdd/, function() {
//    
// })
var server = app.listen(3000, function() {
    //node api ==server.address 找到指定的端口 返回三个值 port （端口） address(地址) family (IPV4协议)
    //只有在listen事件的时候才会触发    
    var host = server.address().address;
    var port = server.address().port;


})
module.exports = app;