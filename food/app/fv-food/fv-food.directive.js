
angular.module('fvFood').
directive('fvPage',function () {
    return {
        restrict : "ACE",
        replace:true,
        templateUrl : 'fv-food/fv-food.template.html',
        controller:['$scope','$http','$rootScope',function ($scope,$http,$rootScope) {
            var fv_id=sessionStorage.getItem('fv_id');
            $scope.fv_food_name='';
            // $scope.hello = function () {
                // $scope.name ='4';
                $http.get('http://localhost:3009/fv-food/getFvFood/?fv_id='+ fv_id)
                    .then(function successCallback(response) {
                        if (response.data.result.length == 1) {
                            // console.log(1)
                            $scope.fv_food_uicon = response.data.result[0].fv_photo;
                            $scope.fv_food_name = response.data.result[0].fv_name;
                            $scope.fv_food_sname = response.data.result[0].fv_sname;
                            $scope.fv_food_right_person = response.data.result[0].right_person;
                            $scope.fv_food_no_person = response.data.result[0].no_person;
                            $scope.fv_food_effect = response.data.result[0].fv_effect;
                            //获取所有的食材，并筛选将相应的食材显示出来
                            $http.get('http://localhost:3009/dish-food/getDishFood')
                                .then(function successCallback(response) {
                                    // console.log(response.data.result);
                                    $scope.parts_fv = response.data.result;
                                    $scope.parts = [];
                                    for (var i = 0; i < $scope.parts_fv.length; i++) {
                                        if ($scope.parts_fv[i].dish_name.indexOf($scope.fv_food_name) != -1) {
                                            $scope.parts.push($scope.parts_fv[i]);
                                            // console.log($scope.parts);
                                        }
                                    }
                                    // fenye
                                    $scope.page_fv_count = 12;
                                    $scope.pageIndex = 1;
                                    $scope.fv_count = $scope.parts.length;
                                    $scope.page_count = Math.ceil($scope.fv_count / $scope.page_fv_count);

                                    $scope.page_count_arr = [];
                                    for (var i = 0; i < $scope.page_count; i++) {
                                        $scope.page_count_arr.push(i + 1);
                                    }

                                });
                            $scope.change=function (i) {
                                $scope.pageIndex=i;
                            };


                        }
                    });
            // };

        }]
    }
});