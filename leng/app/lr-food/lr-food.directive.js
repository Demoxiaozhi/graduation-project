angular.module('lrFood').directive('lrPage', function () {
    return {
        restrict: "ACE",
        replace: true,
        templateUrl: 'lr-food/lr-food.template.html',
        controller: function ($scope, $http, $rootScope, serverURL,loginOut,$state) {

            $(document).on('click','#login span',function () {
                $(this).addClass('login_color').siblings().removeClass('login_color');
            });

            $scope.$watch('isLogin', function () {
                if ($rootScope.isLogin) {
                    $scope.uicon = JSON.parse(sessionStorage.getItem('state'))[2];
                    console.log($rootScope.uicon);
                    $rootScope.data = {
                        image: serverURL + "uploads/" + $scope.uicon
                    }
                }
            });
            var isDetail = true;
            $scope.clickIcon = function () {
                if (isDetail) {
                    $('#icon-detail').addClass('icon-details')
                } else {
                    $('#icon-detail').removeClass('icon-details').addClass('icon-detail')
                }
                isDetail = !isDetail;
            };
            
            $scope.lOut=function () {
                loginOut.logOut();
            }
            
        }
    }
});