/**
 * Created by xz197 on 2017/5/2.
 */
var express = require('express');
var router = express.Router();
var userdao = require('./../dao/topic-foodDAO');
var formidable = require('formidable');
var util = require('util');
var AVATAR_UPLOAD_FOLDER = '/upload_topic_pics/';
var createUnique = require('../util/createUnique');
var fs = require('fs');


//话题详情页获取话题内容
router.post('/getTopicTxt', function (req, res, next) {
    var text = req.body;
    userdao.getTopicTxt(text,function (result) {
        res.json({res: JSON.parse(result)[0]});
    });
});

//话题详情页获取图片列表
router.get('/getTopicPic',function (req,res) {
    // console.log(req.query)
    userdao.getTopicPic(req.query,function (result) {
        res.json({res: JSON.parse(result)});
    })
});

//首页获取话题信息
router.get('/getTopicFood', function (req, res, next) {
    var user=req.query;
    userdao.getTopicFood(user,function (result) {
        res.json({result:result})
    })

});

//话题展示页获取话题
router.get('/getTopicShow', function (req, res, next) {
    var user=req.query;
    userdao.getTopicShow(user,function (result) {
        res.json({result:result})
    })

});

//个人中心获取个人发表话题信息
router.get('/getMyAddTopic', function (req, res, next) {
    var user=req.query;
    userdao.getMyAddTopic(user,function (result) {
        res.json({result:result})
    })

});

//个人中心获取个人收藏话题信息
router.get('/getMyCollectTopic', function (req, res, next) {
    var user=req.query;
    userdao.getMyCollectTopic(user,function (result) {
        res.json({result:result})
    })

});

//获取某一话题的评论
router.get('/getOneTopicComment', function (req, res, next) {
    var user=req.query;
    userdao.getOneTopicComment(user,function (result) {
        res.json({result:result})
    })

});

//增加话题评论数
router.get('/addTopicComment', function (req, res, next) {
    var user=req.query;
    userdao.addTopicComment(user,function (result) {
        res.json({result:result})
    })

});

//发布话题
router.post('/addTopic', function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        //如果没有图片上传
        if(files.length>1){
            userdao.add_topic_no(fields,function (_res) {
                res.send('1');
            })
        }else {
            //上传带图文章
            userdao.add_topic(fields,function (result) {
                var topic_id=JSON.parse(result)[0].topic_id;
                var arrimg = [];    //声明一个存多图的数组
                var arrimgname = '';   //声明一个把数组转为字符串
                for(a in files){     //多图上传时 通过for in循环出一下内容（普通for循环不行）
                    if (err) {
                        response.locals.error = err;
                        return;
                    }
                    var extName = '';  //后缀名
                    switch (files[a].type) {
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
                        res.send('2');
                    } else {
                        form.uploadDir = "../public" + AVATAR_UPLOAD_FOLDER;     //设置上传目录
                        form.keepExtensions = true;     //保留后缀
                        form.maxFieldsSize = 2 * 1024;   //文件大小
                        var avatarName = createUnique.creatName() + '.' + extName;
                        var newPath = form.uploadDir + avatarName;
                        fs.renameSync(files[a].path, newPath);  //重命名
                        arrimg.push(avatarName);
                        arrimgname = arrimg.toString()
                    }
                }
                //上传artid和图片名到图片表
                userdao.add_topic_photo(topic_id,arrimgname,function (result) {
                    res.send('1')
                })
            });
        }
    }); //end form.parse
});

//判断话题是否点赞
router.get('/getIFTopicThumb', function (req, res, next) {
    var user=req.query;
    userdao.getIFTopicThumb(user,function (result) {
        res.json({result:result})
    })
});

//增加话题点赞数
router.get('/addTopicClick', function (req, res, next) {
    var user=req.query;
    userdao.addTopicClick(user,function (result) {
        res.json({result:result})
    })

});

//删除话题点赞数
router.get('/deleteTopicClick', function (req, res, next) {
    var user=req.query;
    userdao.deleteTopicClick(user,function (result) {
        res.json({result:result})
    })

});

//判断是否收藏
router.get('/getIFTopicCollect', function (req, res, next) {
    var user=req.query;
    userdao.getIFTopicCollect(user,function (result) {
        res.json({result:result})
    })
});

//增加话题收藏
router.get('/addTopicCollect', function (req, res, next) {
    var user=req.query;
    userdao.addTopicCollect(user,function (result) {
        res.json({result:result})
    })

});

//删除话题收藏
router.get('/deleteTopicCollect', function (req, res, next) {
    var user=req.query;
    userdao.deleteTopicCollect(user,function (result) {
        res.json({result:result})
    })

});

//达人页面获取评论较高的菜品信息
router.get('/getByTopic', function (req, res, next) {
    var user = req.query;
    userdao.getByTopic(user, function (result) {
        res.json({result: result})
    })
});

module.exports= router;