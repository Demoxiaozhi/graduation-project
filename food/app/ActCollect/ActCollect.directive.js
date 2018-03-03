angular.module('ActCollect')
    .directive('actCollectPage', function () {
        return {
            restrict: "ACE",
            replace: true,
            templateUrl: 'ActCollect/ActCollect.template.html',
            controller: function ($scope, $state,actCollectFactory) {

                var dish_id = sessionStorage.getItem('dish_id');

                $scope.addDishCollect = function () {
                    if (sessionStorage.getItem('state') == null) {
                       $state.go('login');
                    }
                    else {
                        var user_id=JSON.parse(sessionStorage.getItem('state'))[3];
                        actCollectFactory.CollectUp({user_id: user_id,dish_id: dish_id});
                    }
                };
                $scope.deleteDishCollect = function () {
                    var user_id=JSON.parse(sessionStorage.getItem('state'))[3];
                    actCollectFactory.CollectDown({user_id: user_id,dish_id: dish_id});
                }
            }
        }
    });