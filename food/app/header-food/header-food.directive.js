
angular.module('headerFood').
    directive('headerPage',function () {
        return {
            restrict : "ACE",
            replace:true,
            templateUrl : 'header-food/header-food.template.html',
            controller:['$scope','$http','$rootScope',function ($scope,$http,$rootScope) {
                var loginstate=sessionStorage.getItem("state");
                // console.log(loginstate);
                if(loginstate!==null){
                    $rootScope.isLogin = true;
                    $rootScope.userId = JSON.parse(loginstate)[0];
                }
            }]
        }
});