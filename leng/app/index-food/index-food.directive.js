
angular.module('indexFood').
directive('indexPage',function () {
    return {
        restrict : "ACE",
        replace:true,
        templateUrl : 'index-food/index-food.template.html',
        controller:['$scope','$http','$rootScope',function ($scope,$http,$rootScope) {

            //轮播图
            $(function(){
                $("#slider_show").carousel({
                    interval:2000
                });
                $("#slider_show a.left").click(function(){
                    $(".carousel").carousel("prev");
                });
                $("#slider_show a.right").click(function(){
                    $(".carousel").carousel("next");
                });
            });

            $scope.fv_type=['水果','蔬菜'];
            $scope.conditions={
                _fv_type:0,
                _search:''
            };
            $scope.name ='4';
            $http.get('http://localhost:3009/dish-food/getMonthDish/?right_month='+ $scope.name)
                .then(function successCallback(response) {
                    $scope.parts_dish_month=response.data.result;
                    console.log(response.data.result);
                    $scope.parts_month_dish=($scope.parts_dish_month).slice(0,8);
                });
            $http.get('http://localhost:3009/fv-food/getOneFvFood')
                .then(function successCallback(response) {
                    $scope.parts_fv=response.data.result;
                    $scope.newfv_type=($scope.parts_fv).slice(0,6);

                });
            $http.get('http://localhost:3009/dish-food/getNewDish')
                .then(function successCallback(response) {
                    $scope.parts_new_dish=response.data.result;
                    // console.log(response.data.result);
                });
            $scope.dish_details = function (index) {
                sessionStorage.setItem('dish_id',index);
            };
            $scope.fv_details = function (index) {
                sessionStorage.setItem('fv_id',index);
            };
            $scope.topic_details = function (index) {
                sessionStorage.setItem('topic_id',index);
            };
            $scope.topic_name_details = function (index) {
                sessionStorage.setItem('topic_id',index);
            };


            $scope.column='publish_time';
            $scope.desc=true;
//按食材类型进行过滤

            $scope.xfv_type=function (t) {
                $scope.conditions._fv_type=t;
                $scope.filterFV($scope.conditions);
            };
            $scope.filterFV=function (conditions) {
                console.log($scope.conditions._fv_type);
                //判断菜品类型
                $scope.newfv_type = [];
                if ($scope.conditions._fv_type != 0) {
                    for (var i = 0; i < $scope.parts_fv.length; i++) {
                        if ($scope.parts_fv[i].fv_type_id === $scope.conditions._fv_type) {
                            $scope.newfv_type.push($scope.parts_fv[i])
                        }
                    }

                } else {
                    $scope.newfv_type=($scope.parts_fv).slice(0,6);
                }
            };
//点击变成活动状态
            $(document).on('click', '#fv div', function () {
                $(this).addClass('fv_div_type1').siblings().removeClass('fv_div_type1');
            });
            $(document).on('click', '#nh span', function () {
                $(this).addClass('nav-color').siblings().removeClass('nav-color');
            });


            //首页获取话题信息
            $http.get('http://localhost:3009/topic-food/getTopicFood')
                .then(function successCallback(response) {
                    $scope.topic_food=response.data.result;
                    $scope.topic_first_type=($scope.topic_food).slice(0,3);
                    $scope.topic_second_type=($scope.topic_food).slice(3,6);
                    $scope.topic_third_type=($scope.topic_food).slice(6,9);
                    $scope.topic_four_type=($scope.topic_food).slice(9,12);
                });
        }]
    }
});