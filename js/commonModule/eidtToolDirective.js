'use strict';

var eidtToolDirective = angular.module('eidtToolDirective', ['ngMaterial', 'projectService']);

eidtToolDirective.directive('toolbar1', function($mdToast,
  $document, $rootScope,
  projectFn,loginFn) {

  return {
    restrict: "AE",
    scope: {},
    templateUrl: "./template/toolBar.html",
    link: function($scope, $rootScope) {
      $scope.remove = function() {
        $(".ui-selected").remove();
      }

      $scope.previewPage = function() {
        $("#pagesList").css('display', 'none');
        $mdToast.show({
          controller: function($scope, $compile, $sce) {
            $compile($("#previewContent").attr('ng-bind-html', 'page.preivewCode'))($scope)
            $scope.page = {
              "preivewCode": ""
            };
            $("#pagesList").html()
            $scope.page.preivewCode = $sce.trustAsHtml($("#pagesList").html()
              .replace(/display/g, "!").replace(/isEdit/g, "!")
              .replace(/icon-undo/g, "!").replace(/ui-selected/g, "")
              .replace(/ui-selectable/g, "") + '<script type="text/javascript"> $(document).ready(function(){var swiper = new Swiper(".swiper-container",{pagination:".swiper-pagination",paginationClickable:true,direction:"vertical",effect:"slide"})})</script>');
            
            $scope.close = function() {
              $('#previewPageInEditStatus').css('display', 'none');
              $("#pagesList").css('display', 'block');
              var i = $(".page.col-leftclick span").html();
              $("#right_" + (i)).show();
            }
          },
          templateUrl: "./template/page.previewPage.tmpl.html",
          parent: $document[0].querySelector('#editModulePosition'),
          hideDelay: false
            // position: $scope.getToastPosition()
        });
      }

      $scope.savePage = function() {
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

                // projectIdIsNull()?addProjectFn($mdToast, $document):saveProjectFn()
                if(projectIdIsNull()){
                    addProjectFn($mdToast, $document)  
                }else{
                    saveProjectFn();
                }
          
          }else{


                $mdToast.show({
                  controller: function($scope, $rootScope,loginFn) {
                      $scope.loginClose = function(){
                         $('#loginOverLay').css('display','none');
                      }

                      $scope.loginBtn = function(){
                         $scope.loading = true;
                         $scope.error = '';
                         $scope.credentials = { "username":$scope.user.firstName,"password":$scope.user.passWord};
                         loginFn.login($scope.credentials).then(function(data){

                           if(data.status){
                                $rootScope.currentUser  = $rootScope.getCurrentUser();
                                $rootScope.isAuthorized = loginFn.islogged().status;
                                $("#loginOverLay").css('display','none');
                                $("#pagesList").css('display','block');

                            }else{
                                // console.log('fail')
                                $scope.loading = false;
                                $scope.error = "用户名或密码错误";
                            }
                          
                           
                         });
                      }

                  },
                  templateUrl: './template/user.login.tmpl.html',
                  parent: $document[0].querySelector('#editModulePosition'),
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
                    .replace(/<div class="ui-resizable-handle(.)*?div>/g, '');

            var previewCode = $("#pagesList").html()
                    .replace(/display/g, "!")
                    .replace(/isEdit/g, "!")
                    .replace(/icon-undo/g, "!")
                    .replace(/<div class="ui-resizable-handle(.)*?div>/g, '');
            console.log('loginFn.islogged():'+loginFn.islogged().userName);
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

      //common function

      function addProjectFn($mdToast, $document) {
        $mdToast.show({
          controller: function($scope, projectFn) {
            $scope.savePageContentClose = function() {
              $('#saveProjectOverLay').css('display', 'none');
            }
            $scope.savePageContent = function() {
              var projectName = $("#projectName").val();
              var projectInfo = $('#projectInfo').val();     
              var userName    = loginFn.islogged().email;
              var previewCode = $("#pagesList").html()
                    .replace(/display/g, "!")
                    .replace(/isEdit/g, "!")
                    .replace(/icon-undo/g, "!")
                    .replace(/<div class="ui-resizable-handle(.)*?div>/g, '');

              var editCode 	  = $("#pagesList").html()
                    .replace(/ui-selected/, '')
                    .replace(/<div class="ui-resizable-handle(.)*?div>/g, '');
  
              projectFn.addProject(projectName,previewCode,editCode,projectInfo,userName)
                .then(function(data) {
     
                    if (data.status) {
                      $("#pagesList").attr('data-projectid', data.project.id);
                      $('#saveProjectOverLay').css('display', 'none');
                      $("#addBox").show();
                      setTimeout(function() {
                        $("#addBox").fadeTo(3000).hide();
                      }, 1000);
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




    }
  };
});
