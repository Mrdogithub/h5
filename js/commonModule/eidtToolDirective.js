'use strict';

var eidtToolDirective = angular.module('eidtToolDirective', ['ngMaterial', 'projectService']);

eidtToolDirective.directive('toolbar1', function($mdToast,
  $document, $rootScope,
  projectFn,loginFn,$mdDialog) {

  return {
    restrict: "AE",
    scope: {},
    templateUrl: "./template/toolBar.html",
    link: function($scope, $rootScope) {
      $scope.remove = function() {
        $(".ui-selected").remove();
      }

      $scope.previewPage = function() {
        $("#popupContainer").addClass('filter');
       $mdDialog.show({
          controller: function($scope, $compile, $sce) {
            $compile($("#previewContent").attr('ng-bind-html', 'page.preivewCode'))($scope)
            $scope.page = {
              "preivewCode": ""
            };
   
           var previewOnce = $("#pagesList").html();
           var strHtml = previewOnce.replace(/display/g, " ")
                    .replace(/isEdit/g, " ")
                    .replace(/icon-undo/g, " ")
                    .replace(/ui-selectable/g,'')
                    .replace(/ui-draggable/g,'')
                    .replace(/ui-selectee/g,'')
                    .replace(/ui-selected/g,'')
                    .replace(/right_/g,'')
                    .replace(/textElementActive/g,' ')
                    .replace(/class="[^\"]*(animated)[^\"]*(imageElement)[^\"]*"/g,'class=" ani imageElement"')
                    .replace(/class="[^\"]*(animated)[^\"]*(textElement)[^\"]*"/g,'class=" ani textElement"')
                    .replace(/<div class="ui-resizable-handle(.)*?div>/g, '')
                    // .replace(/style="[^\"]*(animation-name|animation-duration|animation-delay)+:[^\:]*;[^\"]*"/g,' ')
                    .replace(/ui-resizable/g,'') + '<script type="text/javascript"> var mySwiper=new Swiper(".swiper-container",{onInit:function(swiper){swiperAnimateCache(swiper);swiperAnimate(swiper)},onSlideChangeEnd:function(swiper){swiperAnimate(swiper)}})</script>';

            $scope.page.preivewCode = $sce.trustAsHtml(strHtml);
              
            //console.log("@editToolDirective.js DEC print $scope.page.preivewCode is:"+$scope.page.preivewCode);
            $scope.closePreview = function() {
               $mdDialog.hide();
             // $('#previewPageInEditStatus').css('display', 'none');
              $("#popupContainer").removeClass('filter');


              var i = $(".page.col-leftclick span").html();
              $("#right_" + (i)).show();
            }
          },
          templateUrl: "./template/page.previewPage.tmpl.html",
          parent: $('#main'),
          hideDelay: false
            // position: $scope.getToastPosition()
        });
      }



/*
*@保存按钮
*
*
***/
      $scope.savePage = function() {
        /*
        *projectFn.getPageLength()
        *@ project/Module/projectService.js
        *
        */
          var pageLength = projectFn.getPageLength();

          if (loginFn.islogged().status) {

                /**
                * loginFn.islogged()
                * @ userModule/loginService.js
                * 返回:
                *
                * { 
                *   status    ：true | false 用户登录状态
                *   userName  ：用户名
                *   userPhoto : 用户头像链接
                *  }
                */
                if(projectIdIsNull()){
                    addProjectFn($mdDialog, $document)  
                }else{
                    saveProjectFn();
                }
          
          }else{


                $mdDialog.show({
                  controller: function($scope, $rootScope,loginFn) {
                     $("#popupContainer").addClass('filter');
                     $scope.loadingLogin = false;
                      $scope.loginClose = function(){
                          $mdDialog.hide();
                          setTimeout(function(){$("#popupContainer").removeClass('filter');},250)
                      }

                      $scope.loginBtn = function(){
                        $scope.loadingLogin = true;
                         $scope.credentials = { "username":$scope.user.firstName,"password":$scope.user.passWord};
                         loginFn.login($scope.credentials).then(function(data){

                           if(data.status){
                                $rootScope.currentUser  = $rootScope.getCurrentUser();
                                $rootScope.isAuthorized = loginFn.islogged().status;
                                $scope.loadingLogin = false;
                                //$mdDialog.hide();
                                //setTimeout(function(){$("#popupContainer").removeClass('filter');},250)
                                addProjectFn($mdDialog, $document) 
                            }else{
                                // console.log('fail')
                                $scope.loading = false;
                                $scope.error = "用户名或密码错误";
                            }
                          
                           
                         });
                      }

                  },
                  templateUrl: './template/user.login.tmpl.html',
                  parent:$("#main"),
                  hideDelay: false
                });         
          }
      }

      function projectIdIsNull() {
        var status = typeof($("#pagesList").data('projectid')) == "undefined" ? true : false;
        return status;
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
                    .replace(/<div class="ui-resizable-handle(.)*?div>/g, '')
                    .replace(/isEdit/,'')
                    .replace(/display: flex/, "display: none")
                    .replace('defaultPage','defaultPage isEdit')
                    .replace('direction: ltr; display: none;','direction: ltr;display: block;')

             var previewCode = $("#pagesList").html()
                    .replace(/display/g, " ")
                    .replace(/isEdit/g, " ")
                    .replace(/icon-undo/g, " ")
                    .replace(/ui-selectable/g,'')
                    .replace(/ui-draggable/g,'')
                    .replace(/ui-selectee/g,'')
                    .replace(/ui-selected/g,'')
                    .replace(/right_/g,'')
                    .replace(/textElementActive/g,' ')
                    .replace(/class="[^\"]*(animated)[^\"]*(textElement)[^\"]*"/g,'class=" ani textElement"')
                    .replace(/class="[^\"]*(animated)[^\"]*(imageElement)[^\"]*"/g,'class=" ani imageElement"')
                    .replace(/style="[^\"]*(animation-name|animation-duration|animation-delay)+:[^\:]*;[^\"]*"/g,' ')
                    .replace(/<div class="ui-resizable-handle(.)*?div>/g, '')
                    .replace(/ui-resizable/g,'');
            // console.log('loginFn.islogged():'+loginFn.islogged().userName);
            // console.log('newLength')
            projectFn.saveProject(newLength, projectid, editCode, previewCode)
              .then(function(data) {
                  
                  if (data.status) {
                    setTimeout(function(){$("#popupContainer").removeClass('filter');},250)
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
/**
* @name  addProjecFn
* @description 
*
* 用于用户创建新项目
*/

      function addProjectFn($mdDialog, $document) {
      $("#popupContainer").addClass('filter');
        $mdDialog.show({
          controller: function($scope, projectFn) {
            $scope.closeSavePage = function() {
               $mdDialog.hide();
               setTimeout(function(){$("#popupContainer").removeClass('filter');},250)
            }
            $scope.savePageContent = function() {
              $scope.loadingSave = false;
              var projectName = $("#projectName").val();
              var projectInfo = $('#projectInfo').val();     
              var pageLength  = projectFn.getPageLength().length;
              var userName    = loginFn.islogged().email;

              console.log('@addProject:current page length is:'+pageLength);

              var previewCode = $("#pagesList").html()
                    .replace(/display/g, " ")
                    .replace(/isEdit/g, " ")
                    .replace(/icon-undo/g, " ")
                    .replace(/ui-selectable/g,'')
                    .replace(/ui-draggable/g,'')
                    .replace(/ui-selectee/g,'')
                    .replace(/ui-selected/g,'')
                    .replace(/right_/g,'')
                    .replace(/textElementActive/g,' ')
                    .replace(/class="[^\"]*(animated)[^\"]*(textElement)[^\"]*"/g,'class=" ani textElement"')
                    .replace(/class="[^\"]*(animated)[^\"]*(imageElement)[^\"]*"/g,'class=" ani imageElement"')
                    .replace(/style="[^\"]*(animation-name|animation-duration|animation-delay)+:[^\:]*;[^\"]*"/g,'')
                    .replace(/<div class="ui-resizable-handle(.)*?div>/g, '')
                    .replace(/ui-resizable/g,'');

               var editCode = $("#pagesList").html()
                    .replace(/ui-selected/, '')
                    .replace(/<div class="ui-resizable-handle(.)*?div>/g, '')
                    .replace(/isEdit/,'')
                    .replace(/display: flex/, "display: none")
                    .replace('defaultPage','defaultPage isEdit')
                    .replace('direction: ltr; display: none;','direction: ltr;display: block;');

              projectFn.addProject(projectName,previewCode,editCode,projectInfo,userName,pageLength)
                .then(function(data) {
                   console.log(data.status+":data.status")
                    if (data.status) {
                      $("#pagesList").attr('data-projectid', data.project.id);
                        $scope.loadingSave = true;
                        $mdDialog.hide();
                        setTimeout(function(){$("#popupContainer").removeClass('filter');},250)
                        $("#addBox").show();
                        setTimeout(function() {
                          $("#addBox").fadeTo(3000).hide();
                        }, 1000);

                    } else {
                      // console.log('@editToolDirective.js  Fn: add project :'+data.name)
                    }
              }, function() {
              
              });
            }

          },
          templateUrl: './template/page.save.tmpl.html',
          parent: $('#main'),
          hideDelay: false
        });
      }




    }
  };
});
