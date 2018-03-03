/**
 * Created by xz197 on 2017/5/1.
 */

var express = require('express');
var router = express.Router();
var userdao = require('./../dao/fv-foodDAO');


//获取某一个果蔬的信息
router.get('/getFvFood', function (req, res, next) {
    var user=req.query;
    userdao.getFvFood(user,function (result) {
        res.json({result:result})
    })

});

//获取某一类果蔬的做法
router.get('/getOneFvFood', function (req, res, next) {
    var user=req.query;
    userdao.getOneFvFood(user,function (result) {
        res.json({result:result})
    })

});









module.exports= router;