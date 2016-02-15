var toolBar = angular.module('toolBar', ['ngMaterial', 'editText', 'mainApp','projectService']);
toolBar.directive('toolbar1', function($mdToast, $mdDialog, $document, $rootScope, SERVER_URL, AuthService, projectFn) {
  return {
    restrict: "AE",
    scope: {},
    templateUrl: "./template/toolBar.html",
    link: function($scope, $mdDialog, $rootScope) {
      $scope.remove = function() {
        $(".ui-selected").remove();
      }

      $scope.previewPage = function() {
        $("#pagesList").css('display', 'none');
        $mdToast.show({
          controller: function($scope, $mdDialog, $compile, $sce) {
            $compile($("#previewContent").attr('ng-bind-html', 'page.preivewCode'))($scope)
            $scope.page = {
              "preivewCode": ""
            };
            $("#pagesList").html()
            $scope.page.preivewCode = $sce.trustAsHtml($("#pagesList").html().replace(/display/g, "!").replace(/isEdit/g, "!").replace(/icon-undo/g, "!").replace(/ui-selected/g, "").replace(/ui-selectable/g, "") + '<script type="text/javascript"> $(document).ready(function(){var swiper = new Swiper(".swiper-container",{pagination:".swiper-pagination",paginationClickable:true,direction:"vertical",effect:"slide"})})</script>');
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
      $scope.userName = '';
      $scope.savePage = function() {
        var pageLength = projectFn.getPageLength();
        if ($("#welcome").css('display') == "block") {
          $mdToast.show({
            controller: function($scope, $parse, $mdDialog, $rootScope, SERVER_URL) {
              $scope.loginClose = function() {
                $('#loginOverLay').css('display', 'none');
              }
              $scope.loginBtn = function() {
                $scope.loading = true;
                $scope.credentials = {
                  "username": $scope.user.firstName,
                  "password": $scope.user.passWord
                }
                AuthService.login($scope.credentials).then(function(user) {
                  if (typeof(user.userName) !== "undefined") {
                    $scope.loading = false;
                    $rootScope.userName = user.userName;
                    $rootScope.userPhoto = user.userPhoto;
                    $('<span class="userImage"><img id="uImage" src="' + user.userPhoto + '"></span><span class="userName ng-binding" role="button" tabindex="0"> ' + user.userName + ' </span>').prependTo("#userProfile")
                    $("#welcome").css('display', 'none')
                    $("#loginOverLay").css('display', 'none');
                    AuthService.setUserInfo(user.userName, user.userPhoto);
                    saveProjectFn($mdToast, $document);
                  } else {
                    $scope.error = "用户名或密码错误";
                  }
                }, function() {})
              }
            },
            templateUrl: './template/user.login.tmpl.html',
            parent: $document[0].querySelector('#editModulePosition'),
            hideDelay: false
          });

        } else if (projectIsNull()) {
          saveProjectFn($mdToast, $document);
        } else {

          var pageLength = [];
          pageLength.length = 0;
          var projectid = $("#pagesList").data("projectid");
          console.log(": save exist project and projectId is:" + projectid)
          var pageLengthNotSave = projectFn.getPageLength();
          projectFn.loadEditPage(projectid).success(function(data) {
            var newLength = 0;
            if (typeof(data.pageLength) == 'undefined') {
              newLength = 1;
            } else if (pageLengthNotSave > data.pageLength) {
              console.log('pageLengthNotSave > data.pageLength')
              newLength = pageLengthNotSave;
            } else if (pageLengthNotSave < data.pageLength) {
              console.log('pageLengthNotSave < data.pageLength')
              newLength = data.pageLength;
            } else if (pageLengthNotSave = data.pageLength) {
              console.log('pageLengthNotSave = data.pageLength')
              newLength = data.pageLength;
            }
            console.log(": save exist project in service Fnd and projectId is:" + projectid)
            var projectIdInSaveProjectAction = projectFn.getProjectId();
            console.log("save project and got projectid from serv function：" + projectIdInSaveProjectAction)
            var editCode = $("#pagesList").html().replace(/ui-selected/, '').replace(/<div class="ui-resizable-handle(.)*?div>/g, '');
            var previewCode = $("#pagesList").html().replace(/display/g, "!").replace(/isEdit/g, "!").replace(/icon-undo/g, "!").replace(/<div class="ui-resizable-handle(.)*?div>/g, '');

            projectFn.saveProject(newLength, projectid, editCode, previewCode).then(function(data) {
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
      }

      function projectIsNull() {
        var status = typeof($("#pagesList").data('projectid')) == "undefined" ? true : false;
        return status;
      }

      //common function

      function saveProjectFn($mdToast, $document, pageLengthInit) {
        $mdToast.show({
          controller: function($scope, $mdDialog, projectFn) {
            $scope.savePageContentClose = function() {
              $('#saveProjectOverLay').css('display', 'none');
            }
            $scope.savePageContent = function() {
              var pageLengthInit = projectFn.getPageLength();
              if (typeof(pageLengthInit) == 'undefined') {
                pageLengthInit = 1;
              }

              console.log(pageLengthInit + "--------pageLengthInit")
              
              var projectName = $("#projectName").val();           
              var previewCode = $("#pagesList").html().replace(/display/g, "!").replace(/isEdit/g, "!").replace(/icon-undo/g, "!").replace(/<div class="ui-resizable-handle(.)*?div>/g, '');
              var projectid   = '';
              var editCode 	  = $("#pagesList").html().replace(/ui-selected/, '').replace(/<div class="ui-resizable-handle(.)*?div>/g, '');
              
              projectFn.saveProject(pageLengthInit, projectid, editCode, previewCode, projectName).then(function(data) {
                $("#pagesList").attr('data-projectid', data.project.id);
                if (data.status) {
                  $('#saveProjectOverLay').css('display', 'none');
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
