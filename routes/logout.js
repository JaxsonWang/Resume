var express = require('express');
var router = express.Router();

var identityKey = 'iiong';

/* GET logout page. */
router.get('/', function (req, res, next) {
    req.session.destroy(function (err) {
        if(err){
            res.json({ret_code: 2, ret_msg: '退出登录失败'});
            return;
        }

        // req.session.loginUser = null;
        res.clearCookie(identityKey);
        res.redirect('/');
    })
});
module.exports = router;
