angular.module('userFood')
    .service('loginService', ['$scope', '$http', '$state', '$rootScope', 'serverUrl', function ($scope, $http, $state, $rootScope, serverUrl) {
    }])

    //登录部分
    .factory('loginService2', ['$http', '$state', '$rootScope', 'serverURL', function ($http, $state, $rootScope, serverURL) {
        return {
            logins: function (data, callback) {
                // console.log(data);
                //后台验证
                $http.get(serverURL + 'users/login/?user_phone_number=' + data.name + '&password=' + data.password)
                    .then(function successCallback(response) {
                        // 请求成功执行代码
                        // console.log(response.data.result);
                        console.log(response);
                        //登录成功
                        if (response.data.result == 3) {
                            document.querySelector('#text-login-name').innerText = "登录失败";

                            //密码错误
                        } else if (response.data.result == 2) {
                            document.querySelector('#text-login-password').innerText = "密码错误";
                            // $rootScope.passwordWarning = "密码错误";
                            //用户名不存在
                        } else if (response.data.result == 0) {
                            document.querySelector('#text-login-name').innerText = "用户名不存在";
                        } else {
                            $rootScope.isLogin = true;
                            $rootScope.userId = data.name;
                            $rootScope.password = data.password;
                            $rootScope.user_sname = response.data.result[0].user_sname;
                            $rootScope.user_id = response.data.result[0].user_id;
                            $rootScope.uicon = response.data.result[0].head_photo;
                            // console.log(response.data.result[0].head_photo)
                            // console.log('124343434')
                            // console.log($rootScope.userId);
                            var result = [data.name, data.password, response.data.result[0].head_photo, response.data.result[0].user_id,response.data.result[0].user_sname];
                            // console.log(result)
                            sessionStorage.setItem("state", JSON.stringify(result));
                            // console.log(JSON.stringify(response.data.result));
                            $state.go('index');
                        }
                    }, function errorCallback(response) {
                        // 请求失败执行代码
                    })
            }
        }

    }])
    //退出登录
    .factory('loginOut', ['$rootScope', '$state', function ($rootScope, $state) {
        return {
            logOut: function () {
                $rootScope.isLogin = false;
                sessionStorage.removeItem("state");
                $state.go('index');
            }
        }
    }])

    //注册部分
    .factory('registService', ['$http', '$state', '$rootScope', 'serverURL', function ($http, $state, $rootScope, serverURL) {
        return {
            regists: function (data, callback) {
                console.log(data);
                //后台验证
                $http.get(serverURL + 'users/regist/?user_phone_number=' + data.name + '&password=' + data.password)
                    .then(function successCallback(response) {
                        // 请求成功执行代码
                        console.log(response.data.result);
                        var res = response.data.result;
                        if (response.data.result.uIcon == 'photo-old.png') {
                            $rootScope.isLogin = true;
                            $rootScope.userId = data.name;
                            $rootScope.password = data.password;
                            $rootScope.uicon = response.data.result.uIcon;
                            $rootScope.user_sname = response.data.result.user_sname;
                            var result = [data.name, data.password, response.data.result.uIcon, response.data.result.uId, response.data.result.user_sname];
                            sessionStorage.setItem("state", JSON.stringify(result));
                            $state.go('index');
                            if (callback) callback();
                        } else if (response.data.result == 2) {
                            document.querySelector('#text-tegist-rname').innerText = "用户名已存在";
                        } else if (response.data.result == 3 || response.data.result == 0) {
                            // $scope.rnameWarning="注册失败";
                            document.querySelector('#text-tegist-rname').innerText = "注册失败";
                        }
                    }, function errorCallback(response) {
                        // 请求失败执行代码
                    });
            }
        }
    }])