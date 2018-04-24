angular.module('actCollect')
    .service('actCollectService', function () {

    })
    .factory('actCollectFactory', function ($http, $rootScope, serverURL) {
        return {
            CollectUp: function (data) {
                $http({
                    method: 'GET',
                    url: serverURL + 'dish-food/addDishCollect',
                    params: data
                }).then(function (response) {
                    if (response.data.result == 1) {
                        $rootScope.actIsCollect = true;
                    }
                })
            },
            CollectDown: function (data) {
                $http({
                    method: 'GET',
                    url: serverURL + 'dish-food/deleteDishCollect',
                    params: data
                }).then(function (response) {
                    if (response.data.result == 1) {
                        $rootScope.actIsCollect = false;
                    }
                })
            },
            CollectTopicUp: function (data) {
                $http({
                    method: 'GET',
                    url: serverURL + 'topic-food/addTopicCollect',
                    params: data
                }).then(function (response) {
                    if (response.data.result == 1) {
                        $rootScope.actIsTopicCollect = true;
                    }
                })
            },
            CollectTopicDown: function (data) {
                $http({
                    method: 'GET',
                    url: serverURL + 'topic-food/deleteTopicCollect',
                    params: data
                }).then(function (response) {
                    if (response.data.result == 1) {
                        $rootScope.actIsTopicCollect = false;
                    }
                })
            }
        }
    });