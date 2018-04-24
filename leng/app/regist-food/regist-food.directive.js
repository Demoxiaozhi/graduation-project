
angular.module('registFood').
directive('registPage',function () {
    return {
        restrict : "ACE",
        replace:true,
        templateUrl : 'regist-food/regist-food.template.html',
        controller:function ($scope,$state,$rootScope,$http,serverURL,iconFoodFactory,registService) {

            $scope.name = "";
            $scope.rpassword = "";
            $scope.rspassword="";
            $scope.rnameWarning="用户名为个人手机号";
            $scope.rpasswordWarning="密码由8-16位的数字，字母，下划线组成";
            //用户名验证
            $scope.rcheckPhone=function () {
                var phone = $scope.name;
                if(!(/^1[34578]\d{9}$/.test(phone))){
                    $scope.rnameWarning="用户名不合法，请重新输入";
                    return false;
                }else{
                    $scope.rnameWarning="用户名已合法";
                    return true;
                }
            };
            //密码验证
            $scope.rcheckPassword=function () {
                var password=$scope.rpassword;
                if(!(/^([A-Za-z0-9]|[_]){8,16}$/.test(password))){
                    $scope.rpasswordWarning="密码不合法，请重新输入";
                    return false;
                }else{
                    $scope.rpasswordWarning="密码已合法";
                    return true;
                }
            };
            //确认密码验证
            $scope.checkPassword02=function () {
                if($scope.rpassword!=$scope.rspassword){
                    $scope.rspasswordWarning="请再次确认密码";
                    return false;
                }else{
                    $scope.rspasswordWarning="";
                    return true;
                }
            };
            $scope.regist = function () {
                if ($scope.rcheckPhone() && $scope.rcheckPassword() && $scope.checkPassword02() == true) {
                    registService.regists({name: $scope.name, password: $scope.rpassword});
                    // iconFoodFactory.getIcon({name:$scope.name});
                    console.log($rootScope.uicon);
                }
            };
            //后台验证
            // $scope.regist = function () {
            //     if ($scope.rcheckPhone() && $scope.rcheckPassword() && $scope.checkPassword02() == true) {
            //         $http.get(serverURL+'users/regist/?user_phone_number=' + $scope.name + '&password=' + $scope.rpassword)
            //             .then(function successCallback(response) {
            //                 // 请求成功执行代码
            //                 console.log(response.data.result);
            //                 if (response.data.result == 1) {
            //                     $rootScope.isLogin = true;
            //                     $rootScope.userId = $scope.name;
            //                     $state.go('index');
            //                 }else if(response.data.result==2){
            //                     $scope.rnameWarning="用户名已存在";
            //                 }else if(response.data.result==3 ||response.data.result==0){
            //                     $scope.rnameWarning="注册失败";
            //                 }
            //             }, function errorCallback(response) {
            //                 // 请求失败执行代码
            //             });
            //     }
            // };
        }
    }
});