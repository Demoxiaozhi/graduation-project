/**
 * Created by lzhan on 2017/4/21.
 */

var getClient = require('./../util/DBHelper');
var domain = require('domain');
var usesql = require('./sql/userSql');

var util = require('./../util/MD5');

var dom01 = domain.create();
var user = {
    //增加用户
    addUser: function (user, callback) {
        that = this;
        dom01.on('error', function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            that.getUserById(user.user_phone_number, function (_res) {
                //判读是否已经存在改用户
                if (typeof _res == 'object') {
                    if (_res.length == 1) {
                        //2 表示用户已存在
                        callback(2);
                    } else {

                        var myDate = new Date();
                        var regist_time=myDate.toLocaleString();
                        getClient(function (client) {
                            client.query(usesql.addUser1, [user.user_phone_number, util.MD5(user.password), 'photo-old.png','哆啦A梦',regist_time], function (error, result) {
                                if (error) {
                                    client.release();
                                    callback(3);
                                    return;
                                }
                                if (result.affectedRows == 1) {
                                    getClient(function (cli) {
                                        cli.query(usesql.getUid, [user.user_phone_number], function (err, res) {
                                            if (err) {
                                                console.log(err.message);
                                            }
                                            else {
                                                getClient(function (_client) {
                                                    _client.query(usesql.getUserIcon1, [user.user_phone_number], function (_error, _result) {
                                                        if (_error) {
                                                            console.log(_error.message);
                                                        }
                                                        callback(JSON.stringify({uId: res[0].user_id, uIcon: _result[0].head_photo, user_sname: _result[0].user_sname}));
                                                    })
                                                })
                                            }
                                        })
                                    })
                                }
                                // callback('photo-old.png');
                                else throw('add user failed');
                                client.release();

                            })
                        })
                    }
                    //    查询用户是否存在，出现数据库异常
                } else {
                    callback(_res);
                }
            });
        })

    },
    //通过ID查找用户
    getUserById: function (id, callback) {
        dom01.on('error', function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {


            getClient(function (client) {


                client.query(usesql.getUserById1, [id], function (error, result) {
                    if (error) {
                        client.release();
                        //3  表示数据库连接异常
                        callback(3);
                    }
                    callback(result);


                });

            })
        })
    },
    //查找用户密码
    getUserPassword: function (user, callback) {
        dom01.on('error', function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(usesql.getUserPassword1, [user.user_phone_number], function (error, result) {
                    if (error) {
                        client.release();
                        //3  表示数据库连接异常
                        callback(3);
                    }
                    if (result.length == 1) {
                        //    1 表示登录成功
                        //     console.log('here');
                        if (result[0].password === util.MD5(user.password)) {
                            callback(result);
                        } else {
                            //2 表示密码错误
                            callback(2)
                        }
                    } else {
                        //0 该用户名不存在
                        callback(0);
                    }
                });
            })
        })
    },

    //通过手机号找密码
    getPassById: function (id, callback) {
        dom01.on('error', function (err) {
            console.log(err.message);
            //表示数据库连接错误
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(usesql.getUserPassword, [id], function (error, result) {
                    if (error) {
                        client.release();
                        //3  表示数据库连接异常
                        callback(3);
                    }
                    callback(result);
                    client.release();
                });
            })
        })
    },

    //修改用户密码
    updatePassword: function (user, callback) {
        that = this;
        dom01.on('error', function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            that.getPassById(user.user_phone_number, function (res) {

                // console.log(util.MD5(user.password))
                console.log(res);
                if (res[0].password === util.MD5(user.password)) {
                    getClient(function (client) {
                        client.query(usesql.updatePassword, [util.MD5(user.newPassword), user.user_phone_number], function (error, result) {
                            if (error) {
                                console.log(error.message);
                                client.release();
                                //4表示数据库连接错误
                                callback(4);
                                return;
                            }
                            callback(result.affectedRows);
                            client.release();


                        });
                    })
                } else {
                    //表示输入的原始密码错误
                    callback(2);
                }
            })
        })
    },


    //上传用户头像
    upLoadIcon: function (head_photo, user_phone_number, callback) {

        dom01.on('error', function (err) {

            console.log(err.message);
            callback(4);
            //4  表示数据库连接错误
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(usesql.upLoadIcon1, [head_photo, user_phone_number], function (error, result) {
                    if (error) {
                        console.log(error.message);
                        client.release();
                        //4表示数据库连接错误
                        callback(4);
                    }

                    callback(result);
                    client.release();
                });
            })
        })
    },
    //获取用户头像
    getUserIcon: function (user, callback) {
        dom01.on('error', function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(usesql.getUserIcon1, [user.user_phone_number], function (error, result) {
                    if (error) {
                        client.release();
                        //3  表示数据库连接异常
                        callback(3);
                    } else {
                        callback(result)
                    }
                });
            })
        })
    },

    //菜品详情页获取当前菜品作者的信息
    getAuthorInfo: function (user, callback) {
        dom01.on('error', function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(usesql.getAuthorInfo, [user.dish_id], function (error, result) {
                    if (error) {
                        client.release();
                        //3  表示数据库连接异常
                        callback(3);
                    } else {
                        callback(result)
                    }
                });
            })
        })
    },

    //菜品详情页获取当前菜品作者发表菜谱数量
    getAuthorDishCount: function (user, callback) {
        dom01.on('error', function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(usesql.getAuthorDishCount, [user.user_id], function (error, result) {
                    if (error) {
                        client.release();
                        //3  表示数据库连接异常
                        callback(3);
                    } else {
                        callback(result)
                    }
                });
            })
        })
    },

    //菜品详情页获取当前菜品作者的粉丝数
    getAuthorFansCount: function (user, callback) {
        dom01.on('error', function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(usesql.getAuthorFansCount, [user.user_id], function (error, result) {
                    if (error) {
                        client.release();
                        //3  表示数据库连接异常
                        callback(3);
                    } else {
                        callback(result)
                    }
                });
            })
        })
    },

    //获取用户个人信息
    getUserInfo: function (user_phone_number, callback) {
        dom01.on('error', function (err) {
            console.log('get user info error:' + err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(usesql.getUserInfo, [user_phone_number], function (error, result) {
                    if (error) {
                        client.release();
                        callback(3);
                    } else {
                        callback(result)
                    }
                });
            })
        })
    },

    //修改用户个人信息
    setUserInfo: function (userInfo, callback) {
        dom01.on('error', function (err) {
            console.log('set user info error:' + err.message);
            callback('error');
        });
        dom01.run(function () {
            getClient(function (client) {
                var params = [userInfo.user_sname, userInfo.sex, userInfo.birthday, userInfo.province, userInfo.city, userInfo.sign, userInfo.user_phone_number]
                client.query(usesql.setUserInfo, params, function (error, result) {
                    if (error) {
                        client.release();
                        callback(3);
                    } else {
                        callback(result)
                    }
                });
            })
        })
    },

    //菜品详情页获取当前用户的信息
    getOneUserInfo: function (user, callback) {
        dom01.on('error', function (err) {
            console.log('get user info error:' + err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(usesql.getOneUserInfo, [user.user_id], function (error, result) {
                    if (error) {
                        client.release();
                        callback(3);
                    } else {
                        callback(result)
                    }
                });
            })
        })
    },

    //菜品详情页关注菜品作者
    focusDishAuthor:function (user,callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                var currentTime=new Date();
                var attention_time=currentTime.toLocaleString();
                client.query(usesql.focusDishAuthor,[user.user_id,user.suser_id,attention_time],function (error,result) {
                    console.log(result);
                    if(error){
                        client.release();
                        //3  表示数据库连接异常
                        callback(3);
                    }else{
                        callback(result.affectedRows);
                    }
                });
            })
        })
    },

    //菜品详情页取消关注菜品作者
    deleteFocusDishAuthor:function (user,callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(usesql.deleteFocusDishAuthor,[user.user_id,user.suser_id],function (error,result) {
                    console.log(result);
                    if(error){
                        client.release();
                        //3  表示数据库连接异常
                        callback(3);
                    }else{
                        callback(result.affectedRows);
                    }
                });
            })
        })
    },

    //判断是否已经关注菜品作者
    getIFFocus: function (user, callback) {
        dom01.on('error', function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(usesql.getIFFocus, [user.user_id,user.suser_id], function (error, result) {
                    if(error){
                        client.release();
                        //3  表示数据库连接异常
                        callback(3);
                    }else{
                        callback(result.length);
                        client.release();
                    }
                });
            })
        })
    },

    //达人页面获取达人信息
    getMasterUser: function (user, callback) {
        dom01.on('error', function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(usesql.getMasterUser, function (error, result) {
                    if (error) {
                        client.release();
                        callback(3);
                    } else {
                        callback(result)
                    }
                });
            })
        })
    },

    //达人页面获取评论较高的菜品信息
    getByComment: function (user, callback) {
        dom01.on('error', function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(usesql.getByComment, function (error, result) {
                    if (error) {
                        client.release();
                        callback(3);
                    } else {
                        callback(result)
                    }
                });
            })
        })
    }
};

module.exports = user;