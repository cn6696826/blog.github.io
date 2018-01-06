var express = require('express');
var app = express();
app.get('/', function(req, res) {
    //返回的数据
    res.send('hollo world');
})
var server = app.listen(3000, function() {
    //node api ==server.address 找到指定的端口 返回三个值 port （端口） address(地址) family (IPV4协议)
    //只有在listen事件的时候才会触发    
    var host = server.address().address;
    var port = server.address().port;
    //命令行会打印当前的信息
    console.log(port)

})