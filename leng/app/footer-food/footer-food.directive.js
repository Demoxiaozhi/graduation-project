
angular.module('footerFood').
directive('footerPage',function () {
    return {
        restrict : "ACE",
        replace:true,
        templateUrl : 'footer-food/footer-food.template.html',
        controller:['$scope','$http','$rootScope','$location','$anchorScroll',function ($scope,$http,$rootScope,$location, $anchorScroll) {
            // $http.get('data/index_month.json').
            // then(function (response) {
            //     $scope.parts=response.data;
            // })
            $scope.gotoTop = function() {

                // 将location.hash的值设置为
                // 你想要滚动到的元素的id
                $location.hash('top');

                // 调用 $anchorScroll()
                $anchorScroll();

            };

        }]
    }
});