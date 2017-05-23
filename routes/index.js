var express = require('express');
var router = express.Router();
// 实现与MySQL交互
var mysql = require('mysql');
var config = require('../model/config');
// 使用连接池，提升性能
var pool = mysql.createPool(config.mysql);
/* GET home page. */
router.get('/', function (req, res, next) {
    var sess = req.session;
    var loginUser = sess.name;
    var isLogined = !!isLogined;
    res.render('index', {
        title: 'Express',
        isLogined: isLogined,
        name: loginUser || '游客'
    });
});

module.exports = router;
