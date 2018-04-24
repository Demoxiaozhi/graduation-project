/**
 * Created by xz197 on 2017/5/2.
 */
var getClient=require('./../util/DBHelper');
var domain=require('domain');
var usesql=require('./sql/topic-foodSql');


var dom01=domain.create();
var user={



    //获取文章
    getTopicTxt: function (data, callback) {
        // console.log(data);
        dom01.on('error', function (error) {
            console.log(error.message);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(usesql.getTopicTxt, [data.topic_id], function (error, res) {
                    if (error) {
                        client.release();
                        callback(3);
                    }
                    callback(JSON.stringify(res));
                    client.release();
                });
            });
        })
    },

    //获取图片
    getTopicPic: function (data, callback) {
        // console.log(data.topic_id);
        dom01.on('error', function (error) {
            console.log(error.message);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(usesql.getTopicPic, [data.topic_id], function (error, res) {
                    if (error) {
                        client.release();
                        callback(3);
                    }
                    callback(JSON.stringify(res));
                    client.release();
                    // console.log(res)
                    // console.log('here')
                });
            });
        })
    },
    //首页获取话题信息
    getTopicFood:function (user,callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(usesql.getTopicFood,[user],function (error,result) {
                    // console.log(result);
                    if(error){
                        client.release();
                        //3  表示数据库连接异常
                        callback(3);
                    }else{
                        // console.log(result);
                        callback(result)
                    }
                });
            })
        })
    },

    //话题展示页获取话题
    getTopicShow:function (user,callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        console.log(11)
        dom01.run(function () {
            getClient(function (client) {
                client.query(usesql.getTopicShow,[user],function (error,result) {
                    // console.log(result);
                    if(error){
                        client.release();
                        //3  表示数据库连接异常
                        callback(3);
                    }else{
                        // console.log(result);
                        callback(result)
                    }
                });
            })
        })
    },

    //添加话题
    addTopic:function (user,callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            //4表示数据库连接错误
            callback(4);
        });
        dom01.run(function () {
            var myDate = new Date();
            var topic_publish_time=myDate.toLocaleString();

            getClient(function (client) {
                client.query(usesql.addTopic,[user.user_id,user.topic_type_id,user.topic_name,user.topic_content,'topic_004.jpg',topic_publish_time],function (error,result) {
                    if(error){
                        console.log(error.message);
                        client.release();
                        //数据库连接错误
                        callback(4);
                    }
                    callback(result);
                    client.release();
                })
            })
        });
    },

    //个人中心获取个人发表话题信息
    getMyAddTopic:function (user,callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        // console.log(11);
        dom01.run(function () {
            getClient(function (client) {
                // console.log(user.user_id);
                client.query(usesql.getMyAddTopic,[user.user_id],function (error,result) {

                    // console.log(result);
                    if(error){
                        client.release();
                        //3  表示数据库连接异常
                        callback(3);
                    }else{
                        // console.log(result);
                        callback(result)
                    }
                });
            })
        })
    },


    //个人中心获取个人收藏话题信息
    getMyCollectTopic:function (user,callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        // console.log(11)
        dom01.run(function () {
            getClient(function (client) {
                client.query(usesql.getMyCollectTopic,[user.user_id],function (error,result) {
                    // console.log(result);
                    if(error){
                        client.release();
                        //3  表示数据库连接异常
                        callback(3);
                    }else{
                        // console.log(result);
                        callback(result)
                    }
                });
            })
        })
    },

    //获取某一话题的评论
    getOneTopicComment:function (user,callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(usesql.getOneTopicComment,[user.topic_id],function (error,result) {
                    // console.log(result);
                    if(error){
                        client.release();
                        //3  表示数据库连接异常
                        callback(3);
                    }else{
                        // console.log(result);
                        callback(result)
                    }
                });
            })
        })
    },

    //增加话题评论数
    addTopicComment:function (user,callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {

            var myDate = new Date();
            var comment_time=myDate.toLocaleString();
            getClient(function (client) {
                client.query(usesql.addTopicComment,[user.user_id,user.topic_id,user.comment_content,comment_time],function (error,result) {
                    // console.log(result);
                    if(error){
                        client.release();
                        //3  表示数据库连接异常
                        callback(3);
                    }else{
                        // console.log(result);
                        callback(result)
                    }
                });
            })
        })
    },

    //发布有图话题
    add_topic: function (data, callback) {
        var nowDate = new Date();
        var topic_publish_time = nowDate.toLocaleDateString() + " " + nowDate.toLocaleTimeString();
        dom01.on('error', function (error) {
            console.log(error.message);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(usesql.add_topic, [data.user_id,data.topic_type_id, data.topic_name, data.topic_content, topic_publish_time,data.topic_div], function (error, res) {
                    if (error) {
                        client.release();
                        callback(3);
                    }
                    getClient(function (cli) {
                        cli.query(usesql.get_topic_id,[data.user_id,topic_publish_time],function (error,re) {
                            if (error) {
                                cli.release();
                                callback(3);
                            }
                            // console.log(re);
                            callback(JSON.stringify(re))
                        })
                    });
                    // callback(1);
                })
            })
        })
    },
    //上传图片到图片列表
    add_topic_photo:function (data,name,callback) {
        dom01.on('error', function (error) {
            console.log(error.message);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(usesql.add_topic_photo,[data,name], function (error, res) {
                    if (error) {
                        client.release();
                        callback(3);
                    }
                    callback(1);
                    // console.log('ok');
                })
            })
        })
    },
    //发布无图
    add_topic_no: function (data, callback) {
    // console.log(data);
    var nowDate = new Date();
    var topic_publish_time = nowDate.toLocaleDateString() + " " + nowDate.toLocaleTimeString();
    dom01.on('error', function (error) {
        console.log(error.message);
    });
    dom01.run(function () {
        getClient(function (client) {
            client.query(usesql.add_topic_no, [data.user_id, data.topic_name, data.text,data.div, topic_publish_time], function (error, res) {
                if (error) {
                    client.release();
                    callback(3);
                }
                callback(1);
            })
        })
    })
},

    //判断话题是否点赞
    getIFTopicThumb: function (user, callback) {
        dom01.on('error', function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(usesql.getIFTopicThumb, [user.user_id,user.topic_id], function (error, result) {
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
    //增加话题点赞数
    addTopicClick:function (user,callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(usesql.addTopicClick,[user.user_id,user.topic_id],function (error,result) {
                    // console.log(result);
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
    //删除话题点赞数
    deleteTopicClick:function (user,callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(usesql.deleteTopicClick,[user.user_id,user.topic_id],function (error,result) {
                    // console.log(result);
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

    //判断是否收藏
    getIFTopicCollect: function (user, callback) {
        dom01.on('error', function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(usesql.getIFTopicCollect, [user.user_id,user.topic_id], function (error, result) {
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
    //增加话题收藏
    addTopicCollect:function (user,callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                var currentTime=new Date();
                var collectTime=currentTime.toLocaleString();
                client.query(usesql.addTopicCollect,[user.user_id,user.topic_id,collectTime],function (error,result) {
                    // console.log(result);
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
    //删除话题收藏
    deleteTopicCollect:function (user,callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(usesql.deleteTopicCollect,[user.topic_id,user.user_id],function (error,result) {
                    // console.log(result);
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

    //达人页面获取评论较高的菜品信息
    getByTopic: function (user, callback) {
        dom01.on('error', function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(usesql.getByTopic, function (error, result) {
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
};

module.exports=user;