var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
// 配置路径
router.get('/a', function(req, res, next) {
    res.render('index', { title: 'Express' });
});



module.exports = router;