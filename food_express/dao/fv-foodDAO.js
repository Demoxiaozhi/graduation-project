/**
 * Created by xz197 on 2017/5/1.
 */
var getClient=require('./../util/DBHelper');
var domain=require('domain');
var usesql=require('./sql/fv-foodSql');


var dom01=domain.create();
var user={
    getFvFood:function (user,callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        // console.log(11);
        dom01.run(function () {
            getClient(function (client) {
                client.query(usesql.getFvFood,[user.fv_id],function (error,result) {
                    // console.log(user.fv_id);
                    // console.log(result)
                    if(error){
                        client.release();
                        //3  表示数据库连接异常
                        callback(3);
                    }else{
                        // console.log(result);
                        callback(result)
                        // callback({head_photo:result[0].head_photo,status:1});
                    }
                });
            })
        })
    },
    getOneFvFood:function (user,callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        // console.log(11);
        dom01.run(function () {
            getClient(function (client) {
                client.query(usesql.getOneFvFood,[user.fv_id],function (error,result) {
                    // console.log(user.fv_id);
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
};

module.exports=user;