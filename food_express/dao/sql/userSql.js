/**
 * Created by lzhan on 2017/4/21.
 */
var sql={
    getUserById1:'select user_phone_number,user_sname,sex,birthday,province,city,sign,head_photo,regist_time   from user where user_phone_number=?',
    addUser1:'insert into user(user_phone_number,password,head_photo,user_sname,regist_time) values(?,?,?,?,?);',
    getUserPassword1:'select password,head_photo,user_id,user_sname from user where user_phone_number=?;',
    //修改用户头像
    upLoadIcon1:'update user set head_photo=? where user_phone_number=?',
    //获取用户头像
    getUserIcon1:'select head_photo,user_sname from user where user_phone_number=?',
    //菜品详情页获取当前菜品作者的信息
    getAuthorInfo:'select head_photo,user_sname,user_id from view_dish where dish_id=?',
    //菜品详情页获取当前菜品作者发表菜谱数量
    getAuthorDishCount:'select dish_count,focus_count from user where user_id=?;',
    //菜品详情页获取当前菜品作者的粉丝数
    getAuthorFansCount:'SELECT COUNT(*) FROM attention WHERE suser_id=?;',
    //菜品详情页关注菜品作者
    focusDishAuthor:'insert into attention(user_id,suser_id,attention_time) values(?,?,?);',
    //菜品详情页取消关注菜品作者
    deleteFocusDishAuthor:'delete from attention where user_id=? AND suser_id=?;',
    //判断是否已经关注菜品作者
    getIFFocus:'select * from attention where user_id=? and suser_id=?;',
    //达人页面获取达人信息
    getMasterUser:'select * from user order by dish_count desc;',
    //达人页面获取评论较高的菜品信息
    getByComment:'select * from view_dish order by dish_comment desc;',

    getUserInfo:'select * from user where user_phone_number=?',
    //菜品详情页获取当前用户的信息
    getOneUserInfo:'select * from user where user_id=?',
    setUserInfo:'update user set user_sname=?,sex=?,birthday=?,province=?,city=?,sign=? where user_phone_number=?',
    getUserPassword:'select password from user where user_phone_number=? ',
    updatePassword:'update user set password=? where user_phone_number=?',
    getUid:'SELECT user_id from user where user_phone_number =?'
}

module.exports=sql;