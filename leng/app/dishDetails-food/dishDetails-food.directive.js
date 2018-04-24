angular.module('dishDetailsFood')
    .directive('dishDetailsPage',function () {
    return {
        restrict : "ACE",
        replace:true,
        templateUrl : 'dishDetails-food/dishDetails-food.template.html',
        controller:['$scope','$http','$rootScope','getPerActMesFactory','getFocusActFactory','$window',function ($scope,$http,$rootScope,getPerActMesFactory,getFocusActFactory,$window) {


            $scope.dish_tui_details = function (index) {
                sessionStorage.setItem('dish_id',index);
                $window.location.reload();
            };
            console.log('11111111111111111111');

            $scope.number=3;
            var dish_id=sessionStorage.getItem('dish_id');
            //登录后判断是否收藏和点赞
            if (sessionStorage.getItem('state')!==null){
                var user_id=JSON.parse(sessionStorage.getItem('state'))[3];
                getPerActMesFactory.getIFThumb({user_id: user_id, dish_id: dish_id});
                getPerActMesFactory.getIFCollect({user_id: user_id, dish_id: dish_id});
            }
            //登录后判断是否关注菜品作者
            if (sessionStorage.getItem('suser_id')!==null){
                var suser_id=sessionStorage.getItem('suser_id');
                getFocusActFactory.getIFFocus({user_id: user_id, suser_id: suser_id})
            }
            $http.get('http://localhost:3009/dish-food/getOneDish/?dish_id='+ dish_id)
                .then(function successCallback(response) {
                    // if (response.data.result.length == 1) {
                        $scope.dishDetails_dish = response.data.result;
                        $scope.dishDetails_dish_photo = response.data.result[0].dish_photo;
                    console.log(response.data.result[0].dish_photo);
                    $scope.dishDetails_story = response.data.result[0].story;
                        $scope.dishDetails_publish_time = response.data.result[0].publish_time;
                        $scope.dishDetails_right_month = response.data.result[0].right_month;
                        // $scope.dishDetails_dish_comment = response.data.result[0].dish_comment;
                        $scope.dishDetails_dish_click = response.data.result[0].dish_click;
                        $scope.dishDetails_dish_collect = response.data.result[0].dish_collect;
                        $scope.dishDetails_dish_name = response.data.result[0].dish_name;
                    // }
                });
            $http.get('http://localhost:3009/dish-food/getMainIng/?dish_id='+ dish_id)
                .then(function successCallback(response) {
                    $scope.dishDetails_main_ing = response.data.result;
                });
            $http.get('http://localhost:3009/dish-food/getSecondIng/?dish_id='+ dish_id)
                .then(function successCallback(response) {
                    $scope.dishDetails_second_ing = response.data.result;
                });
            $http.get('http://localhost:3009/dish-food/getOneDishStep/?dish_id='+ dish_id)
                .then(function successCallback(response) {
                    $scope.dish_step_one = response.data.result;
                });

            $scope.name ='4';
            $http.get('http://localhost:3009/dish-food/getMonthDish/?right_month='+ $scope.name)
                .then(function successCallback(response) {
                    $scope.parts_dish_tui=response.data.result;
                    $scope.parts_month_jian=($scope.parts_dish_tui).slice(1,6);
                });

            //点赞
            var a=0;
            $scope.dishClick=function () {
                if(a===0){
                    $scope.dishDetails_dish_click=parseInt($scope.dishDetails_dish_click)+1;
                    $http.get('http://localhost:3009/dish-food/addDishClick/?dish_id='+ dish_id)
                        .then(function successCallback(response) {
                            $scope.dishClickCount = response.data.result;
                        })
                }
                a++;
            };

            //收藏
            var b=0;
            $scope.dishCollect=function () {
                if(b===0){
                    $scope.dishDetails_dish_collect=parseInt($scope.dishDetails_dish_collect)+1;
                    $http.get('http://localhost:3009/dish-food/addDishCollect/?user_id='+user_id+'&dish_id='+dish_id)
                        .then(function successCallback(response) {
                            $scope.dishCollectCount = response.data.result;
                        })
                }
                b++;
            };
            //菜品详情页获取当前登录用户的信息
            $http.get('http://localhost:3009/users/getOneUserInfo/?user_id='+ user_id)
                .then(function successCallback(response) {
                    $scope.dishDetails_user_info = response.data.result;
                    $scope.dishDetails_user_headphoto = response.data.result[0].head_photo;
                });
            //菜品详情页获取某一菜品的评论
            $http.get('http://localhost:3009/dish-food/getOneDishComment/?dish_id='+ dish_id)
                .then(function successCallback(response) {
                    $scope.dishDetails_dish_comment = response.data.result;
                    $scope.dishDetails_dish_comment_time = response.data.result[0].comment_time;
                });
            //菜品详情页添加某一菜品的评论
            $scope.addOneDishComment=function () {
                    $http.get('http://localhost:3009/dish-food/addDishComment/?user_id='+ user_id+'&dish_id='+dish_id+'&comment_content='+$scope.OneDishComment)
                        .then(function successCallback(response) {
                            $scope.dishComment = response.data.result;

                            if (sessionStorage.getItem('state')!==null){
                                var head_photo=JSON.parse(sessionStorage.getItem('state'))[2];
                                var user_sname=JSON.parse(sessionStorage.getItem('state'))[4];
                            }
                            var myDate = new Date();
                            var commentTime=myDate.toLocaleString();
                            var oneComment={
                                user_sname:user_sname,
                                head_photo:head_photo,
                                comment_content:$scope.OneDishComment,
                                comment_time:commentTime
                            };
                            console.log(oneComment);
                            $scope.dishDetails_dish_comment.splice(0,0,oneComment);
                        })
            };
            //菜品详情页获取当前菜品作者的信息
            $http.get('http://localhost:3009/users/getAuthorInfo/?dish_id='+ dish_id)
                .then(function successCallback(response) {
                    $scope.dishDetails_author_info = response.data.result;
                    $scope.dishDetails_author_headphoto = response.data.result[0].head_photo;
                    $scope.dishDetails_author_user_sname = response.data.result[0].user_sname;
                    $scope.dishDetails_author_user_id = response.data.result[0].user_id;
                    sessionStorage.setItem('suser_id',$scope.dishDetails_author_user_id);

                    //菜品详情页获取当前菜品作者的发表菜谱数量
                    $http.get('http://localhost:3009/users/getAuthorDishCount/?user_id='+ $scope.dishDetails_author_user_id)
                        .then(function successCallback(response) {
                            $scope.dishDetails_author_dish_count = response.data.result[0].dish_count;
                            $scope.dishDetails_author_focus_count = response.data.result[0].focus_count;
                        });

                    //菜品详情页获取当前菜品作者的发表菜谱数量
                    $http.get('http://localhost:3009/users/getAuthorFansCount/?user_id='+ $scope.dishDetails_author_user_id)
                        .then(function successCallback(response) {
                            $scope.dishDetails_author_fans_count = response.data.result[0]['COUNT(*)'];
                        });

                });
        }]
    }
})
    .filter('toDate', function () {
        return function (input) {
            return new Date(input);
        }
    })
