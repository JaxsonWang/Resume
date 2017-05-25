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
        title: '后台管理',
        name: sess.name
    });
});
router.post('/admin/example', function (req, res, next) {
    var example_1 = req.body.example_1;
    var sess = req.session;
    pool.getConnection(function (err, connection) {
        var updateSql = "INSERT INTO userinfo(userid,gravatar,area,phoneNum,email) VALUES(0,?,?,?,?)";
        connection.query(updateSql, "Jaxson", function (err, result) {
            var resultJson = result;
            console.log(resultJson);
            res.json(resultJson);
            connection.release();
        });
    });
});

module.exports = router;