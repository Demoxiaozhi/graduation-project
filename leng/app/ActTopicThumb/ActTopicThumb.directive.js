angular.module('ActTopicThumb')
    .directive('actTopicThumbPage', function () {
        return {
            restrict: "ACE",
            replace: true,
            templateUrl: 'ActTopicThumb/ActTopicThumb.template.html',
            controller: function ($scope,$state, actThumbFactory) {

                var topic_id = sessionStorage.getItem('topic_id');

                $scope.addTopicClick = function () {
                    if (sessionStorage.getItem('state') == null) {
                       $state.go('login');
                    }
                    else {
                        var user_id=JSON.parse(sessionStorage.getItem('state'))[3];
                        actThumbFactory.ThumbTopicUp({user_id: user_id, topic_id: topic_id});
                    }
                }
                $scope.deleteTopicClick = function () {
                    var user_id=JSON.parse(sessionStorage.getItem('state'))[3];
                    actThumbFactory.ThumbTopicDown({user_id: user_id, topic_id: topic_id});
                }
            }
        }
    })