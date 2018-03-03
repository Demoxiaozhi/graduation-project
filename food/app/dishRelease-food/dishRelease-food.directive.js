
angular.module('dishReleaseFood').
directive('dishReleasePage',function () {
    return {
        restrict : "ACE",
        replace:true,
        templateUrl : 'dishRelease-food/dishRelease-food.template.html',
        controller:['$scope','$log','$http','$rootScope','Upload','serverURL',function ($scope,$log,$http,$rootScope,Upload,serverURL) {

            //主料（第二部分提交）
            $scope.main_ing = new Object();
            $scope.main_ing.contents = [{key: 0, value: ""}];
            // 初始化时由于只有1条新增主料，所以不允许删除
            $scope.main_ing.cansub_main_ing = false;
            // 增加主料
            $scope.main_ing.add_main_ing = function($index) {
                $scope.main_ing.contents.splice($index + 1, 0,
                    {key: new Date().getTime(), value: ""});   // 用时间戳作为每个item的key
                // 增加新的主料后允许删除
                $scope.main_ing.cansub_main_ing = true;
            };
            // 删除主料
            $scope.main_ing.sub_main_ing = function($index) {
                // 如果主料数大于1，删除被点击主料
                if ($scope.main_ing.contents.length > 1) {
                    $scope.main_ing.contents.splice($index, 1);
                }
                // 如果新增主料数为1，不允许删除
                if ($scope.main_ing.contents.length == 1) {
                    $scope.main_ing.cansub_main_ing = false;
                }
            };


            //辅料（第三部分提交）
            $scope.second_ing = new Object();
            $scope.second_ing.contents_second = [{key: 0, value: ""}];
            // 初始化时由于只有1条新增辅料，所以不允许删除
            $scope.second_ing.cansub_second_ing = false;
            // 增加辅料数
            $scope.second_ing.add_second_ing = function($index) {
                $scope.second_ing.contents_second.splice($index + 1, 0,
                    {key: new Date().getTime(), value: ""});   // 用时间戳作为每个item的key
                // 增加新的辅料后允许删除
                $scope.second_ing.cansub_second_ing = true;
            };
            // 减少辅料数
            $scope.second_ing.sub_second_ing = function($index) {
                // 如果辅料数大于1，删除被点击辅料
                if ($scope.second_ing.contents_second.length > 1) {
                    $scope.second_ing.contents_second.splice($index, 1);
                }
                // 如果辅料数为1，不允许删除
                if ($scope.second_ing.contents_second.length == 1) {
                    $scope.second_ing.cansub_second_ing = false;
                }
            };

            //菜品步骤（第四部分提交）
            $scope.third_ing = new Object();
            $scope.third_ing.contents_third = [{key: 0, value: ""}];
            // 初始化时由于只有1条新增辅料，所以不允许删除
            $scope.third_ing.cansub_third_ing = false;
            // 增加辅料数
            $scope.third_ing.add_third_ing = function($index) {
                $scope.third_ing.contents_third.splice($index + 1, 0,
                    {key: new Date().getTime(), value: ""});   // 用时间戳作为每个item的key
                // 增加新的回复后允许删除
                $scope.third_ing.cansub_third_ing = true;
            };
            // 减少辅料数
            $scope.third_ing.sub_third_ing = function($index) {
                // 如果辅料数大于1，删除被点击辅料
                if ($scope.third_ing.contents_third.length > 1) {
                    $scope.third_ing.contents_third.splice($index, 1);
                }
                // 如果辅料数为1，不允许删除
                if ($scope.third_ing.contents_third.length == 1) {
                    $scope.third_ing.cansub_third_ing = false;
                }
            };

            //点击提交第一部分
            $scope.Release_dish=function () {
                //从本地缓存里取出用户的id
                var user_id=JSON.parse(sessionStorage.getItem('state'))[3];
                //第一部分提交
                if (!$scope.data.file) {
                    return;
                }
                var url = serverURL + 'dish-food/upload_dish_pic';
                var data = $scope.data;
                $scope.menu_type_id = $('#dishRelease_type option:selected').val();
                $scope.ready_time = $('#dishRelease_ready_time option:selected').text();
                $scope.dish_time = $('#dishRelease_dish_time option:selected').text();
                $scope.right_month = $('#dishRelease_right_month option:selected').text();
                $scope.p_count = $('#dishRelease_p_count option:selected').text();
                // $scope.user_id =JSON.parse(sessionStorage.getItem('state'))[3];
                console.log(user_id);
                $scope.data = {menu_type_id:$scope.menu_type_id,user_id:user_id,dish_name:$scope.dish_Release_name, dish_time:$scope.dish_time,
                    ready_time:$scope.ready_time,p_count:$scope.p_count,story:$scope.story, right_month:$scope.right_month};
                // console.log($scope.data);
                Upload.upload({
                    url: url,
                    data:data
                }).success(function (data) {
                    $scope.isCropShow = false;
                }).error(function () {
                    console.log('error');
                    //获取当前发布菜谱的dish_id
                    $http.get('http://localhost:3009/dish-food/getReleaseDish/?user_id=' + user_id + '&dish_name=' + $scope.dish_Release_name)
                        .then(function successCallback(response) {
                            $scope.add_Dish=response.data.result;
                            $scope.dish_id=$scope.add_Dish[0].dish_id;
                            console.log($scope.dish_id);
                        });
                });
                //post提交
                $http({
                    method:'post',
                    url:serverURL + 'dish-food/getAddAct',
                    data:$scope.data,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    transformRequest: function(obj) {
                        var str = [];
                        for (var s in obj) {
                            str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                        }
                        return str.join("&");
                    }
                }).then(function (response) {
                });
            };


            //点击提交二、三、四部分
            $scope.ti_jiao=function () {
                //第三部分提交
                var second_div = document.querySelectorAll('.div_second_out input');

                //第二部分提交
                var main_div = document.querySelectorAll('.div_main_out input');

                $scope.seconds_name=[];
                $scope.seconds_count=[];

                $scope.mains_name=[];
                $scope.mains_count=[];


                for(var w=0;w<second_div.length;w++){
                    if(w%2==0){
                        $scope.seconds_name.push(second_div[w].value)
                    }else {
                        $scope.seconds_count.push(second_div[w].value)
                    }
                }

                for(var i=0;i<main_div.length;i++){
                    if(i%2==0){
                        $scope.mains_name.push(main_div[i].value)
                    }else {
                        $scope.mains_count.push(main_div[i].value)
                    }
                }

                $rootScope.seconds_name_hh=$scope.seconds_name.slice(0,$scope.seconds_name.length-1);
                $rootScope.seconds_count_hh=$scope.seconds_count.slice(0,$scope.seconds_count.length);

                $rootScope.mains_name_hh=$scope.mains_name.slice(0,$scope.mains_name.length-1);
                $rootScope.mains_count_hh=$scope.mains_count.slice(0,$scope.mains_count.length);

                $scope.seconds=[];
                var seconds_input={};
                for (var b=0;b<(second_div.length-1)/2;b++){
                    seconds_input={
                        dish_id:$scope.dish_id,
                        second_name:$rootScope.seconds_name_hh[b],
                        second_count:$rootScope.seconds_count_hh[b]
                    };
                    $scope.seconds.push(seconds_input);
                }

                //前台循环
                for(var d=0;d<$scope.seconds.length;d++){
                    $http({
                        method: 'GET',
                        url: serverURL + 'dish-food/addSecond_ing',
                        params:$scope.seconds[d]
                    }).then(function (response) {
                        if (response.data.result == 1) {
                        }
                    })
                }


                $scope.mains=[];
                var mains_input={};
                for (var a=0;a<(main_div.length-1)/2;a++){
                    mains_input={
                        dish_id:$scope.dish_id,
                        main_name:$rootScope.mains_name_hh[a],
                        main_count:$rootScope.mains_count_hh[a]
                    }
                    $scope.mains.push(mains_input);
                }

                //前台循环
                for(var c=0;c<$scope.mains.length;c++){
                    $http({
                        method: 'GET',
                        url: serverURL + 'dish-food/addMain_ing',
                        params:$scope.mains[c]
                    }).then(function (response) {
                        if (response.data.result == 1) {
                            // $rootScope.actIsThumb = true;
                        }
                    })
                }


                //第四部分提交
                var text_area = document.querySelectorAll('.div_step input');
                for (var e=0;e<text_area.length;e++){

                    var url_step = serverURL + 'dish-food/upload_dish_step_pic';
                    var data_step = $scope.data[e+1].file;
                    // console.log(data_step.file);
                    $scope.data[e+1] = { dish_id:$scope.dish_id,step_content:text_area[e].value};
                    //console.log($scope.data[e + 1]);
                    Upload.upload({
                        url: url_step,
                        data: { dish_id:$scope.dish_id,step_content:text_area[e].value},
                        file:data_step
                    }).success(function (data) {
                        $scope.isCropShow = false;
                    }).error(function () {
                        console.log('error');
                    });
                }
            };
        }]
    }
});