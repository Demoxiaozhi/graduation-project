
angular.module('aboutFood').
    directive('aboutPage',function () {
        return {
            restrict : "ACE",
            replace:true,
            templateUrl : 'about-food/about-food.template.html',
            controller:['$scope','$http','$rootScope',function ($scope,$http,$rootScope) {

                // $(document).on('click','#about span',function () {
                //     $(this).addClass('about-color').siblings().removeClass('about-color');
                // })
                
            }]
        }
});