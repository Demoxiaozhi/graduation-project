
angular.module('messageFood').
directive('messagePage',function () {
    return {
        restrict : "ACE",
        replace:true,
        templateUrl : 'message-food/message-food.template.html',
        controller:['$scope','$http','$rootScope',function ($scope,$http,$rootScope) {
            $scope.chooseData=function () {
                $rootScope.isMessage="dataMessage";

                var cities = [
                    {
                        name: 'henan',
                        value: '河南',
                        options: [{name: 'zhengzhou', value: '郑州'}, {name: 'kaifeng', value: '开封'}, {
                            name: 'luoyang',
                            value: '洛阳'
                        }]
                    },
                    {
                        name: 'jiangsu',
                        value: '江苏',
                        options: [{name: 'suzhou', value: '苏州'}, {name: 'nanjing', value: '南京'}, {
                            name: 'changzhou',
                            value: '常州'
                        }]
                    }
                ];
               //修改个人资料及显示
                $.get('http://localhost:3009/users/userinfo/?user_phone_number='+ $rootScope.userId,function(data,status){
                    // alert("Data: " + data + "\nStatus: " + status);
                    // console.log(data.user_id.province);
                    if(status=="fail"){
                        console.log("获取个人信息失败")
                    }else{
                        //在页面展示个人信息
                        var db_province=data.user_id.province;
                        var db_city=data.user_id.city;
                        $('#local_province').find('option[value=' + db_province + ']').attr('selected', true);
                        $('#local_province').change();
                        $('#local_city').find('option[value=' + db_city + ']').attr('selected', true);
                        $('#text').val(data.user_id.user_sname);
                        $('#sign').val(data.user_id.sign);
                        $('#sex').find('option[value='+data.user_id.sex+']').attr('selected',true);
                        var birthday=data.user_id.birthday.split('T')[0];
                        // console.log(birthday);
                        var year=birthday.split('-')[0];
                        var month=birthday.split('-')[1];
                        var day=parseInt(birthday.split('-')[2])+1;
                        // console.log(year,month,day);
                        $('#year').find('option[value=' +year+ ']').attr('selected',true);
                        $('#month').find('option[value=' +month+ ']').attr('selected',true);
                        $('#day').find('option[value=' +day+ ']').attr('selected',true);
                    }
                });

                function show_province() {
                    var provinces = '<option>请选择</option>';
                    for (var i in cities) {
                        provinces += '<option value="' + cities[i].name + '">' + cities[i].value + '</option>'
                    }
                    $('#local_province').html(provinces);
                }

                show_province();

                $('#local_province').change(function () {
                    var selected_value = $(this).find('option:selected').val();
                    var city_options = [];
                    for (var i in cities) {
                        if (cities[i].name == selected_value) {
                            city_options = cities[i].options;
                            break;
                        }
                    }
                    var htmls = '<option>请选择</option>';
                    for (var i in city_options) {
                        htmls += '<option value="' + city_options[i].name + '">' + city_options[i].value + '</option>';
                    }
                    $('#local_city').html(htmls);
                });

                //修改用户信息并提交

                $("button").click(function(){
                    $.post("http://localhost:3009/users/userinfo",
                        {
                            user_sname:$('#text').val(),
                            sign:$('#sign').val(),
                            sex:$('#sex option:selected').val(),
                            province: $('#local_province option:selected').val(),
                            city:$('#local_city option:selected').val(),
                            birthday:$('#year option:selected').val()+'-'+$('#month option:selected').val()+'-'+$('#day option:selected').val(),
                            user_phone_number:$rootScope.userId

                        },
                        function(data,status){
                            $('#myModal').modal('show');
                        });
                });

            //end修改个人资料及显示
            };
           
            $scope.choosePhoto=function () {
                $rootScope.isMessage="photoMessage";
            };
            $scope.choosePass=function () {
                $rootScope.isMessage="passwordMessage";
            };
            $scope.chooseTel=function () {
                $rootScope.isMessage="phoneMessage";
            };

            $(document).on('click','#personMessage li',function () {
                $(this).addClass('nav-color').siblings().removeClass('nav-color');
            })

        }]
    }
});
