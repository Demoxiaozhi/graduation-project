/**
 * Created by xz197 on 2017/5/1.
 */
var getClient=require('./../util/DBHelper');
var domain=require('domain');
var usesql=require('./sql/dish-foodSql');


var dom01=domain.create();
var user={
    //首页展示菜品
    getDishFood:function (user,callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(usesql.getDishFood,[user],function (error,result) {
                    // console.log(result);
                    if(error){
                        client.release();
                        //3  表示数据库连接异常
                        callback(3);
                    }else{
                        console.log('456');
                        console.log(result);
                        console.log('123');
                        callback(result)
                    }
                });
            })
        })
    },
    //首页按月份显示菜谱
    getMonthDish:function (user,callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(usesql.getMonthDish,[user.right_month],function (error,result) {
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
    //首页显示最新菜谱
    getNewDish:function (user,callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(usesql.getNewDish,[user],function (error,result) {
                    // console.log(result)
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

    //发表菜谱页面获取发表的菜谱的id
    getReleaseDish:function (user,callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(usesql.getReleaseDish,[user.user_id,user.dish_name],function (error,result) {
                    // console.log(result);
                    if(error){
                        client.release();
                        //3  表示数据库连接异常
                        callback(3);
                    }else{
                        callback(result)
                    }
                });
            })
        })
    },
    //菜品详情页获取某一个菜品信息
    getOneDish:function (user,callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(usesql.getOneDish,[user.dish_id],function (error,result) {
                    // console.log(user.dish_id);
                    // console.log(result);
                    if(error){
                        client.release();
                        //3  表示数据库连接异常
                        callback(3);
                    }else{
                        // console.log(result);
                        callback(result);
                        // callback({head_photo:result[0].head_photo,status:1});
                    }
                });
            })
        })
    },


    //菜品详情页获取某一个菜品的步骤信息
    getOneDishStep:function (user,callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(usesql.getOneDishStep,[user.dish_id],function (error,result) {
                    // console.log(user.dish_id);
                    // console.log(result);
                    if(error){
                        client.release();
                        //3  表示数据库连接异常
                        callback(3);
                    }else{
                        // console.log(result);
                        callback(result);
                        // callback({head_photo:result[0].head_photo,status:1});
                    }
                });
            })
        })
    },

    //发表菜谱页面上传主料
    addMain_ing:function (user,callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                // for(var i =0; i<user.length;i++){
                    client.query(usesql.addMain_ing,[user.dish_id,user.main_name,user.main_count],function (error,result) {
                        if(error){
                            client.release();
                            //3  表示数据库连接异常
                            callback(3);
                        }else{
                            // console.log(result);
                            callback(result);
                            // callback({head_photo:result[0].head_photo,status:1});
                        }
                    });
                // }
            })
        })
    },
    //发表菜谱页面上传辅料
    addSecond_ing:function (user,callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                // for(var i =0; i<user.length;i++){
                    client.query(usesql.addSecond_ing,[user.dish_id,user.second_count,user.second_name],function (error,result) {
                        if(error){
                            client.release();
                            //3  表示数据库连接异常
                            callback(3);
                        }else{
                            // console.log(result);
                            callback(result);
                            // callback({head_photo:result[0].head_photo,status:1});
                        }
                    });
                // }
            })
        })
    },
    //发表菜谱页面获取发表菜谱信息
    getAddDish:function (user,callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(usesql.getAddDish,[user.user_id,user.dish_name],function (error,result) {
                    if(error){
                        client.release();
                        //3  表示数据库连接异常
                        callback(3);
                    }else{
                        callback(result)
                    }
                });
            })
        })
    },
    //判断是否点赞
    getIFThumb: function (user, callback) {
        dom01.on('error', function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(usesql.getIFThumb, [user.user_id,user.dish_id], function (error, result) {
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
    //增加菜品点赞数
    addDishClick:function (user,callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(usesql.addDishClick,[user.user_id,user.dish_id],function (error,result) {
                    console.log(result)
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
    //删除菜品点赞
    deleteDishClick:function (user,callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(usesql.deleteDishClick,[user.user_id,user.dish_id],function (error,result) {
                    console.log(result)
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
    //增加菜品评论数
    addDishComment:function (user,callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {

            var myDate = new Date();
            var comment_time=myDate.toLocaleString();
            getClient(function (client) {
                client.query(usesql.addDishComment,[user.user_id,user.dish_id,user.comment_content,comment_time],function (error,result) {
                    console.log(result);
                    if(error){
                        client.release();
                        //3  表示数据库连接异常
                        callback(3);
                    }else{
                        console.log(result);
                        callback(result)
                    }
                });
            })
        })
    },

    //判断是否收藏
    getIFCollect: function (user, callback) {
        dom01.on('error', function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(usesql.getIFCollect, [user.user_id,user.dish_id], function (error, result) {
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
    //增加菜谱收藏
    addDishCollect:function (user,callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                var currentTime=new Date();
                var collectTime=currentTime.toLocaleString();
                client.query(usesql.addDishCollect,[user.user_id,user.dish_id,collectTime],function (error,result) {
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
    //删除菜谱收藏
    deleteDishCollect:function (user,callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(usesql.deleteDishCollect,[user.dish_id,user.user_id],function (error,result) {
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
    //菜品详情页获取菜的主料
    getMainIng:function (user,callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(usesql.getMainIng,[user.dish_id],function (error,result) {
                    console.log(result)
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
    //菜品详情页获取菜的辅料
    getSecondIng:function (user,callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(usesql.getSecondIng,[user.dish_id],function (error,result) {
                    console.log(result)
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
    //获取某一菜品的评论
    getOneDishComment:function (user,callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(usesql.getOneDishComment,[user.dish_id],function (error,result) {
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

    //个人中心获取个人收藏菜谱信息
    getMyCollectDish:function (user,callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        // console.log(11)
        dom01.run(function () {
            getClient(function (client) {
                client.query(usesql.getMyCollectDish,[user.user_id],function (error,result) {
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

    //个人中心获取个人发表菜谱信息
    getMyAddDish:function (user,callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        // console.log(11);
        dom01.run(function () {
            getClient(function (client) {
                client.query(usesql.getMyAddDish,[user.user_id],function (error,result) {
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

    //上传用户头像
    // upload_dish_pic: function (dish_photo, user_id, callback) {
    //     dom01.on('error', function (err) {
    //         console.log(err.message);
    //         callback(4);
    //         //4  表示数据库连接错误
    //     });
    //     dom01.run(function () {
    //
    //         var myDate = new Date();
    //         var publish_time=myDate.toLocaleString();
    //         getClient(function (client) {
    //             client.query(usesql.upload_dish_pic, ['1', user_id,'1','炒酸奶',dish_photo,'10','10','10','我爱我家',publish_time,'6'], function (error, result) {
    //                 if (error) {
    //                     console.log(error.message);
    //                     client.release();
    //                     //4表示数据库连接错误
    //                     callback(4);
    //                 }
    //                 callback(result);
    //                 client.release();
    //             });
    //         })
    //     })
    // },


    //上传菜品成品图
    upload_dish_pic: function (data, name, callback) {
        // console.log(name);
        dom01.on('error', function (error) {
            console.log(error.message);
        });
        dom01.run(function () {
            var myDate = new Date();
            var publish_time=myDate.toLocaleString();
            getClient(function (client) {
                    client.query(usesql.upload_dish_pic, [data.menu_type_id, data.user_id,1,data.dish_name,name,data.dish_time,data.ready_time,data.p_count,data.story,publish_time,data.right_month,1,1,1], function (error, result) {
                        if (error) {
                        client.release();
                        callback(3);
                    }
                    client.release();
                    callback(JSON.stringify(result));
                })
            })
        })
    },

    //上传菜品步骤图
    upload_dish_step_pic: function (data, name, callback) {
        // console.log(name);
        dom01.on('error', function (error) {
            console.log(error.message);
        });
        dom01.run(function () {
            var myDate = new Date();
            var publish_time=myDate.toLocaleString();
            getClient(function (client) {
                // console.log(data);
                client.query(usesql.upload_dish_step_pic, [data.dish_id,name,data.step_content], function (error, result) {
                       // console.log(name);
                        if (error) {
                        client.release();
                        callback(3);
                    }
                    client.release();
                    callback(JSON.stringify(result));
                })
            })
        })
    }

};

module.exports=user;

