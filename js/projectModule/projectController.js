"use strict";


var projectController = angular.module('projectController', ['ngMaterial', 
  'AuthService', 
  'projectService', 
  'createElementDirective']);

projectController.controller('projectController', function($scope, 
  $rootScope, 
  $state, AuthService, 
  $timeout, $stateParams, 
  $document, $mdDialog, projectFn,
  $mdToast, $document, getMyProjectsList) {

  $(document).on('click', '#loginOutIn', function() {
    setTimeout(function() {
      $("#loginOutIn").remove();
      $("#uNameDashboard").html('欢迎,登陆');
    }, 1000);
  })
  
  var user = AuthService.getUserInfo();

  $("#userProfileInDashboard").addClass('dashboardActive');
  $('<span class="userImage"><img id="uImage" src="' + user[0].userPhoto + '"></span><span class="userName ng-binding"  role="button" tabindex="0"> ' + user[0].userName + ' </span>').prependTo($("#userProfileInDashboard"));
  $scope.editPage = function(ev, id) {
    $state.go('homePage');
    projectFn.saveProjectId(id);
  }
  $scope.myEdit = function() {
    projectFn.removeProjectId();
    $state.go('homePage')
  }

  $scope.projectList = getMyProjectsList;
  $scope.showBack = function(target) {
    $(target).find('.dask').stop().delay(50).animate({
      opacity: 1
    }, 200);
    $('#container').css('filter', 'blur(5px)');
  };
  $scope.downLoadQrCode = function(qrUrl) {
    window.open('http://9.115.24.168:3000/downloadQRCode?url=' + qrUrl, 'target');
  }
  $scope.previewPage = function(ev, url, qrcode, code) {
    $('.modlist').css('display', 'none')
    $mdToast.show({
      controller: function($scope) {
        $scope.previewUrl = url;
        $scope.qrcode = qrcode;
        $scope.close = function() {
          $('.dashBoardPreview').css('display', 'none');
          $('.modlist').css('display', 'block')

        }
      },
      template: '<div class="dashBoardPreview"  tabindex="-1" ><div class="modal-dialog"style="width:85%;z-index: 999;"><div class="modal-content" style="border-radius: 0px;"><div class="modal-body"><a  style="cursor: pointer; font-size: 17px;text-align: right;font-weight: bold;text-decoration: none;vertical-align: top;position: absolute;right: 18px;top: 9px;" ng-click="close()">&times;</a><div style="width:370px;height:480px;display:inline-block"><iframe src="' + url + '" style="width:370px;height:568px;" scrolling="no"></iframe></div><div style=" text-align:center;display: inline-block;vertical-align: top;width: 500px;margin-left: 40px;"><img src="' + qrcode + '" style="width:300px;height:300px;margin-top:30px;" /><div class="input-group"><span class="input-group-addon" style="border-radius: 0px;">链接</span><input readonly style="border-radius: 0px;" type="text" class="form-control" value="' + url + '"></div></div></div></div></div></div>',
      parent: $document[0].querySelector('#dashboardContent'),
      hideDelay: false
    });

  }

  $scope.deletePage = function(ev, projectId) {
    console.log("del project id " + projectId)
    var confirm = $mdDialog.confirm()
      .title('确定要删除当前项目？')
      .ariaLabel('Lucky day')
      .targetEvent(ev)
      .ok('是')
      .cancel('不');
    $mdDialog.show(confirm).then(function(data) {
      if (data) {
          projectFn.deletedProject(projectId).then(function(data){
            console.log(projectId+"projectIdprojectIdprojectIdprojectId")
            $('#' + projectId).remove();
            alert('删除成功');
          },function(){});      
      }
    }, function(data) {});

  }


  $scope.copyProject = function(ev, projectId, projectName) {
    $('.modlist').css('display', 'none')

    var _scope = $scope;
    $mdToast.show({
      controller: function($scope, $compile, projectFn) {
        var pId = projectId;
        $scope.projectName = projectName;
        $scope.copyProjectInProgress = function() {
          $('#saveProjectOverLay').css('display', 'block');
          $scope.projectInfo = {
            "id": "",
            "projectname": "",
            "cover": "",
            "qrcode": ""
          }

          projectFn.copyProject($scope.projectName, pId).then(function(data){
            for(var i in data){
              console.log(i+":"+data[i])
            }
            if(data.status){
              $scope.projectInfo.id          = data.project.id;
              $scope.projectInfo.url         = data.project.url;
              $scope.projectInfo.cover       = data.project.cover;
              $scope.projectInfo.qrcode      = data.project.qrcode;
              $scope.projectInfo.projectname = data.project.projectname;
         
            
              $compile($('<div class="col-sm-6 col-md-4 col-lg-3 modmore" id="' + $scope.projectInfo.id + '"><div class="thumbnail"  style="height: 334px;" ><div class="projectInfo-projectName" style="position:absolute;width:98%;opacity:1;"><img  style="width:100%;height:325px;"  src="' + $scope.projectInfo.cover + '"><div style="width:100%;position:absolute;bottom:0px;text-align:center;height:40px;background:#fff;padding:10px 0px 10px 0px;">' + $scope.projectInfo.projectname + '</p></div></div><div class="dask" style="position:absolute;width:98%;opacity:0;"><p class="showMoreIcons"><span ng-click="deletePage($event,' + "'" + $scope.projectInfo.id + "'" + ')" class="projectInfoShowMoreIcons-remove" style="width:0px;opacity:0;"></span><span ng-click="copyProject($event,' + "'" + $scope.projectInfo.id + "'," + "'" + $scope.projectInfo.projectname + "'" + ')" class="projectInfoShowMoreIcons-copy" style="width:0px;opacity:0;"></span><span href="javascript:;" class="projectInfoShowMoreIcons"></span></p><img src="' + $scope.projectInfo.qrcode + '" style="width:100%;"><p class="projectInfoDownloadQRCode">下载二维码</p><p class="showMoreIconsBottom"><a ng-click="previewPage($event,' + "'" + $scope.projectInfo.url + "'," + "'" + $scope.projectInfo.qrcode + "'" + ')" class="projectInfoShowMoreIcons-preview"></a><a ng-click="editPage($event,' + "'" + $scope.projectInfo.id + "'" + ')" class="projectInfoShowMoreIcons-edit"></a></p></div></div></div></div></div>').prependTo($('.modlist')))(_scope);
              $('#saveProjectOverLay').css('display','none');
       
              $("#addBox").show();
              setTimeout(function() {
                $("#addBox").fadeTo(3000).hide();
              }, 1000);
              
              $('.modlist').css('display', 'block')
            }
            
          });

        }

        $scope.close = function() {
          $('#copyProjectOverLay').css('display', 'none');
          $('.modlist').css('display', 'block')
        }

      },
      templateUrl: './template/page.copyProject.tmpl.html',
      parent: $document[0].querySelector('#dashboardContent'),
      hideDelay: false
        // position: $scope.getToastPosition()
    });



  }
  $("#bg-properties").remove();

})
