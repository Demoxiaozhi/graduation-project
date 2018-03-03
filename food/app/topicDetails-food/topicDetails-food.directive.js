/**
 * Created by Administrator on 2017/4/25 0025.
 */
angular.module('topicDetailsFood').
directive('topicDetailsPage',function () {
    return {
        restrict : "ACE",
        replace:true,
        templateUrl : 'topicDetails-food/topicDetails-food.template.html',
        controller:['$scope','$http','serverURL','$rootScope','$state','getPerActMesFactory',function ($scope,$http,serverURL,$rootScope, $state,getPerActMesFactory) {

            var topic_id=sessionStorage.getItem('topic_id');
            //登录后判断是否收藏和点赞
            if (sessionStorage.getItem('state')!==null){
                var user_id=JSON.parse(sessionStorage.getItem('state'))[3];
                getPerActMesFactory.getIFTopicThumb({user_id: user_id, topic_id: topic_id});
                getPerActMesFactory.getIFTopicCollect({user_id: user_id, topic_id: topic_id});
            }
                // $scope.imgUrl = serverURL + 'upload_topic_pics/';
                //获取数据
                $http({
                    method: 'POST',
                    data: {topic_id: topic_id},
                    url: serverURL + 'topic-food/getTopicTxt',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (obj) {
                        var str = [];
                        for (var s in obj) {
                            str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                        }
                        return str.join("&");
                    }
                }).then(function (response) {
                    $scope.topic_id = topic_id;
                    $scope.user_sname = response.data.res.user_sname;
                    $scope.topic_name = response.data.res.topic_name;
                    $scope.topic_publish_time = response.data.res.topic_publish_time;
                    $scope.topic_content = response.data.res.topic_content;
                    $scope.topic_div = response.data.res.topic_div;
                    // $scope.head_photo = serverURL + 'uploads/' + response.data.res.head_photo;
                    $scope.head_photo = response.data.res.head_photo;
                    //获取图片列表
                    $http({
                        method: 'get',
                        params: {topic_id: topic_id},
                        url: serverURL + 'topic-food/getTopicPic'
                    }).then(function (_res) {
                        $scope.topic_pics = _res.data.res;
                        $scope.topic_photo = $scope.topic_pics[0].topic_photo;
                        $scope.topic_photo = $scope.topic_photo.split(',');
                        var b = /<img [^>]+src=\"([^\"]*?)\">/gi;   //正则表达式获取ser里面的内容
                        var s = $scope.topic_div.match(b);    //通过正则表达式取出里面内容
                        var c = RegExp.$1;     //RegExp.$1为src（）里面
                        $scope.topichtml = '';
                        $scope.topichtml = $scope.topic_div;
                        for (var i = 0; i < s.length; i++) {
                            $scope.topichtml = $scope.topichtml.replace(s[i], '<img class="img-responsive ng-scope" src="' + serverURL + 'upload_topic_pics/' + $scope.topic_photo[i] + '">');
                        }
                    });
                });




            //话题详情页获取当前登录用户的信息
            $http.get('http://localhost:3009/users/getOneUserInfo/?user_id='+ user_id)
                .then(function successCallback(response) {
                    $scope.topicDetails_user_info = response.data.result;
                    $scope.topicDetails_user_headphoto = response.data.result[0].head_photo;
                });
            //话题详情页获取某一话题的评论
            $http.get('http://localhost:3009/topic-food/getOneTopicComment/?topic_id='+ topic_id)
                .then(function successCallback(response) {
                    $scope.topicDetails_topic_comment = response.data.result;
                    $scope.topicDetails_topic_comment_time = response.data.result[0].comment_time;
                });
            //话题详情页添加某一话题的评论
            $scope.addOneTopicComment=function () {
                if (sessionStorage.getItem('state') == null) {
                    $state.go('login');
                }else{
                    $http.get('http://localhost:3009/topic-food/addTopicComment/?user_id='+ user_id+'&topic_id='+topic_id+'&comment_content='+$scope.OneTopicComment)
                        .then(function successCallback(response) {
                            $scope.topicComment = response.data.result;

                            if (sessionStorage.getItem('state')!==null){
                                var head_photo=JSON.parse(sessionStorage.getItem('state'))[2];
                                var user_sname=JSON.parse(sessionStorage.getItem('state'))[4];
                            }
                            var myDate = new Date();
                            var commentTime=myDate.toLocaleString();
                            var oneComment={
                                user_sname:user_sname,
                                head_photo:head_photo,
                                comment_content:$scope.OneTopicComment,
                                comment_time:commentTime
                            };
                            $scope.topicDetails_topic_comment.splice(0,0,oneComment);
                        })
                }
            }

        }]
    }
}).filter('toDate', function () {
        return function (input) {
            return new Date(input);
        }
    });