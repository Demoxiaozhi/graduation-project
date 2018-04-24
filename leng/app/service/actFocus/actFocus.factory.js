angular.module('actFocus')
    .service('actFocusService', function () {

    })
    .factory('actFocusFactory', function ($http, $rootScope, serverURL) {
        return {
            FocusUp: function (data) {
                console.log('151515151');
                console.log(data);
                $http({
                    method: 'GET',
                    url: serverURL + 'users/focusDishAuthor',
                    params: data
                }).then(function (response) {
                    if (response.data.result == 1) {
                        $rootScope.actIsFocus = true;
                    }
                })
            },
            FocusDown: function (data) {
                $http({
                    method: 'GET',
                    url: serverURL + 'users/deleteFocusDishAuthor',
                    params: data
                }).then(function (response) {
                    if (response.data.result == 1) {
                        $rootScope.actIsFocus = false;
                    }
                })
            }
        }
    });