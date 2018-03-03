angular.module('topicFood').
directive('topicPage',function () {
    return {
        restrict : "ACE",
        replace:true,
        templateUrl : 'topic-food/topic-food.template.html',
        controller:['$scope','$http','serverURL','$rootScope',function ($scope,$http,serverURL,$rootScope) {

            $scope.topic_types=['烘焙圈','妈妈派','饮食健康','美好时光'];
            $scope.conditions={
                _topic_type:'',
                _search:'',
                _pageIndex:1
            };
            $http.get('http://localhost:3009/topic-food/getTopicShow')
                .then(function successCallback(response) {
                    $scope.topics=response.data.result;
                    $scope.newtopics_topic_type=$scope.topics;

                    //一页显示6个话题
                    $scope.page_topics_count=6;
                    $scope.pageIndex=1;
                    $scope.topics_count=$scope.newtopics_topic_type.length;
                    $scope.page_count=Math.ceil($scope.topics_count/$scope.page_topics_count);
                    $scope.page_count_arrs=[];
                    for(var i=0;i<$scope.page_count;i++){
                        $scope.page_count_arrs.push(i+1);
                    }
                });

            $scope.column='';
            $scope.desc=false;

            $scope.change_topic=function (c) {
                $scope.pageIndex=c;
            };

            $scope.xTopicType=function (t) {
                $scope.conditions._topic_type=t;
                $scope.filterBooks($scope.conditions);
            };
            $rootScope.Sou_suo=function (text) {
                $scope.conditions._search=text;
                $scope.filterBooks($scope.conditions);
            }

            $scope.filterBooks=function (conditions) {
                console.log($scope.conditions);
                $scope.newtopics_search=[];
                if($scope.conditions._search.length==0){
                    $scope.newtopics_search=$scope.topics;
                }else {
                    for(var i=0;i<$scope.topics.length;i++){
                        if($scope.topics[i].topic_name.indexOf($scope.conditions._search)!=-1){
                            $scope.newtopics_search.push($scope.topics[i])
                        }
                    }
                }

                $scope.newtopics_topic_type=[];
                if($scope.conditions._topic_type!=0){
                    for(var i=0;i<$scope.newtopics_search.length;i++){
                        if($scope.newtopics_search[i].topic_type_id===$scope.conditions._topic_type){
                            $scope.newtopics_topic_type.push($scope.newtopics_search[i])
                        }
                    }

                }else {
                    $scope.newtopics_topic_type=$scope.newtopics_search;
                }


                $scope.topics_count=$scope.newtopics_topic_type.length;
                $scope.page_count=Math.ceil($scope.topics_count/$scope.page_topics_count);

                $scope.page_count_arrs=[];
                for(var a=0;a<$scope.page_count;a++){
                    $scope.page_count_arrs.push(a+1);
                }
            };

            //轮播图
            $(function(){
                $("#slidershow").carousel({
                    interval:2000
                });
                $("#slidershow a.left").click(function(){
                    $(".carousel").carousel("prev");
                });
                $("#slidershow a.right").click(function(){
                    $(".carousel").carousel("next");
                });
            });

            //点击分类按钮
            $(document).on('click', '#topicType li', function () {
                $(this).addClass('fv_div_type1').siblings().removeClass('fv_div_type1');
            });

            //点击排序按钮
            $(document).on('click', '#topic_order span', function () {
                $(this).addClass('topic_orders').siblings().removeClass('topic_orders');
            });

            // $scope.column='';
            // $scope.desc=false;

            //点击话题获取id
            $scope.topic_show_details = function (index) {
                sessionStorage.setItem('topic_id',index);
            };
            //点击轮播获取id
            $scope.lun_bo = function (index) {
                sessionStorage.setItem('topic_id',index);
            };

            // //话题展示页获取话题
            // $http.get('http://localhost:3009/topic-food/getTopicShow')
            //     .then(function successCallback(response) {
            //         $scope.topic_show=response.data.result;
            //     });


        }]
    }
})
    // 自定义分页过滤器
    .filter('fen_ye',function () {
        return function(lists,start){     //两个参数 lists 是在 html 里你ng-repeat的原始数据：
            return lists.slice((start-1)*6,start*6);     //将原始数据按照 start 分割
        };

    });