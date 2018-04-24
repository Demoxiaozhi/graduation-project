/**
 * Created by xz197 on 2017/5/1.
 */
var sql={
    getDishFood:'SELECT * FROM view_dish;',
    getMonthDish:'SELECT * FROM view_dish WHERE right_month=?;',
    //首页显示最新菜谱
    getNewDish:'SELECT * FROM view_dish ORDER BY publish_time DESC;',
    //发表菜谱页面获取发表的菜谱的id
    getReleaseDish:'select dish_id from dish where user_id=? and dish_name=?;',
    //发表菜谱页面上传主料
    addMain_ing:'INSERT INTO main_ing(dish_id,main_name,main_count) VALUES(?,?,?);',
    //发表菜谱页面上传辅料
    addSecond_ing:'INSERT INTO second_ing(dish_id,second_count,second_name) VALUES(?,?,?);',
    //菜品详情页获取某一个菜品信息
    getOneDish:'SELECT dish_photo,dish_name,dish_time,ready_time,p_count,story,publish_time,right_month,dish_click,dish_collect   FROM dish WHERE dish_id=?;',
    //菜品详情页获取某一个菜品的步骤信息
    getOneDishStep:'SELECT step_photo,step_content   FROM step WHERE dish_id=?;',
    //发表菜谱页面获取发表菜谱信息
    getAddDish:'SELECT dish_id FROM dish WHERE user_id=? AND dish_name=?;',
    //判断是否点赞
    getIFThumb:'SELECT * FROM dish_click WHERE user_id=? AND dish_id=?;',
    //增加菜品点赞
    addDishClick:'INSERT INTO dish_click(user_id,dish_id) VALUES(?,?);',
    //取消菜品点赞
    deleteDishClick:'delete from dish_click where user_id=? and dish_id=?;',
    addDishComment:'INSERT INTO dish_comment(user_id,dish_id,comment_content,comment_time) VALUES(?,?,?,?);',
    //判断是否收藏
    getIFCollect:'SELECT * FROM dish_collect WHERE user_id=? AND dish_id=?;',
    //增加菜谱收藏
    addDishCollect:'INSERT INTO dish_collect(user_id,dish_id,dish_collect_time) VALUES(?,?,?);',
    //删除菜谱收藏
    deleteDishCollect:'delete from dish_collect where dish_id=? and user_id=?;',
    getMainIng:'SELECT main_name,main_count   FROM main_ing WHERE dish_id=?;',
    getSecondIng:'SELECT second_name,second_count   FROM second_ing WHERE dish_id=?;',
    getOneDishComment:'SELECT user_sname,head_photo,comment_content,comment_time FROM view_dish_comment WHERE dish_id=? ORDER BY comment_time DESC;',
    //个人中心获取个人收藏菜谱信息
    getMyCollectDish:'SELECT * FROM view_dish_collect WHERE user_id=?;',
    //个人中心获取个人发表菜谱信息
    getMyAddDish:'SELECT * FROM dish WHERE user_id=?;',
    //上传菜品成品图
    upload_dish_pic:'INSERT INTO dish(menu_type_id,user_id,eat_time,dish_name,dish_photo,dish_time,ready_time,p_count,story,publish_time,right_month,dish_click,dish_comment,dish_collect) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?);',
    //上传菜品步骤图
    upload_dish_step_pic:'INSERT INTO step(dish_id,step_photo,step_content) VALUES(?,?,?);'
};

module.exports=sql;