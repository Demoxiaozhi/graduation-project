angular.module('getFocusAct')
    .service('getFocusActService', function () {

    })
    .factory('getFocusActFactory', function (serverURL, $http, $rootScope) {
        return {
            getIFFocus: function (data) {
                $http({
                    method: 'GET',
                    url: serverURL + 'users/getIFFocus',
                    params: data
                }).then(function (response) {
                    if (response.data.result == 1) {
                        $rootScope.actIsFocus = true;
                    }
                })
            }
        }
    });