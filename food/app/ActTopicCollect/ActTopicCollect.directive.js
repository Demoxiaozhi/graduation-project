angular.module('ActTopicCollect')
    .directive('actTopicCollectPage', function () {
        return {
            restrict: "ACE",
            replace: true,
            templateUrl: 'ActTopicCollect/ActTopicCollect.template.html',
            controller: function ($scope, $state,actCollectFactory) {

                var topic_id = sessionStorage.getItem('topic_id');

                $scope.addTopicCollect = function () {
                    if (sessionStorage.getItem('state') == null) {
                       $state.go('login');
                    }
                    else {
                        var user_id=JSON.parse(sessionStorage.getItem('state'))[3];
                        actCollectFactory.CollectTopicUp({user_id: user_id,topic_id: topic_id});
                    }
                }
                $scope.deleteTopicCollect = function () {
                    var user_id=JSON.parse(sessionStorage.getItem('state'))[3];
                    actCollectFactory.CollectTopicDown({user_id: user_id,topic_id: topic_id});
                }
            }
        }
    });