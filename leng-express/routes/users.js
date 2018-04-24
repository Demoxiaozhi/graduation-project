var express = require('express');
var router = express.Router();
var userdao = require('./../dao/userDAO');

//图像上传
var formidable = require('formidable');
var AVATAR_UPLOAD_FOLDER = '/uploads/';
var createUnique = require('./../util/createUnique');
var fs = require('fs');
/* GET users listing. */
//获得用户列表
router.get('/', function (req, res, next) {

});

//get方式登录
router.get('/login', function (req, res, next) {
    var user = req.query;
    if (user != null && user.user_phone_number != null && user.password != null) {
        if (user.user_phone_number.length == 11) {
            userdao.getUserPassword(user, function (_res) {
                res.json({result: _res});
            })
        } else {
            res.json({result: 3});
        }
    }
});

//post方式登录
router.post('/login', function (req, res, next) {
    var user = req.body;
    // console.log('post..........');
    if (user != null && user.user_phone_number != null && user.password != null) {
        if (user.user_phone_number.length == 11) {
            userdao.getUserPassword(user, function (_res) {
                res.json({result: _res});
            })
        } else {
            res.json({result: 3});
        }
    }
});

//post方式注册
router.post('/regist', function (req, res, next) {
    var user = req.body;
    if (user != null && user.user_phone_number != null && user.password != null) {
        userdao.addUser(user, function (_result) {
            res.json({result: _result});
        });
    }
});

//get方式注册
router.get('/regist', function (req, res, next) {
    var user = req.query;
    if (user != null && user.user_phone_number != null && user.password != null) {
        userdao.addUser(user, function (_result) {
            res.json({result: JSON.parse(_result)});
        });
    }
});

//修改用户密码模块
router.get('/updatePass',function (req,res,next) {
    var user=req.query;
    // console.log(user);
    if(user){
        userdao.updatePassword(user,function (result) {
            res.json({result:result});
        })
    }
    
});

// 查看用户信息模块
router.get('/userinfo', function (req, res,next) {
        var user_phone_number = req.query.user_phone_number;
        if (user_phone_number) {
            userdao.getUserInfo(user_phone_number, function (_result) {
                var result = {
                    user_id: _result[0],
                    user_name: _result[1],
                    password: _result[2],
                    user_sname: _result[3],
                    sex: _result[4],
                    birthday: _result[5],
                    province: _result[6],
                    city: _result[7],
                    sign: _result[8],
                    head_photo: _result[9],
                    regist_time: _result[10],
                };
                res.json(result)
                // console.log(result);
            })
        }
    });

//修改用户信息模块
router.post('/userinfo',function (req, res,next) {
        var userInfo = req.body;
        userdao.setUserInfo(userInfo,function (_result) {
            if(_result!='error'){
                res.send({res:1})
            }else{
                res.send('failed')
            }
        })
    });

//获取用户头像
router.get('/getUserIcon', function (req, res, next) {
    var user = req.query;
    userdao.getUserIcon(user, function (result, head_photo) {
        res.json({result: result})
    })
});

//上传用户头像
router.post('/upload', function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) {
            response.locals.error = err;
            // response.render("uploads");
            return;
        }
        userdao.getUserById(fields.user_phone_number, function (result) {

            if (result.length == 1) {

                var extName = '';  //后缀名
                // console.log('文件后缀名为 ' + files.file.type);

                switch (files.file.type) {  //此处in_file  为页面端 <input type=file name=in_file>
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
                // console.log('extName=' + extName);
                if (extName.length == 0) {
                    res.send('只支持png和jpg格式图片');
                    return;
                } else {
                    form.uploadDir = "../public" + AVATAR_UPLOAD_FOLDER;     //设置上传目录
                    form.keepExtensions = true;     //保留后缀
                    form.maxFieldsSize = 2 * 1024;   //文件大小
                    var avatarName = createUnique.creatName() + '.' + extName;
                    var newPath = form.uploadDir + avatarName;
                    // console.log(newPath);


                    var readStream = fs.createReadStream(files.file.path);
                    var writeStream = fs.createWriteStream(newPath);
                    readStream.pipe(writeStream);

                    readStream.on('end', function () {
                        fs.unlinkSync(files.file.path);

                    });

                    // console.log(avatarName);

                    // console.log('upload end...');

                    userdao.upLoadIcon(avatarName, fields.user_phone_number, function (result) {
                        console.log(result.affectedRows);
                        res.send({result:result.affectedRows});
                    })

                    // console.log(2);
                    // res.send('上传成功');
                }
            }
        }) //end getUserByid
    })//end form.parse

});

//菜品详情页获取当前用户的信息
router.get('/getOneUserInfo', function (req, res, next) {
    var user = req.query;
    userdao.getOneUserInfo(user, function (result) {
        res.json({result: result})
    })
});

//菜品详情页获取当前菜品作者的信息
router.get('/getAuthorInfo', function (req, res, next) {
    var user = req.query;
    userdao.getAuthorInfo(user, function (result) {
        res.json({result: result})
    })
});

//菜品详情页获取当前菜品作者发表菜谱数量
router.get('/getAuthorDishCount', function (req, res, next) {
    var user = req.query;
    userdao.getAuthorDishCount(user, function (result) {
        res.json({result: result})
    })
});

//菜品详情页获取当前菜品作者的粉丝数
router.get('/getAuthorFansCount', function (req, res, next) {
    var user = req.query;
    userdao.getAuthorFansCount(user, function (result) {
        res.json({result: result})
    })
});

//菜品详情页关注菜品作者
router.get('/focusDishAuthor', function (req, res, next) {
    var user=req.query;
    userdao.focusDishAuthor(user,function (result) {
        res.json({result:result})
    })

});

//菜品详情页取消关注菜品作者
router.get('/deleteFocusDishAuthor', function (req, res, next) {
    var user=req.query;
    userdao.deleteFocusDishAuthor(user,function (result) {
        res.json({result:result})
    })

});

//判断是否已经关注菜品作者
router.get('/getIFFocus', function (req, res, next) {
    var user=req.query;
    userdao.getIFFocus(user,function (result) {
        res.json({result:result})
    })
});

//达人页面获取达人信息
router.get('/getMasterUser', function (req, res, next) {
    var user = req.query;
    userdao.getMasterUser(user, function (result) {
        res.json({result: result})
    })
});

//达人页面获取评论较高的菜品信息
router.get('/getByComment', function (req, res, next) {
    var user = req.query;
    userdao.getByComment(user, function (result) {
        res.json({result: result})
    })
});

module.exports = router;

//business

