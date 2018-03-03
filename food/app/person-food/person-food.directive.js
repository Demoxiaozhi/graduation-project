
angular.module('personFood').
directive('personPage',function () {
    return {
        restrict : "ACE",
        replace:true,
        templateUrl : 'person-food/person-food.template.html',
        controller:['$scope','$http','$rootScope','actFocusFactory',function ($scope,$http,$rootScope,actFocusFactory) {




            //达人页面获取达人信息
            $http.get('http://localhost:3009/users/getMasterUser')
                .then(function successCallback(response) {
                    $scope.Master_user = response.data.result;
                    $scope.User_Master =$scope.Master_user.slice(0,7);
                });

            $scope.Master = function (index) {
                sessionStorage.setItem('suser_id',index);
            };

            $scope.dish_master = function (index) {
                sessionStorage.setItem('dish_id',index);
            };

            $scope.topic_master = function (index) {
                sessionStorage.setItem('topic_id',index);
            };

            //达人页面获取评论较高的菜品信息
            $http.get('http://localhost:3009/users/getByComment')
                .then(function successCallback(response) {
                    $scope.Master_dish = response.data.result;
                    $scope.Dish_Master_01 =$scope.Master_dish.slice(0,3);
                    $scope.Dish_Master_02 =$scope.Master_dish.slice(3,6);
                });

            //达人页面获取评论较高的话题信息
            $http.get('http://localhost:3009/topic-food/getByTopic')
                .then(function successCallback(response) {
                    $scope.Master_topic = response.data.result;
                    $scope.Dish_Master_topic_01 =$scope.Master_topic[0];
                    $scope.Dish_Master_topic_02 =$scope.Master_topic[1];
                    $scope.Dish_Master_topic_03 =$scope.Master_topic[2];
                    $scope.Dish_Master_topic_04 =$scope.Master_topic[3];
                });
        }]
    }
});
