/**
 * Created by xz197 on 2017/4/27.
 */
angular.module('iconFood')
.service('iconFoodService',function () {

})
    .factory('iconFoodFactory', function ($http, $rootScope) {
        return {
            getIcon: function (data) {
                $http.get('http://localhost:3009/users/getUserIcon/?user_phone_number=' + data.name)
                    .then(function successCallback(response) {
                        // console.log(response.data.result);
                        if (response.data.result.length == 1) {
                            // console.log(1)
                            $rootScope.uicon = response.data.result[0].head_photo;
                            // console.log($rootScope.uicon);
                            // console.log(response.result[0].head_photo)
                        }
                    })
            }
        }
    })