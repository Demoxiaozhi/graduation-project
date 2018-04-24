angular.module('messageChooseFood').directive('messageChoosePage', function () {
    return {
        restrict: "ACE",
        replace: true,
        templateUrl: 'messageChoose-food/messageChoose-food.template.html',
        controller: function ($scope, $http, $state, $rootScope, serverURL, iconFoodService, iconFoodFactory, Upload) {
            //请求头像
            uicon = JSON.parse(sessionStorage.getItem('state'))[2];
            $scope.data = {
                defaultImage: 'http://localhost:3009/uploads/' + uicon
            };
            //上传头像
            $scope.upload = function () {
                // console.log(JSON.parse(sessionStorage.getItem('state')))
                var url = 'http://localhost:3009/users/upload';  //params是model传的参数，图片上传接口的url
                var data = angular.copy({user_phone_number: $rootScope.userId} || {}); // 接口需要的额外参数，比如指定所上传的图片属于哪个用户: { UserId: 78 }
                // console.log($scope.userIcon);
                data.file = $scope.data.file;
                // console.log(data);
                Upload.upload({
                    url: url,
                    data: data
                }).success(function (data) {
                    $scope.isCropShow = false;
                    $('#myModal').modal('show');
                    // 再次从数据库拿头像，更新头像
                    $http.get('http://localhost:3009/users/getUserIcon/?user_phone_number=' + $rootScope.userId)
                        .then(function successCallback(response) {
                            // 请求成功执行代码
                            $scope.photo=response.data.result[0].head_photo;
                            // console.log(response.data.result[0].head_photo);
                            // console.log($scope.photo);
                            // console.log($rootScope.password);
                            // console.log($rootScope.user_sname);
                            // console.log($rootScope.user_id);
                            var result=[$rootScope.userId,$rootScope.password,$scope.photo,$rootScope.user_id,$rootScope.user_sname];
                            sessionStorage.setItem("state", JSON.stringify(result));
                           }, function errorCallback(response) {
                            // 请求失败执行代码
                        })
                }).error(function (err) {
                    console.log('error');
                });
            };
            //省市二级联动数据来源
            var cities = [
                {
                    name: 'henan',
                    value: '河南',
                    options: [{name: 'zhengzhou', value: '郑州'}, {name: 'kaifeng', value: '开封'}, {
                        name: 'luoyang',
                        value: '洛阳'
                    }]
                },
                {
                    name: 'jiangsu',
                    value: '江苏',
                    options: [{name: 'suzhou', value: '苏州'}, {name: 'nanjing', value: '南京'}, {
                        name: 'changzhou',
                        value: '常州'
                    }]
                }
            ];
            $(function () {
                //从后台获取用户信息
                $.get('http://localhost:3009/users/userinfo/?user_phone_number=' + $rootScope.userId, function (data, status) {
                    // alert("Data: " + data + "\nStatus: " + status);
                    // console.log(data.user_id.province);
                    if (status == "fail") {
                        console.log("获取个人信息失败")
                    } else {
                        //在页面展示个人信息
                        var db_province = data.user_id.province;
                        var db_city = data.user_id.city;
                        $('#local_province').find('option[value=' + db_province + ']').attr('selected', true);
                        $('#local_province').change();
                        $('#local_city').find('option[value=' + db_city + ']').attr('selected', true);
                        $('#text').val(data.user_id.user_sname);
                        $('#sign').val(data.user_id.sign);
                        $('#sex').find('option[value=' + data.user_id.sex + ']').attr('selected', true);
                        var birthday = data.user_id.birthday.split('T')[0];
                        // console.log(birthday);
                        var year = birthday.split('-')[0];
                        var month = birthday.split('-')[1];
                        var day = parseInt(birthday.split('-')[2]) + 1;
                        // console.log(year, month, day);
                        $('#year').find('option[value=' + year + ']').attr('selected', true);
                        $('#month').find('option[value=' + month + ']').attr('selected', true);
                        $('#day').find('option[value=' + day + ']').attr('selected', true);
                    }
                });

                function show_province() {
                    var provinces = '<option>请选择</option>';
                    for (var i in cities) {
                        provinces += '<option value="' + cities[i].name + '">' + cities[i].value + '</option>'
                    }
                    $('#local_province').html(provinces);
                }

                show_province();

                $('#local_province').change(function () {
                    var selected_value = $(this).find('option:selected').val();
                    var city_options = [];
                    for (var i in cities) {
                        if (cities[i].name == selected_value) {
                            city_options = cities[i].options;
                            break;
                        }
                    }
                    var htmls = '<option>请选择</option>';
                    for (var i in city_options) {
                        htmls += '<option value="' + city_options[i].name + '">' + city_options[i].value + '</option>';
                    }
                    $('#local_city').html(htmls);
                });

                //修改用户信息并提交

                $("button").click(function () {
                    $.post("http://localhost:3009/users/userinfo",
                        {
                            user_sname: $('#text').val(),
                            sign: $('#sign').val(),
                            sex: $('#sex option:selected').val(),
                            province: $('#local_province option:selected').val(),
                            city: $('#local_city option:selected').val(),
                            birthday: $('#year option:selected').val() + '-' + $('#month option:selected').val() + '-' + $('#day option:selected').val(),
                            user_phone_number: $rootScope.userId

                        },
                        function (data, status) {
                            // console.log(data)
                            $('#myModal').modal('show');
                            // alert("Data: " + data + "\nStatus: " + status);
                        });
                });

            })
//修改密码
            $scope.updatePasswordBtn = function (old_pass,n_pass,rnew_pass) {
                // console.log(old_pass.length);
                if(old_pass==''||n_pass==''||rnew_pass==''){
                    $scope.warningPass='输入框不能为空';
                }else if(old_pass.length<8||old_pass.length>16||n_pass.length<8||n_pass.length>16||rnew_pass.length<8||rnew_pass.length>16){
                    $scope.warningPass='输入的密码不合法,需8-16位'
                }else if(n_pass!=rnew_pass){
                    $scope.warningPass='请再次确认新密码'
                }else{
                    $http.get('http://localhost:3009/users/updatePass/?user_phone_number=' + $rootScope.userId + '&password=' + old_pass + '&newPassword=' + n_pass)
                            .then(function successCallback(response) {
                                // 请求成功执行代码
                                // console.log(response.data.result);
                                if(response.data.result==1){
                                    $scope.warningPass='';
                                    $('#myModal').modal('show');
                                }else if(response.data.result==2){
                                    $scope.warningPass='原密码错误'
                                }else{
                                    $scope.warningPass='密码修改失败'
                                }}, function errorCallback(response) {
                                    // 请求失败执行代码
                            })
                }
            }


        }
    }
});