/**
 * Created by lzhan on 2017/4/19.
 */
var mysql = require('mysql');
var option = require('./../dbconfig');
var domain = require('domain');
var dom_sql = domain.create();
// dom_sql.on('error', function () {
//     console.log('sql error');
// });
//     function getClient(callback) {
//         dom_sql.run(function () {
//             var pool=mysql.createPool(option);
//             pool.connectionLimit=20;
//             pool.queueLimit=15;
//             pool.getConnection(function (error,client) {
//                callback(client);
//             })
//         });
//     }
function getClient(callback) {
  
        var pool=mysql.createPool(option);
        pool.connectionLimit=20;
        pool.queueLimit=15;
        pool.getConnection(function (error,client) {
            callback(client);
        })
}


module.exports=getClient;