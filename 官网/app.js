var express = require('express');
var app = express();
app.get('/', function(req, res) {
        //返回的数据
        res.send('hollo world');
    })
    // / 各种路由匹配规则
    // 匹配 acd abcd b是选项可有可不有 ? 表示选择可有可不用
app.get('/ab?cd', function(req, res) {
        res.send('22')
    })
    // 匹配abcd abbcd abbbcd b是可选项 前后都可使用
app.get('/ab+cd', function(req, res) {
        // 不能使用send命令 ** ** ** ** ** **
        res.send('2ww2')
    })
    //ab和cd之间可以夹杂其他任意内容 ab11233cd
app.get('/ab*cd', function(req, res) {

    })
    //正则表达式的匹配
app.get(/abdd/, function(req, res) {

})

// app.route()路由路径的链式句柄
app.route('/ad2').get(function(res, req) {
    res.send('222')
}).post(function(res, req) {
    res.send('2223')
})

var router = express.Router();


var server = app.listen(3000, function() {
    //node api ==server.address 找到指定的端口 返回三个值 port （端口） address(地址) family (IPV4协议)
    //只有在listen事件的时候才会触发    
    var host = server.address().address;
    var port = server.address().port;
    //命令行会打印当前的信息
    console.log(port)

})