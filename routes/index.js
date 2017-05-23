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

router.get('/resume',function (req, res, next) {
    //数据库查询
    pool.getConnection(function (err, connection) {
        //先判断该账号是否存在
        var $sql = "SELECT * FROM users WHERE username=?";
        connection.query($sql, "Jaxson", function (err, result) {
            var resultJson = result;
            console.log(resultJson);
            res.json(resultJson);
            connection.release();
        });
    });
});

module.exports = router;