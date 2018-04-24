/**
 * Created by xz197 on 2017/5/1.
 */
var express = require('express');
var router = express.Router();
var userdao = require('./../dao/dish-foodDAO');

//上传菜品成品图与步骤图
var formidable = require('formidable');
var AVATAR_UPLOAD_FOLDER = '/upload_dish_pics/';
var AVATAR_UPLOAD_FOLDER_step = '/upload_dish_step_pics/';
var createUnique = require('./../util/createUnique');
var fs = require('fs');

//首页展示菜品
// 搜索跳转页面显示某一类的菜品
router.get('/getDishFood', function (req, res, next) {
    var user=req.query;
    userdao.getDishFood(user,function (result) {
        res.json({result:result})
    })

});

//发表菜谱页面上传主料
router.get('/addMain_ing', function (req, res, next) {
    var user=req.query;
    userdao.addMain_ing(user,function (result) {
        res.json({result:result})
    })

});

//发表菜谱页面上传辅料
router.get('/addSecond_ing', function (req, res, next) {

    var user=req.query;
    userdao.addSecond_ing(user,function (result) {
        res.json({result:result})
    })

});

//菜品详情页获取某一个菜品信息
router.get('/getOneDish', function (req, res, next) {
    var user=req.query;
    userdao.getOneDish(user,function (result) {
        res.json({result:result})
    })

});

//菜品详情页获取某一个菜品的步骤信息
router.get('/getOneDishStep', function (req, res, next) {
    var user=req.query;
    userdao.getOneDishStep(user,function (result) {
        res.json({result:result})
    })

});

//发表菜谱页面获取发表菜谱信息
router.get('/getAddDish', function (req, res, next) {
    var user=req.query;
    userdao.getAddDish(user,function (result) {
        res.json({result:result});
    })

});

//首页按月份显示菜谱
router.get('/getMonthDish', function (req, res, next) {
    var user=req.query;
    userdao.getMonthDish(user,function (result) {
        res.json({result:result})
    })

});

//首页显示最新菜谱
router.get('/getNewDish', function (req, res, next) {
    var user=req.query;
    userdao.getNewDish(user,function (result) {
        res.json({result:result})
    })

});

//发表菜谱页面获取发表的菜谱的id
router.get('/getReleaseDish', function (req, res, next) {
    var user=req.query;
    userdao.getReleaseDish(user,function (result) {
        res.json({result:result})
    })

});

//判断是否点赞
router.get('/getIFThumb', function (req, res, next) {
    var user=req.query;
    userdao.getIFThumb(user,function (result) {
        res.json({result:result})
    })
});

//增加菜品点赞数
router.get('/addDishClick', function (req, res, next) {
    var user=req.query;
    userdao.addDishClick(user,function (result) {
        res.json({result:result})
    })

});

//删除菜品点赞
router.get('/deleteDishClick', function (req, res, next) {
    var user=req.query;
    userdao.deleteDishClick(user,function (result) {
        res.json({result:result})
    })

});

//增加菜品评论数
router.get('/addDishComment', function (req, res, next) {
    var user=req.query;
    // console.log(user);
    userdao.addDishComment(user,function (result) {
        res.json({result:result})
    })

});

//判断是否收藏
router.get('/getIFCollect', function (req, res, next) {
    var user=req.query;
    userdao.getIFCollect(user,function (result) {
        res.json({result:result})
    })
});

//增加菜谱收藏
router.get('/addDishCollect', function (req, res, next) {
    var user=req.query;
    userdao.addDishCollect(user,function (result) {
        res.json({result:result})
    })

});

//删除菜谱收藏
router.get('/deleteDishCollect', function (req, res, next) {
    var user=req.query;
    userdao.deleteDishCollect(user,function (result) {
        res.json({result:result})
    })

});

//菜品详情页获取菜的主料
router.get('/getMainIng', function (req, res, next) {
    var user=req.query;
    userdao.getMainIng(user,function (result) {
        res.json({result:result})
    })

});

//菜品详情页获取菜的辅料
router.get('/getSecondIng', function (req, res, next) {
    var user=req.query;
    userdao.getSecondIng(user,function (result) {
        res.json({result:result})
    })

});

//获取某一菜品的评论
router.get('/getOneDishComment', function (req, res, next) {
    var user=req.query;
    userdao.getOneDishComment(user,function (result) {
        res.json({result:result})
    })

});

//个人中心获取个人收藏菜谱信息
router.get('/getMyCollectDish', function (req, res, next) {
    var user=req.query;
    userdao.getMyCollectDish(user,function (result) {
        res.json({result:result})
    })
});

//个人中心获取个人发表菜谱信息
router.get('/getMyAddDish', function (req, res, next) {
    var user=req.query;
    userdao.getMyAddDish(user,function (result) {
        res.json({result:result})
    })

});

//post提交
var text1 = '';
router.post('/getAddAct', function (req, res, next) {
    var text = req.body;
    text1 = text;
});
//上传菜品成品图
router.post('/upload_dish_pic', function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) {
            response.locals.error = err;
            return;
        }
        var text = fields;
        var extName = '';  //后缀名
        switch (files.file.type) {
            case 'image/jpeg':
                extName = 'jpeg';
                break;
            case 'image/jpg':
                extName = 'jpg';
                break;
            case 'image/png':
                extName = 'png';
                break;
            case 'image/x-png':
                extName = 'png';
                break;
        }
        if (extName.length == 0) {
            res.send('只支持png和jpg格式图片');
            return;
        } else {
            form.uploadDir = "../public" + AVATAR_UPLOAD_FOLDER;     //设置上传目录
            form.keepExtensions = true;     //保留后缀
            form.maxFieldsSize = 2 * 1024;   //文件大小
            var avatarName = createUnique.creatName() + '.' + extName;
            var newPath = form.uploadDir + avatarName;
            fs.renameSync(files.file.path, newPath);  //重命名
            userdao.upload_dish_pic(text1, avatarName, function (result) {
            });
            res.send('上传成功');
        }
    })
});

//上传菜品步骤图
router.post('/upload_dish_step_pic', function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        // console.log(files);
        // console.log(files);
        // console.log('here');
        if (err) {
            response.locals.error = err;
            return;
        }
        var extName = '';  //后缀名
        switch (files.file.type) {
            case 'image/jpeg':
                extName = 'jpeg';
                break;
            case 'image/jpg':
                extName = 'jpg';
                break;
            case 'image/png':
                extName = 'png';
                break;
            case 'image/x-png':
                extName = 'png';
                break;
        }
        if (extName.length == 0) {
            // res.send('只支持png和jpg格式图片');
            return;
        } else {
            form.uploadDir = "../public" + AVATAR_UPLOAD_FOLDER_step;     //设置上传目录
            form.keepExtensions = true;     //保留后缀
            form.maxFieldsSize = 2 * 1024;   //文件大小
            var avatarName = createUnique.creatName() + '.' + extName;
            var newPath = form.uploadDir + avatarName;
            fs.renameSync(files.file.path, newPath);  //重命名
            userdao.upload_dish_step_pic(fields, avatarName, function (result) {
            });
            // res.send('上传成功');
        }
    })
});

module.exports= router;