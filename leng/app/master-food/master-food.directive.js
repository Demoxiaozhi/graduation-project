angular.module('masterFood').
directive('masterPage',function () {
    return {
        restrict : "ACE",
        replace:true,
        templateUrl : 'master-food/master-food.template.html',
        controller:['$scope','$http','serverURL','actCollectFactory',function ($scope,$http,serverURL,actCollectFactory) {


            //从sessionStorage中获取达人的id
            var suser_id = sessionStorage.getItem('suser_id');

            //达人详情页面获取达人的信息
            $http.get('http://localhost:3009/users/getOneUserInfo/?user_id='+ suser_id)
                .then(function successCallback(response) {
                    console.log(response.data.result);
                    $scope.Master_one_user=response.data.result;
                    $scope.Master_focus_count = response.data.result[0].focus_count;
                    $scope.Master_head_photo = response.data.result[0].head_photo;
                    $scope.Master_dish_count = response.data.result[0].dish_count;
                });

            //达人详情页面获取达人粉丝数量
            $http.get('http://localhost:3009/users/getAuthorFansCount/?user_id='+ suser_id)
                .then(function successCallback(response) {
                    $scope.Master_fans_count = response.data.result[0]['COUNT(*)'];
                });

            $('#dynamic').siblings().hide();
            $('#dynamic').show();
            $scope.Content='暂时还没有内容哦~先去关注些小伙伴们吧~';

            //获取发表菜谱信息
            $scope.showMasterDish = function () {
                $http.get('http://localhost:3009/dish-food/getMyAddDish/?user_id=' + suser_id)
                    .then(function successCallback(response) {
                        // console.log(response.data.result);
                        $scope.my_dish = response.data.result;
                        $scope.Master_content1 = $scope.my_dish;
                        // console.log($scope.Master_content1);
                        $scope.checkFlag=1;
                        if($scope.Master_content1.length===0){
                            $("#content-dish0").siblings().hide();
                            $("#content-dish0").show();
                            $scope.warn1="您暂时还没有发布菜谱，赶快去发布吧！"
                        }else{
                            $scope.search='';
                            $("#content-dish").siblings().hide();
                            $("#content-dish").show();
                            $scope.dish_length = $scope.my_dish.length;
                            $scope.column1 = 'publish_time';
                            $scope.desc = true;
                            //分页
                            $scope.page_col_count = 2;
                            $scope.pageIndex = 1;
                            $scope.col_count = $scope.Master_content1.length;
                            $scope.page_count = Math.ceil($scope.col_count / $scope.page_col_count);

                            $scope.page_count_arr = [];
                            for (var i = 0; i < $scope.page_count; i++) {
                                $scope.page_count_arr.push(i + 1);
                            }
                            $scope.change=function (i) {
                                $scope.pageIndex=i;
                            };
                        }

                    });
            };

            //获取发表话题信息
            $scope.showMasterTopic = function () {
                $http.get('http://localhost:3009/topic-food/getMyAddTopic/?user_id=' + suser_id)
                    .then(function successCallback(response) {
                        console.log(response.data.result);
                        $scope.my_topic = response.data.result;
                        $scope.Master_content2 = $scope.my_topic;
                        $scope.checkFlag=2;
                        if($scope.Master_content2.length===0){
                            $("#content-topic0").siblings().hide();
                            $("#content-topic0").show();
                            $scope.warn2="您暂时还没有发布话题，赶快去发布吧！"
                        }else{
                            $scope.topic_length = $scope.my_topic.length;
                            $scope.search='';
                            $("#content-topic").siblings().hide();
                            $("#content-topic").show();
                            $scope.column2='topic_publish_time';
                            $scope.desc=true;
                            //分页
                            $scope.page_col_count = 4;
                            $scope.pageIndex = 1;
                            $scope.col_count = $scope.Master_content2.length;
                            $scope.page_count = Math.ceil($scope.col_count / $scope.page_col_count);

                            $scope.page_count_arr = [];
                            for (var i = 0; i < $scope.page_count; i++) {
                                $scope.page_count_arr.push(i + 1);
                            }
                            $scope.change=function (i) {
                                $scope.pageIndex=i;
                            };
                        }

                    })
            };


            //跳转到菜谱详情页前将菜品id存到sessionStorage中
            $scope.dish_details = function (index) {
                sessionStorage.setItem('dish_id',index);
            };
            //跳转到话题详情页前将话题id存到sessionStorage中
            $scope.topic_detail = function (index) {
                sessionStorage.setItem('topic_id',index);
            };
        }]
    }
}).filter('fenyeMaster',function () {
        return function(lists,start){     //两个参数 lists 是在 html 里你ng-repeat的原始数据：
            return lists.slice((start-1)*2,start*2);     //将原始数据按照 start 分割
        };
});