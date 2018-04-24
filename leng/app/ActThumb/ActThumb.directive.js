angular.module('ActThumb')
    .directive('actThumbPage', function () {
        return {
            restrict: "ACE",
            replace: true,
            templateUrl: 'ActThumb/ActThumb.template.html',
            controller: function ($scope,$state, actThumbFactory) {

                var dish_id = sessionStorage.getItem('dish_id');

                $scope.addDishClick = function () {
                    if (sessionStorage.getItem('state') == null) {
                       $state.go('login');
                    }
                    else {
                        var user_id=JSON.parse(sessionStorage.getItem('state'))[3];
                        actThumbFactory.ThumbUp({user_id: user_id, dish_id: dish_id});
                    }
                }
                $scope.deleteDishClick = function () {
                    var user_id=JSON.parse(sessionStorage.getItem('state'))[3];
                    actThumbFactory.ThumbDown({user_id: user_id, dish_id: dish_id});
                }
            }
        }
    })