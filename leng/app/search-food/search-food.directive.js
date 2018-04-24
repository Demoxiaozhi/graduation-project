angular.module('searchFood').
directive('searchPage',function () {
    return {
        restrict : "ACE",
        replace:true,
        templateUrl : 'search-food/search-food.template.html',
        controller:['$scope','$http','$rootScope',function ($scope,$http,$rootScope) {
            $scope.dish_type=['农家菜','私家菜','凉菜','热菜','素菜','海鲜'];
            $scope.conditions={
                _dish_type:'',
                _search:'',
                _pageIndex:1
            };
                $http.get('http://localhost:3009/dish-food/getDishFood')
                    .then(function successCallback(response) {
                        $scope.dishes=response.data.result;
                        $scope.newdishes_dish_type=$scope.dishes;
                        // $scope.newdishes_dish_type='';

                        //        一页显示12个菜品
                        $scope.page_dishes_count=12;
                        $scope.pageIndex=1;
                        $scope.dishes_count=$scope.newdishes_dish_type.length;
                        $scope.page_count=Math.ceil($scope.dishes_count/$scope.page_dishes_count);

                        $scope.page_count_arr=[];
                        for(var i=0;i<$scope.page_count;i++){
                            $scope.page_count_arr.push(i+1);
                        }
                    });


                $scope.column='';
                $scope.desc=false;

                $scope.change=function (i) {
                    $scope.pageIndex=i;
                };

                $scope.xDishType=function (t) {
                    $scope.conditions._dish_type=t;
                    $scope.filterBooks($scope.conditions);
                };
                $rootScope.xSousuo=function (text) {
                    $scope.conditions._search=text;
                    $scope.filterBooks($scope.conditions);
                }

                $scope.filterBooks=function (conditions) {
                    console.log($scope.conditions);
                    $scope.newdishes_search=[];
                    if($scope.conditions._search.length==0){
                        $scope.newdishes_search=$scope.dishes;
                    }else {
                        for(var i=0;i<$scope.dishes.length;i++){
                            if($scope.dishes[i].dish_name.indexOf($scope.conditions._search)!=-1 || $scope.dishes[i].right_month.indexOf($scope.conditions._search)!=-1){
                                $scope.newdishes_search.push($scope.dishes[i])
                            }
                        }
                    }
                    
                    $scope.newdishes_dish_type=[];
                    if($scope.conditions._dish_type!=0){
                        for(var i=0;i<$scope.newdishes_search.length;i++){
                            if($scope.newdishes_search[i].menu_type_id===$scope.conditions._dish_type){
                                $scope.newdishes_dish_type.push($scope.newdishes_search[i])
                            }
                        }

                    }else {
                        $scope.newdishes_dish_type=$scope.newdishes_search;
                        console.log($scope.newdishes_dish_type);
                    }


                    $scope.dishes_count=$scope.newdishes_dish_type.length;
                    $scope.page_count=Math.ceil($scope.dishes_count/$scope.page_dishes_count);

                    $scope.page_count_arr=[];
                    for(var i=0;i<$scope.page_count;i++){
                        $scope.page_count_arr.push(i+1);
                    }
                }

            $(document).on('click','#dish_title li',function () {
                $(this).addClass('search_dish_list').siblings().removeClass('search_dish_list');
            })
            $(document).on('click','#div_dish_type span',function () {
                $(this).addClass('label-success').siblings().removeClass('label-success').addClass('label-default');
            })

        }]
    }
})



//自定义过滤器

.filter('toDate',function () {
    return function (input) {
        return new Date(input);
    }
})

.filter('search',function () {
    return function (list,txt) {
        if(txt=='' || txt==null){
            return list;
        }else{
            var books=[]
            for(var i=0;i<list.length;i++){
                if(list[i].name.indexOf(txt)!=-1 || list[i].author.indexOf(txt)!=-1){
                    books.push(list[i])
                }
            }
            return books;
        }
    }
})
// .filter('fenye',function () {
//     return function(lists,start){     //两个参数 lists 是在 html 里你ng-repeat的原始数据：
//         return lists.slice((start-1)*4,start*4);     //将原始数据按照 start 分割
//     };
//
// });
