/**
 * Created by xz197 on 2017/5/1.
 */
var sql={
    getFvFood:'select fv_photo,fv_name,fv_sname,right_person,no_person,fv_effect   from fv where fv_id=?',//获取某一样果蔬信息
    getOneFvFood:'select*from fv;'
};

module.exports=sql;