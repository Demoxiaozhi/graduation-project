/**
 * Created by xz197 on 2017/4/25.
 */
function createFileName() {
    var date=new Date().valueOf();
    var ran=Math.random();

    var _name=ran.toString()+date;
    return _name;
}
exports.creatName=createFileName;