angular.module('getArt')
    .service('getArtService', function () {

    })
    .factory('getArtFactory', function (serverURL, $http, $rootScope) {
        return {
            getArtMes: function (data) {
                $http({
                    method: 'GET',
                    url: serverURL + 'article/getArt'
                }).then(function (response) {
                    //分页
                    $rootScope.img = serverURL + 'uploads/';
                    $rootScope.artData = response.data.res;
                    $rootScope.personalIcon = {
                        file: serverURL + 'artPic/'
                    };
                    for(var j =0;j<$rootScope.artData.length;j++){
                        // console.log($rootScope.artData[j].artPic.indexOf())
                        if($rootScope.artData[j].artPic)
                            $rootScope.artData[j].artPic=$rootScope.artData[j].artPic.split(',');
                    }
                    console.log($rootScope.artData);
                    $rootScope.newArtData = $rootScope.artData;  //把数据放到全局
                    $rootScope.artDataCount = $rootScope.artData.length;
                    $rootScope.newArtDataCount = $rootScope.newArtData.length;
                    $rootScope.showPage = 5;
                    $rootScope.paga = 1;
                    $rootScope.page_count = Math.ceil($rootScope.artDataCount / $rootScope.showPage);
                    $rootScope.change = function (i) {
                        $rootScope.paga = i;
                    };
                    $rootScope.page_count_arr = [];
                    for (var i = 0; i < $rootScope.page_count; i++) {
                        $rootScope.page_count_arr.push(i + 1);
                    }
                });
            }
        }
    });
