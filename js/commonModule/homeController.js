var homeController = angular.module('homeController', ['ngMaterial']);
homeController.controller('homeController', function(
  $scope, 
  $rootScope, $mdSidenav, 
  editPage, $mdToast, $compile, 
  $sce, $state,$mdDialog, $document, SERVER_URL,loginFn) {

//用户退出
  $scope.loginOut = function(){
    loginFn.logout();
    $rootScope.isAuthorized = loginFn.islogged().status;
    $state.go('homePage');
  }

//用户登录
  $scope.userLogin = function(){
    $("#pagesList").css('display','none');
        $mdToast.show({
        controller: function($q,$scope,$rootScope,loginFn){
            $scope.loginClose = function(){
                $('#loginOverLay').css('display','none');
                $("#pagesList").css('display','block');
            }

            $scope.loginBtn = function(){
                 $scope.loading = true;
                 $scope.error = '';
                 $scope.credentials = { "username":$scope.user.firstName,"password":$scope.user.passWord};
                 loginFn.login($scope.credentials).then(function(data){

                  //$scope 作用于 user.login.tmpl.html
                  //$rootScope 作用于全局
                   if(data.status){
                        $rootScope.currentUser  = $rootScope.getCurrentUser();
                        $rootScope.isAuthorized = loginFn.islogged().status;
                        $("#loginOverLay").css('display','none');
                        $("#pagesList").css('display','block');

                    }else{
                      $scope.loading = false;
                        $scope.error = "用户名或密码错误";
                    }
                  
                   
                 });
            }

        },
        templateUrl:'./template/user.login.tmpl.html',
        parent : $document[0].querySelector('#editModulePosition'),
        hideDelay: false
    });
  }

//用户未登录状态点击我的项目
  $scope.myProject = function(){
        if(loginFn.islogged().status){
           console.log('登录状态 进入dashboard')
           $state.go('dashboard');
           console.log('登录状态跳转结束')
        }else{
              $mdToast.show({
                 controller: function($scope,$rootScope){
                    $scope.loginClose = function(){
                        $('#loginOverLay').css('display','none');
                    }
                
                    $scope.loginBtn = function(){
                         $scope.loading = true;
                         $scope.error = '';
                         $scope.credentials = { "username":$scope.user.firstName,"password":$scope.user.passWord};
                         loginFn.login($scope.credentials).then(function(data){

                          //$scope 作用于 user.login.tmpl.html
                          //$rootScope 作用于全局
                          console.log(data.status+">>>>data.status")
                           if(data.status){
                                $rootScope.currentUser  = $rootScope.getCurrentUser();
                                $rootScope.isAuthorized = loginFn.islogged().status;
                                $("#loginOverLay").css('display','none');
                                $("#pagesList").css('display','block');
                                console.log('$("#pagesList").data("projectid")'+$("#pagesList").data("projectid"))
                                if(!$("#pagesList").data("projectid")){
                                  $mdToast.show({
          controller: function($scope, projectFn) {
            $scope.savePageContentClose = function() {
              $('#saveProjectOverLay').css('display', 'none');
            }
            $scope.savePageContent = function() {
              var projectName = $("#projectName").val();           
              var previewCode = $("#pagesList").html()
                    .replace(/display/g, "!")
                    .replace(/isEdit/g, "!")
                    .replace(/icon-undo/g, "!")
                    .replace(/<div class="ui-resizable-handle(.)*?div>/g, '');

              var editCode    = $("#pagesList").html()
                    .replace(/ui-selected/, '')
                    .replace(/<div class="ui-resizable-handle(.)*?div>/g, '');

              projectFn.addProject(projectName,previewCode,editCode)
                .then(function(data) {
     
                    if (data.status) {
                      $("#pagesList").attr('data-projectid', data.project.id);
                      $('#saveProjectOverLay').css('display', 'none');
                      $("#addBox").show();
                      setTimeout(function() {
                        $("#addBox").fadeTo(3000).hide();
                      }, 1000);

                       $state.go('dashboard');
                    } else {
                      view(data.msg);
                    }
              }, function() {
              
              });
            }

          },
          templateUrl: './template/page.save.tmpl.html',
          parent: $document[0].querySelector('#editModulePosition'),
          hideDelay: false
        });
           




                                }

                            }else{
                              // console.log('fail')
                              $scope.loading = false;
                              console.log('error')
                                $scope.error = "用户名或密码错误";
                            }
                          
                           
                         });
                      }
                },
                templateUrl:'./template/user.login.tmpl.html',
                parent : $document[0].querySelector('#editModulePosition'),
                hideDelay: false
              });

          }
  }
      

//删除选中元素
  $scope.remove = function() {
    $(".ui-selected").remove();
  }

//设置背景
  $scope.setBackground = function() {
    $(".bgAcitve").css('opacity', '1');
    console.log('background click');
    showBackgroundEditPanel($mdToast, $document);
  }


  function saveProjectFn(){
    var pageLength = [];
    pageLength.length = 0;

    //初始化页面个数
    var projectid = $("#pagesList").data("projectid");
    var pageLengthNotSave = projectFn.getPageLength();
    projectFn.loadEditPage(projectid).then(function(data) {
      var newLength = 0;
      if (typeof(data.pageLength) == 'undefined') {
        newLength = 1;
      } else if (pageLengthNotSave > data.pageLength) {
        newLength = pageLengthNotSave;
      } else if (pageLengthNotSave < data.pageLength) {
        newLength = data.pageLength;
      } else if (pageLengthNotSave = data.pageLength) {
        newLength = data.pageLength;
      }
   
   
      var editCode = $("#pagesList").html()
              .replace(/ui-selected/, '')
              .replace(/isEdit/g, " ")
              .replace(/<div class="ui-resizable-handle(.)*?div>/g, '');

      var previewCode = $("#pagesList").html()
              .replace(/display/g, " ")
              .replace(/isEdit/g, " ")
              .replace(/icon-undo/g, " ")
              .replace(/<div class="ui-resizable-handle(.)*?div>/g, '');

      projectFn.saveProject(newLength, projectid, editCode, previewCode)
        .then(function(data) {

            if (data.status) {
              $('.md-dialog-container').css('display', 'none');
              $("#addBox").show();
              setTimeout(function() {
                $("#addBox").fadeTo(3000).hide();
              }, 1000);
            } else {
              view(data.msg);
            }
        }, function() {

            $scope.error = "用户名或密码错误"
        });

    })
  }


//判断是否为chrome浏览器
  var isChrome = window.navigator.userAgent.indexOf("Chrome") !== -1;
  if (!isChrome) {
    $mdDialog.show({
      controller: function() {
        $scope.closeToast = function() {
          $mdToast.hide();
        };
      },
      templateUrl: './template/page.isNotChrome.tmpl.html',
      parent: $document[0].querySelector('#main')
        // hideDelay: 6000
        // position: $scope.getToastPosition()
    });
  }

  $(document).on('click', function() {
    $('rotate-rightTop').css('display', 'none')
  })


// show radiobox edit panel if radiobox active
  function showBackgroundEditPanel($mdToast, $document) {
    console.log('showBackgroundEditPanel')
    $mdToast.show({
      controller: function($scope) {
        //set FontColor

        console.log('show panel')
        $scope.$watch("setPageBackgroundColor", function(newColor, oldColor) {
          $('.isEdit').css('backgroundColor', newColor);
        });

        $(this).parent().attr('id', 'selectedFormItem');
        $(this).parent().css({
          'border': '#dedede 3px dashed',
          'overflow': 'hidden'
        });


      },
      templateUrl: './template/page.background.tmpl.html',
      parent: $document[0].querySelector('#editModulePosition'),
      hideDelay: false
    });
  }


}).controller('LeftCtrl', function($scope, $timeout, $mdSidenav, 
  $log, $rootScope, $mdToast,
   $document, projectFn) { // 左侧导航栏位 start --
  
  $scope.feedback = {
    title: '',
    leftpages: [{
      'type': '1'
    }]
  };
  var projectIdInLeftNav = projectFn.getProjectId();
  projectFn.loadEditPage(projectIdInLeftNav).then(function(data) {
    var k = 0;
    k = data.pageLength;
    console.log(k+":page length")
    var colLeftHeight = 140 * k;
    if (k > 1) {
      for (var i = 0; i < k - 1; i++) {
        $scope.feedback.leftpages.push({
          type: '1'
        })
      };
    }

  })


  $scope.addEmptyTemplate = function(index) {
    var n = 0
    $scope.feedback.leftpages.push({
        type: '1',
        page: ''
      }),
    $rootScope.feedback = $scope.feedback;
    var n = $scope.feedback.leftpages.length
    $('#pagesList').append('<div id=right_' + (n) + ' class="swiper-slide isEdit" ></div>');
    $(".swiper-slide").each(function(index, element) {
      $("#right_" + index).hide();
      $("#right_" + index).removeClass('isEdit');
    });
    
    /**
    * @name savePageLength()
    * @path project/projectService.js
    * @description
    * 
    * 用户每增加一页，需要将当前总页数存储，在用户保存时，将当前页数传至后端
    *
    **/
    projectFn.savePageLength(n);
    //console.log('当前页数:'+n);
    $rootScope.pageLength = n;
    // $("#right_"+n).show()
    showBackgroundEditPanel($mdToast, $document)
  }

  $scope.choosePage = function(i) {
    $("#right_" + (i + 1)).animate({
      opacity: 0
    });
    $("#right_" + (i + 1)).animate({
      opacity: 1
    });

    $(".swiper-slide").hide();
    $(".swiper-slide").removeClass("isEdit")

    $("#right_" + (i + 1)).show()
    $("#right_" + (i + 1)).addClass("isEdit")
    $(".box>.page").hasClass('col-leftclick') ? $(".box>.page").removeClass('col-leftclick') : '';
    $("#ques_" + (i + 1)).addClass("col-leftclick");

  }
});
