angular.module('actThumb')
    .service('actThumbService', function () {

    })
    .factory('actThumbFactory', function ($http, $rootScope, serverURL) {
        return {
            ThumbUp: function (data) {
                $http({
                    method: 'GET',
                    url: serverURL + 'dish-food/addDishClick',
                    params: data
                }).then(function (response) {
                    if (response.data.result == 1) {
                        $rootScope.actIsThumb = true;
                    }
                })
            },
            ThumbDown: function (data) {
                $http({
                    method: 'GET',
                    url: serverURL + 'dish-food/deleteDishClick',
                    params: data
                }).then(function (response) {
                    if (response.data.result == 1) {
                        $rootScope.actIsThumb = false;
                    }
                })
            },
            ThumbTopicUp: function (data) {
                $http({
                    method: 'GET',
                    url: serverURL + 'topic-food/addTopicClick',
                    params: data
                }).then(function (response) {
                    if (response.data.result == 1) {
                        $rootScope.actIsTopicThumb = true;
                    }
                })
            },
            ThumbTopicDown: function (data) {
                $http({
                    method: 'GET',
                    url: serverURL + 'topic-food/deleteTopicClick',
                    params: data
                }).then(function (response) {
                    if (response.data.result == 1) {
                        $rootScope.actIsTopicThumb = false;
                    }
                })
            }
        }
    })