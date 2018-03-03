/**
 * Created by xz197 on 2017/5/2.
 */
var sql={


    //判断话题是否点赞
    getIFTopicThumb:'SELECT * FROM topic_click WHERE user_id=? AND topic_id=?;',
    //增加话题点赞数
    addTopicClick:'INSERT INTO topic_click(user_id,topic_id) VALUES(?,?);',
    //删除话题点赞数
    deleteTopicClick:'delete from topic_click where user_id=? and topic_id=?;',

    //判断是否收藏
    getIFTopicCollect:'SELECT * FROM topic_collect WHERE user_id=? AND topic_id=?;',
    //增加话题收藏
    addTopicCollect:'INSERT INTO topic_collect(user_id,topic_id,topic_collect_time) VALUES(?,?,?);',
    //删除话题收藏
    deleteTopicCollect:'delete from topic_collect where topic_id=? and user_id=?;',
    // getArtTxt: 'SELECT * from userdetail ,userbasic ,article where article.artID = ? and article.Uid = userbasic.Uid and article.Uid = userdetail.UDid',
    getTopicTxt: 'SELECT *FROM view_topic_user where topic_id=?;',
    getTopicPic:'SELECT * FROM topic_photo where topic_id=?;',

    //获取所有话题
    // getArt: 'SELECT * from topic_photo , topic ,user WHERE topic.topic_id = topic_photo.topic_id and topic.user_id = user.user_id ;',
    add_topic: 'insert into topic(user_id,topic_type_id,topic_name,topic_content,topic_publish_time,topic_div) values(?,?,?,?,?,?);',
    get_topic_id:'select topic_id from topic where user_id = ? and topic_publish_time = ?;',
    add_topic_photo:'insert into topic_photo (topic_id,topic_photo) VALUE(?,?);',
    add_topic_no: 'insert into topic(user_id,topic_type_id,topic_name,topic_content,topic_div,topic_publish_time) values(?,?,?,?,?,?);',
    //首页获取话题信息
    getTopicFood:'SELECT * FROM view_topic;',

    //话题展示页获取话题
    getTopicShow:'SELECT * FROM view_topic;',

    //个人中心获取个人发表话题信息
    getMyAddTopic:'SELECT * FROM view_topic WHERE user_id=?;',
    //个人中心获取个人收藏话题信息
    getMyCollectTopic:'SELECT * FROM view_topic_collect WHERE user_id=?;',
    //添加话题评论
    addTopicComment:'INSERT INTO topic_comment(user_id,topic_id,comment_content,comment_time) VALUES(?,?,?,?);',
    //话题详情页获取一个话题的评论
    getOneTopicComment:'SELECT user_sname,head_photo,comment_content,comment_time FROM view_topic_comment WHERE topic_id=? ORDER BY comment_time DESC;',
    //添加话题
    addTopic:'INSERT INTO topic(user_id,topic_type_id,topic_name,topic_content,topic_photo,topic_publish_time) VALUES(?,?,?,?,?,?);',
    //达人页面获取评论较高的菜品信息
    getByTopic:'select * from view_topic order by topic_comment desc;'
};

module.exports=sql;