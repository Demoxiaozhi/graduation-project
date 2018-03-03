
angular.module('menuFood').
directive('menuPage',function () {
    return {
        restrict : "ACE",
        replace:true,
        templateUrl : 'menu-food/menu-food.template.html',
        controller:['$scope','$http','$rootScope',function ($scope,$http,$rootScope) {
            $scope.dish_type=['农家菜','私家菜','凉菜','热菜','素菜','海鲜'];
            $scope.conditions={
                _dish_type:0,
                _search:'',
                _pageIndex:1
            };

            $http.get('http://localhost:3009/dish-food/getDishFood')
                .then(function successCallback(response) {
                    // console.log(response.data.result);
                    // $scope.parts_dish_menu=response.data.result;

                    //分页变量初始化
                    $scope.dishes=response.data.result;
                    $scope.newdishes_type=$scope.dishes;
                    //一页显示12道菜
                    $scope.page_dishes_count=12;
                    $scope.pageIndex=1;
                    $scope.dishes_count=$scope.dishes.length;
                    $scope.page_count=Math.ceil($scope.dishes_count/$scope.page_dishes_count);
                    // console.log($scope.page_count);

                    $scope.page_count_arr=[];
                    for(var i=0;i<$scope.page_count;i++){
                        $scope.page_count_arr.push(i+1);
                    }
                    
                    
                });
            $scope.column='publish_time';
            $scope.desc=true;
            $scope.change=function (i) {
                $scope.pageIndex=i;
            };

            $scope.xdish_type=function (t) {
                $scope.conditions._dish_type=t;
                $scope.filterDishes($scope.conditions);
            };

            $scope.filterDishes=function (conditions) {
                // console.log($scope.conditions);
                //判断菜品类型
                $scope.newdishes_type=[];
                if($scope.conditions._dish_type!=0){
                    for(var i=0;i<$scope.dishes.length;i++){
                        if($scope.dishes[i].menu_type_id===$scope.conditions._dish_type){
                            $scope.newdishes_type.push($scope.dishes[i])
                        }
                    }

                }else {
                    $scope.newdishes_type=$scope.dishes;
                }
                //结束判断菜品类型
                $scope.dishes_count= $scope.newdishes_type.length;
                $scope.page_count=Math.ceil($scope.dishes_count/$scope.page_dishes_count);

                $scope.page_count_arr=[];
                for(var i=0;i<$scope.page_count;i++){
                    $scope.page_count_arr.push(i+1);
                }

            }







           //点击变成活动状态
            $(document).on('click','#dish_type li,#check span',function () {
                $(this).addClass('active').siblings().removeClass('active');
            })
        }]
    }

})
// 自定义分页过滤器
.filter('fenye',function () {
    return function(lists,start){     //两个参数 lists 是在 html 里你ng-repeat的原始数据：
        return lists.slice((start-1)*12,start*12);     //将原始数据按照 start 分割
    };

})
//自定义搜索过滤器
// .filter('search',function () {
//     return function (list,txt) {
//         if(txt=='' || txt==null){
//             return list;
//         }else{
//             var dishes=[];
//             for(var i=0;i<list.length;i++){
//                 if(list[i].dish_name.indexOf(txt)!=-1){
//                     dishes.push(list[i])
//                 }
//             }
//             return dishes;
//         }
//     }
// });

