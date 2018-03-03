
angular.module('spaceFood').
directive('spacePage',function () {
    return {
        restrict : "ACE",
        replace:true,
        templateUrl : 'space-food/space-food.template.html',
        controller:['$scope','$http','serverURL','actCollectFactory',function ($scope,$http,serverURL,actCollectFactory) {
            //个人中心获取动态信息
            if (sessionStorage.getItem('state')!==null){
                //显示美食空间的个人头像
                $scope.space_uicon=JSON.parse(sessionStorage.getItem('state'))[2];
                $scope.space_image= serverURL+"uploads/"+$scope.space_uicon;

                var user_id=JSON.parse(sessionStorage.getItem('state'))[3];
                console.log(user_id);
            }
//花瓣中显示发布菜谱的数量
            $http.get('http://localhost:3009/dish-food/getMyAddDish/?user_id=' + user_id)
                .then(function successCallback(response) {
                    $scope.my_dish = response.data.result;
                    $scope.dish_length =$scope.my_dish.length;
                });
            $http.get('http://localhost:3009/topic-food/getMyAddTopic/?user_id=' + user_id)
                .then(function successCallback(response) {
                    $scope.my_topic = response.data.result;
                    $scope.topic_length = $scope.my_topic.length;
                   
                });
            $('#dynamic').siblings().hide();
            $('#dynamic').show();
            $scope.Content='暂时还没有内容哦~先去关注些小伙伴们吧~';

            //个人中心获取个人发表菜谱信息
            $scope.showMyDish = function () {
                $http.get('http://localhost:3009/dish-food/getMyAddDish/?user_id=' + user_id)
                    .then(function successCallback(response) {
                        $scope.my_dish = response.data.result;
                        $scope.Content1 = $scope.my_dish;
                        // console.log($scope.Content1);
                        $scope.checkFlag=1;
                        if($scope.Content1.length===0){
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
                            $scope.col_count = $scope.Content1.length;
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

            // //个人中心获取话题信息
            $scope.showMyTopic = function () {
                $http.get('http://localhost:3009/topic-food/getMyAddTopic/?user_id=' + user_id)
                    .then(function successCallback(response) {
                        // console.log(response.data.result);
                        $scope.my_topic = response.data.result;
                        $scope.Content2 = $scope.my_topic;
                        $scope.checkFlag=2;
                        if($scope.Content2.length===0){
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
                            $scope.col_count = $scope.Content2.length;
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

            //个人中心获取个人收藏菜谱信息
            $scope.showCollectDish = function () {
              $http.get('http://localhost:3009/dish-food/getMyCollectDish/?user_id=' + user_id)
                    .then(function successCallback(response) {
                        $scope.my_collect_dish = response.data.result;
                        $scope.Content3 = $scope.my_collect_dish;
                        $scope.checkFlag=3;
                        if($scope.Content3.length===0){
                            $("#content-collect-dish0").siblings().hide();
                            $("#content-collect-dish0").show();
                            $scope.warn3="暂时还没有收藏的菜谱，赶快去进行收藏吧~"
                        }else{
                            $("#content-collect-dish").siblings().hide();
                            $("#content-collect-dish").show();
                            $scope.column3='dish_collect_time';
                            $scope.desc=true;
                            // console.log($scope.Content3);
                            $scope.page_col_count = 2;
                            $scope.pageIndex = 1;
                            $scope.col_count = $scope.Content3.length;
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

            //个人中心获取个人收藏话题信息
            $scope.showCollectTopic = function () {
                $http.get('http://localhost:3009/topic-food/getMyCollectTopic/?user_id=' + user_id)
                    .then(function successCallback(response) {
                        $scope.my_collect_topic = response.data.result;
                        $scope.Content4=$scope.my_collect_topic;
                        $scope.checkFlag=4;
                        // console.log($scope.Content4.length);
                        if($scope.Content4.length==0){
                            $("#content-collect-topic0").siblings().hide();
                            $("#content-collect-topic0").show();
                            $scope.warn4="暂时还没有收藏的话题，赶快去进行收藏吧~";
                        }else{
                            $scope.topic_length = $scope.my_topic.length;
                            $scope.search='';
                            $("#content-collect-topic").siblings().hide();
                            $("#content-collect-topic").show();
                            $scope.column4='topic_collect_time';
                            $scope.desc=true;
                            //分页
                            $scope.page_col_count = 4;
                            $scope.pageIndex = 1;
                            $scope.col_count = $scope.Content4.length;
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
            //弹出模态框询问是否确认取消收藏
            $scope.showModal=function (dishId,dishName) {
                $scope.cancelDishId=dishId;
                $scope.warnDelet="确定要取消对"+dishName+"这道菜的收藏吗?";
                $('#myModals').modal('show');
            };
            //模态框进行选择取消或确认取消收藏
            $scope.cancelCollectDish=function (dishId) {
                var user_id=JSON.parse(sessionStorage.getItem('state'))[3];
                actCollectFactory.CollectDown({user_id: user_id,dish_id: dishId});
                $scope.showCollectDish();
            };
//搜索对应的菜谱或话题
$scope.searchDT=function () {
    //搜索我的菜谱
    if($scope.checkFlag==1){
        $("#content-dish").siblings().hide();
        $("#content-dish").show();
        $scope.Content1=[];
        for(var i=0;i< $scope.my_dish.length;i++){
            if($scope.my_dish[i].dish_name.indexOf($scope.search)!=-1){
                // console.log("here");
                $scope.Content1.push($scope.my_dish[i]);
            }
        }
        $scope.column1 = 'publish_time';
        $scope.desc = true;
        //分页
        $scope.page_col_count = 2;
        $scope.pageIndex = 1;
        $scope.col_count = $scope.Content1.length;
        $scope.page_count = Math.ceil($scope.col_count / $scope.page_col_count);

        $scope.page_count_arr = [];
        for (var i = 0; i < $scope.page_count; i++) {
            $scope.page_count_arr.push(i + 1);
        }
        $scope.change=function (i) {
            $scope.pageIndex=i;
        };
    }else if($scope.checkFlag==2){
        $("#content-topic").siblings().hide();
        $("#content-topic").show();
        $scope.Content2=[];
        // console.log($scope.my_topic);
        for(var i=0;i< $scope.my_topic.length;i++){
            if($scope.my_topic[i].topic_name.indexOf($scope.search)!=-1){
                // console.log("here");
                $scope.Content2.push($scope.my_topic[i]);
            }
        }
        $scope.column2='topic_publish_time';
        $scope.desc=true;
        //分页
        $scope.page_col_count = 4;
        $scope.pageIndex = 1;
        $scope.col_count = $scope.Content2.length;
        $scope.page_count = Math.ceil($scope.col_count / $scope.page_col_count);

        $scope.page_count_arr = [];
        for (var i = 0; i < $scope.page_count; i++) {
            $scope.page_count_arr.push(i + 1);
        }
        $scope.change=function (i) {
            $scope.pageIndex=i;
        };
        $scope.change=function (i) {
            $scope.pageIndex=i;
        };
    }

};











            // $(document).on('click', '#check li', function () {
            //     $(this).addClass('person-check').siblings().removeClass('person-check');
            // })
        }]
    }
})
.filter('fenye1',function () {
    return function(lists,start){     //两个参数 lists 是在 html 里你ng-repeat的原始数据：
        return lists.slice((start-1)*2,start*2);     //将原始数据按照 start 分割
    };

})