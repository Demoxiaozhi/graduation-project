angular.module('topicReleaseFood').
directive('topicReleasePage',function () {
    return {
        restrict : "ACE",
        replace:true,
        templateUrl : 'topicRelease-food/topicRelease-food.template.html',
        //注意注入顺序
        // controller:['$scope','$http','serverURL','$rootScope','Upload','$state',function ($scope,$http,$rootScope,serverURL,Upload,$state) {
        controller:['$scope','$http','$rootScope','Upload','serverURL','$state',function ($scope,$http,$rootScope,Upload,serverURL,$state) {

            // //弹出模态框询问是否确认取消收藏
            // $scope.showModal=function (dishId,dishName) {
            //     $scope.cancelDishId=dishId;
            //     $scope.warnDelet="确定要取消对"+dishName+"这道菜的收藏吗?";
            //     $('#myModals').modal('show');
            // };

            if (sessionStorage.getItem('state')!==null){
                var user_id=JSON.parse(sessionStorage.getItem('state'))[3];
            }
            var reo = /^([A-Za-z0-9]|[\u4E00-\u9FA5])+$/;
            var onOff = true;
            $scope.topic_type = function () {
                if ($scope.topic_type_id = $('#topicRelease_type option:selected').val()) {
                    onOff = true;
                } else {
                    alert('请选择话题类型！');
                    onOff = false;
                }
            };
            $scope.topic_names = function () {
                if ($scope.topic_name.length < 3) {
                    alert('字数不足');
                    onOff = false;
                } else {
                    onOff = true;
                }
            };
            $scope.text_txt = function () {
                if($scope.topic_content = document.querySelector('#txt').innerText.length<10){
                    onOff=false;
                }else {
                    onOff=true;
                }
            };
            $scope.data='';
            //发布话题
            $scope.add_topic_one = function () {
                if (sessionStorage.getItem('state') ==null) {
                    // document.querySelector('.login_bg').style.display = 'block';
                    $state.go('login');
                } else {
                    if (onOff) {
                        $scope.topic_content = document.querySelector('#txt').innerText;
                        $scope.topic_div = document.querySelector('#txt').innerHTML;
                        $scope.user_id = JSON.parse(sessionStorage.getItem('state'))[3];
                        console.log($scope.topic_div);
                        //传文字
                        if (!$scope.data) {
                            Upload.upload({
                                url: serverURL + 'topic-food/addTopic',
                                data: {
                                    user_id: $scope.user_id,
                                    topic_name: $scope.topic_name,
                                    topic_type_id:$('#topicRelease_type option:selected').val(),
                                    topic_content: $scope.topic_content,
                                    topic_div: $scope.topic_div
                                },
                                file: ''
                            }).success(function (data) {
                                $scope.warnRelease="发布成功！";
                                $('#myModals').modal('show');
                                if (data == 1) {
                                    // $state.go('原创')
                                }
                            }).error(function () {
                                console.log('error');
                            });
                        } else {
                            //传图片和文字
                            var arr = '';
                            var imgs =[];
                            var new_data = {
                                user_id: $scope.user_id,
                                topic_name: $scope.topic_name,
                                topic_type_id:$('#topicRelease_type option:selected').val(),
                                topic_content: $scope.topic_content,
                                topic_div: $scope.topic_div
                            };
                            for (var i = 0; i < $scope.data.length; i++) {
                                imgs.push($scope.data[i]);
                            }
                            Upload.upload({
                                url: serverURL + 'topic-food/addTopic',
                                data: new_data,
                                file:imgs
                            }).success(function (data) {
                                $scope.warnRelease="发布成功！";
                                $('#myModals').modal('show');
                                // console.log(data);
                                if (data == 1) {
                                    // $state.go('原创')
                                }
                            }).error(function () {
                                console.log('error');
                            });
                        }
                    } else {
                        alert('文章至少10个字');
                        return;
                    }
                }
            }



        }]
    }
});