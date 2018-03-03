
angular.module('food')
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        // $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/index');
        $stateProvider
            .state('index', {
                url:'/index',
                template: '<index-page></index-page>'
            })
            .state('menu', {
                url:'/menu',
                template: '<menu-page></menu-page>'
            })
            .state('person', {
                url:'/person',
                template: '<person-page></person-page>'

            })
            .state('topic',{
                url:'/topic',
                template:'<topic-page></topic-page>'
            })
            .state('regist',{
                url:'/regist',
                template:'<regist-page></regist-page>'
            })
            .state('login',{
                url:'/login',
                template:'<login-page></login-page>'
            })
            .state('fv',{
                url:'/fv',
                template:'<fv-page></fv-page>'
            })
            .state('space',{
                url:'/space',
                template:'<space-page></space-page>'
            })
            .state('master',{
                url:'/master',
                template:'<master-page></master-page>'
            })
            .state('message',{
                url:'/message',
                template:'<message-page></message-page>'
            })
            .state('topicDetails',{
                url:'/topicDetails',
                template:'<topic-details-page></topic-details-page>'
            })
            .state('dishRelease',{
                url:'/dishRelease',
                template:'<dish-release-page></dish-release-page>'
            })
            .state('dishDetails',{
                url:'/dishDetails',
                template:'<dish-details-page></dish-details-page>'
            })
            .state('topicRelease',{
                url:'/topicRelease',
                template:'<topic-release-page></topic-release-page>'
            })
            .state('search',{
                url:'/search',
                template:'<search-page></search-page>'
            })
            .state('about',{
                url:'/about',
                template:'<about-page></about-page>'
            })
    }
    ]);

  
