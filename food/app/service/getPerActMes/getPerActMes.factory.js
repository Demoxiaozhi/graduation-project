angular.module('getPerActMes')
    .service('getPerActMesService', function () {

    })
    .factory('getPerActMesFactory', function (serverURL, $http, $rootScope) {
        return {
            getIFThumb: function (data) {
                $http({
                    method: 'GET',
                    url: serverURL + 'dish-food/getIFThumb',
                    params: data
                }).then(function (response) {
                    if (response.data.result == 1) {
                        $rootScope.actIsThumb = true;
                    }
                })
            },

            getIFCollect: function (data) {
                $http({
                    method: 'GET',
                    url: serverURL + 'dish-food/getIFCollect',
                    params: data
                }).then(function (response) {
                    if (response.data.result == 1) {
                        $rootScope.actIsCollect = true;
                    }
                })
            },
            getIFTopicThumb: function (data) {
                $http({
                    method: 'GET',
                    url: serverURL + 'topic-food/getIFTopicThumb',
                    params: data
                }).then(function (response) {
                    if (response.data.result == 1) {
                        $rootScope.actIsTopicThumb = true;
                    }
                })
            },

            getIFTopicCollect: function (data) {
                $http({
                    method: 'GET',
                    url: serverURL + 'topic-food/getIFTopicCollect',
                    params: data
                }).then(function (response) {
                    if (response.data.result == 1) {
                        $rootScope.actIsTopicCollect = true;
                    }
                })
            }
        }
    })