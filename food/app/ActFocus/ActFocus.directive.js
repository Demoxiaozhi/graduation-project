angular.module('ActFocus')
    .directive('actFocusPage', function () {
        return {
            restrict: "ACE",
            replace: true,
            templateUrl: 'ActFocus/ActFocus.template.html',
            controller: function ($scope, $state,actFocusFactory) {

                var suser_id = sessionStorage.getItem('suser_id');
                $scope.addFocus = function () {
                    if (sessionStorage.getItem('state') == null) {
                       $state.go('login');
                    }
                    else {
                        var user_id=JSON.parse(sessionStorage.getItem('state'))[3];
                        actFocusFactory.FocusUp({user_id: user_id,suser_id: suser_id});
                    }
                };
                $scope.deleteFocus = function () {
                    var user_id=JSON.parse(sessionStorage.getItem('state'))[3];
                    actFocusFactory.FocusDown({user_id: user_id,suser_id: suser_id});
                }
            }
        }
    });