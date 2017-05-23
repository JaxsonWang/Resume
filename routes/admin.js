var express = require('express');
var router = express.Router();
// 实现与MySQL交互
var mysql = require('mysql');
var config = require('../model/config');
// 使用连接池，提升性能
var pool = mysql.createPool(config.mysql);
/* GET admin page. */
router.get('/', function (req, res, next) {
    var sess = req.session;
    res.render('admin', {
        title: '后台管理'
    });
});

module.exports = router;