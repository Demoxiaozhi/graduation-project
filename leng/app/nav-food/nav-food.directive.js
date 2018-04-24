
angular.module('navFood').
    directive('navPage',function () {
        return {
            restrict : "ACE",
            replace:true,
            templateUrl : 'nav-food/nav-food.template.html',
            controller:['$scope','$http','$rootScope',function ($scope,$http,$rootScope) {

                // $(document).on('click','#nav span',function () {
                //     $(this).addClass('nav-color').siblings().removeClass('nav-color');
                // })
                
            }]
        }
});