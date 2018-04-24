angular.module('loginFood').directive('loginPage', function () {
    return {
        restrict: "ACE",
        replace: true,
        templateUrl: 'login-food/login-food.template.html',
        controller:  function ($scope, $state, $rootScope, $http, serverURL,iconFoodFactory, loginService2) {
            $scope.name = "";
            $scope.password = "";
            $scope.nameWarning = "用户名为个人手机号";
            $scope.passwordWarning = "输入8-16位的密码";
            //用户名验证
            $scope.checkPhone = function () {
                var phone = $scope.name;
                if (!(/^1[34578]\d{9}$/.test(phone))) {
                    $scope.nameWarning = "手机号码不合法，请重新输入";
                    return false;
                } else {
                    $scope.nameWarning = "手机号输入合法";
                    return true;
                }
            };
            //密码验证
            $scope.checkPassword = function () {
                var password = $scope.password;
                if (!(/^([A-Za-z0-9]|[_]){8,16}$/.test(password))) {
                    $scope.passwordWarning = "密码不合法，请重新输入";
                    return false;
                } else {
                    $scope.passwordWarning = "密码输入合法";
                    return true;
                }
            };

            $scope.login = function () {
                if ($scope.checkPhone() && $scope.checkPassword() == true) {
                    loginService2.logins({name: $scope.name, password: $scope.password});
                    // iconFoodFactory.getIcon({name:$scope.name});
                    console.log($rootScope.uicon);
                }
            }
        }
    }
});